from django.db import models


class Document(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=45)
