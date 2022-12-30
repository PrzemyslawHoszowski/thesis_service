import uuid
from datetime import datetime

from django.contrib.auth.models import User
from django.db import models

class VerificationStatus(models.IntegerChoices):
    ADDRESS_VERIFICATION = 1, 'Blockchain address verification'
    VERIFIED = 2, 'Verified'

class Identity(models.Model):
    # In the future, we may want to have many identities, so I added id
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, verbose_name='id')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) # user account can be deleted, but we want to maintain information about identity
    blockchain_address = models.CharField(max_length=45, unique=True, verbose_name='address', null=True, default=None)
    verification_status = models.IntegerField(choices=VerificationStatus.choices, default=VerificationStatus.ADDRESS_VERIFICATION, verbose_name='verification status')
    service_verification_tx_hash = models.CharField(max_length=256, verbose_name='service_tx', null=True, default=None)
    user_verification_tx_height = models.IntegerField(verbose_name='user_tx', null=True, default=None)
    created_at = models.DateTimeField('date created', default=datetime.now)
    modified_at = models.DateTimeField('date modified', default=datetime.now)

    @classmethod
    def create(cls, user):
        return cls(user=user)

    @classmethod
    def to_identity_list(cls, addresses):
        return Identity.objects.filter(blockchain_address__in=addresses).select_related('user')

    @classmethod
    def get_identity(cls, user):
        return Identity.objects.get(user=user)

    def name(self):
        return self.user.first_name + " " + self.user.last_name
