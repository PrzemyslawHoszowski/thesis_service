# Generated by Django 4.1.3 on 2022-12-28 17:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0002_alter_storedfile_filehashbase64'),
    ]

    operations = [
        migrations.RenameField(
            model_name='storedfile',
            old_name='fileHashBase64',
            new_name='fileHashBase16',
        ),
    ]
