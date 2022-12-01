from datetime import datetime

import django.contrib.auth.backends
from django.db import models


class Certificate(models.Model):
    certificate = models.CharField(max_length=1000)
    owner = django.contrib.auth.backends.UserModel


class OwnedIdentities(models.Model):
    signature_bytes = models.CharField(max_length=1000)
    address = models.CharField(max_length=45)
    created_at = models.DateTimeField('date created', default=datetime.now)
