# Generated by Django 4.1.3 on 2023-01-08 14:26

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Identity',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False, unique=True, verbose_name='id')),
                ('blockchain_address', models.CharField(default=None, max_length=45, null=True, unique=True, verbose_name='address')),
                ('verification_status', models.IntegerField(choices=[(1, 'Blockchain address verification'), (2, 'Verified')], default=1, verbose_name='verification status')),
                ('service_verification_tx_hash', models.CharField(default=None, max_length=256, null=True, verbose_name='service_tx')),
                ('user_verification_tx_height', models.IntegerField(default=None, null=True, verbose_name='user_tx')),
                ('created_at', models.DateTimeField(default=datetime.datetime.now, verbose_name='date created')),
                ('modified_at', models.DateTimeField(default=datetime.datetime.now, verbose_name='date modified')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Certificate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('certificate_pem', models.BinaryField(null=True)),
                ('identity', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='identity.identity')),
            ],
        ),
    ]
