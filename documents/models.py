import json
import uuid

from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.core.files.uploadedfile import UploadedFile
from django.db import models, IntegrityError

import hashlib

from identity.models import Identity


class Document(models.Model):
    # common fields with blockchain
    index = models.IntegerField(unique=True, null=False, primary_key=True)
    state = models.CharField(max_length=20)
    files = ArrayField(models.CharField(max_length=64))
    admins = ArrayField(models.CharField(max_length=45))
    editors = ArrayField(models.CharField(max_length=45))
    signers = ArrayField(models.CharField(max_length=45))
    viewers = ArrayField(models.CharField(max_length=45))
    signed = ArrayField(models.CharField(max_length=45))
    rejectionReasonHash = models.CharField(max_length=64)
    updatedAt = models.DateTimeField()
    lastEditHeight = models.IntegerField(null=False)

    @classmethod
    def create(cls, json, updated_at):
        return cls(
            index=json['index'],
            state=json['state'],
            files=json['files'],
            admins=json['admins'],
            editors=json['editors'],
            signers=json['signers'],
            viewers=json['viewers'],
            signed=json['signed'],
            rejectionReasonHash=json['rejectionReason'],
            lastEditHeight=json['lastEditHeight'],
            updatedAt=updated_at
        )

    def update(self, json, updated_at):
        self.state = json['state']
        self.files = json['files']
        self.admins = json['admins']
        self.editors = json['editors']
        self.signers = json['signers']
        self.viewers = json['viewers']
        self.signed = json['signed']
        self.rejectionReasonHash = json['rejectionReason']
        self.lastEditHeight = json['lastEditHeight']
        self.updatedAt = updated_at
        return self

    def translated_roles(self):
        self.get_identities_mapping()
        remaining = set(self.signers) - set(self.signed)
        mapping = lambda x: self.identities_mapping.get(x, x)
        return {
            "admins": list(map(mapping, self.admins)),
            "editors": list(map(mapping, self.editors)),
            "remaining_signers": list(map(mapping, remaining)),
            "signed": list(map(mapping, self.signed)),
            "viewers": list(map(mapping, self.viewers)),
        }

    def get_identities_mapping(self):
        if not hasattr(self, 'identities_mapping'):
            users = self.users()
            user_to_address = dict(map(lambda user: (user.user, user.blockchain_address), users))
            self.identities_mapping = dict(map(lambda x: (x.blockchain_address, x), users))
            for doc_storage in DocumentStorage.objects.filter(accepted=False, doc__index=self.index):
                address = user_to_address[doc_storage.user]
                if address in self.identities_mapping:
                    self.identities_mapping[address] = address
        return self.identities_mapping

    def if_signed(self, user: Identity):
        return user.blockchain_address in self.signed

    def entities(self):
        return list(set(self.admins + self.editors + self.signers + self.viewers))

    def users(self):
        return Identity.to_identity_list(self.entities())

    def can_sign(self, user_address):
        return user_address in self.signers and user_address not in self.signed and self.state != "Rejected"

    def can_add_user(self, user_address):
        return user_address in self.admins and self.state != "Rejected"

    def rejection_reason(self):
        # todo make some mapping to valid string for authorized users
        return self.rejectionReasonHash

    def mark_used_files(self, files_list, new_files=None):
        new_files = new_files if new_files else []
        # returns list of files with attached value true/false if file is attached to current version of document
        return list(map(lambda file: (file, file.fileHashBase16 in self.files or file.fileHashBase16 in new_files), files_list))

    def can_edit(self, identity_id):
        return (identity_id in self.admins or identity_id in self.editors) and self.state != "Rejected"

class Event(models.Model):
    attr = models.CharField(max_length=2000)
    date = models.DateTimeField()
    title = models.CharField(max_length=64)
    txHash = models.CharField(max_length=64)
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    @classmethod
    def create(cls, attr, date, title, tx_hash, document):
        return cls(attr=attr, date=date, title=title, txHash=tx_hash, document=document)

    def attr_to_list(self):
        self.attr = json.loads(self.attr).items()
        return self

class StoredFile(models.Model):
    fileHashBase16 = models.CharField(max_length=64)
    doc = models.ForeignKey(Document, on_delete=models.CASCADE)
    file = models.FileField(upload_to="uploads/")
    name = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['doc', 'fileHashBase16'], name='unique_document_fileHashBase16_combination'
            )
        ]

    @staticmethod
    def query_to_dict(query_result):
        return dict(map(lambda file: (file.fileHashBase16, file), query_result))

    @classmethod
    def save_or_get_file(cls, doc: Document, file: UploadedFile):
        # name may differ
        stored_file = StoredFile(doc=doc, file=file, name=file.name)
        stored_file.save()

        with stored_file.file.open('rb') as file_to_hash:
            stored_file.fileHashBase16 = hashlib.sha256(file_to_hash.read()).hexdigest()
        try:
            stored_file.save()
        except IntegrityError:
            pass
        return stored_file


class DocumentStorage(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    name = models.CharField(max_length=100)
    doc = models.ForeignKey(Document, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    hidden = models.BooleanField(default=False)
    accepted = models.BooleanField(default=False)

    @classmethod
    def create_records(cls, document, identities, accepted=False):
        document_users = set(map(lambda x: x.user, DocumentStorage.objects.filter(doc=document)))
        users = set(map(lambda x: x.user, identities))
        to_delete = document_users - users
        to_append = users - document_users

        for user in to_append:
            DocumentStorage(doc=document, user=user, accepted=accepted).save()
        DocumentStorage.objects.filter(doc=document, user__in=to_delete).delete()

    @classmethod
    def get_user_documents(cls, user, filter_hidden=True):
        indexes = DocumentStorage.objects.filter(user=user)
        if filter_hidden:
            indexes = indexes.filter(hidden=False)
        return indexes.select_related('doc')

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['doc', 'user'], name='unique_document_user_combination'
            )
        ]

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if self._state.adding:
            self.name = self.id
        super().save(force_insert, force_update, using, update_fields)

class MetadataThesisService(models.Model):
    last_processed = models.IntegerField()

