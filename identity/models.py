import uuid
from datetime import datetime

from django.contrib.auth.models import User
from django.db import models

class VerificationStatus(models.IntegerChoices):
    MAIL_VERIFICATION = 1, 'Email verification'
    ADDRESS_VERIFICATION = 2, 'Blockchain address verification'
    VERIFIED = 3, 'Verified'

class Identity(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, verbose_name='id')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) # user account can be deleted, but we want to maintain information about identity
    blockchain_address = models.CharField(max_length=45, unique=True, verbose_name='address')
    first_name = models.CharField(max_length=50, verbose_name='first name')
    last_name = models.CharField(max_length=50, verbose_name='last name')
    email = models.EmailField(max_length=100, verbose_name='email')
    verification_status = models.IntegerField(choices=VerificationStatus.choices, default=VerificationStatus.MAIL_VERIFICATION, verbose_name='verification status')
    verification_token = models.UUIDField(default=uuid.uuid4(), verbose_name='verification token')
    service_verification_tx_hash = models.CharField(max_length=256, verbose_name='service_tx')
    user_verification_tx_hash = models.CharField(max_length=256, verbose_name='user_tx')
    created_at = models.DateTimeField('date created', default=datetime.now)
    modified_at = models.DateTimeField('date modified', default=datetime.now)
