# Generated by Django 4.1.3 on 2022-12-28 22:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0005_alter_storedfile_filehashbase16'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='storedfile',
            constraint=models.UniqueConstraint(fields=('doc', 'fileHashBase16'), name='unique_document_fileHashBase16_combination'),
        ),
    ]
