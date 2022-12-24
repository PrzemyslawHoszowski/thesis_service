import uuid

from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.db import models

from identity.models import Identity


class Document(models.Model):
    # common fields with blockchain
    index = models.IntegerField(unique=True, null=False, primary_key=True)
    state = models.CharField(max_length=20)
    files = ArrayField(models.CharField(max_length=256))
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
            lastBlockchainHeight=json['lastEditHeight'],
            updatedAt=updated_at
        )

    def translated_roles(self):
        self.get_identities_mapping()
        remaining = set(self.signers) - set(self.signed)
        return {
            "admins": list(map(self.identities_mapping.get, self.admins)),
            "editors": list(map(self.identities_mapping.get, self.editors)),
            "remaining_signers": list(map(self.identities_mapping.get, remaining)),
            "signed": list(map(self.identities_mapping.get, self.signed)),
            "viewers": list(map(self.identities_mapping.get, self.editors)),
        }

    def get_identities_mapping(self):
        if not hasattr(self, 'identities_mapping'):
            self.identities_mapping = dict(map(lambda x: (x.blockchain_address, x), self.users()))
        return self.identities_mapping

    def if_signed(self, user: Identity):
        return user.blockchain_address in self.signed

    def entities(self):
        return list(set(self.admins + self.editors + self.signers + self.viewers))

    def users(self):
        return Identity.to_identity_list(self.entities())

    def rejection_reason(self):
        # todo make some mapping to valid string for authorized users
        return self.rejectionReasonHash

class Event(models.Model):
    attr = models.CharField(max_length=2000)
    date = models.DateTimeField()
    txHash = models.CharField(max_length=64)
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    @classmethod
    def create(cls, attr, date, tx_hash, document):
        return cls(attr=attr, date=date, txHash=tx_hash, document=document)


class DocumentStorage(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    name = models.CharField(max_length=100)
    doc = models.ForeignKey(Document, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    hidden = models.BooleanField(default=False)

    @classmethod
    def create_records(cls, document, identities):
        for identity in identities:
            DocumentStorage(doc=document, user=identity.user).save()

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
