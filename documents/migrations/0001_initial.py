# Generated by Django 4.1.3 on 2022-12-23 01:01

from django.conf import settings
import django.contrib.postgres.fields
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
            name='Document',
            fields=[
                ('index', models.IntegerField(primary_key=True, serialize=False, unique=True)),
                ('state', models.CharField(max_length=20)),
                ('files', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=256), size=None)),
                ('admins', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=45), size=None)),
                ('editors', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=45), size=None)),
                ('signers', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=45), size=None)),
                ('viewers', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=45), size=None)),
                ('signed', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=45), size=None)),
                ('rejectionReasonHash', models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('attr', models.CharField(max_length=2000)),
                ('date', models.DateTimeField()),
                ('txHash', models.CharField(max_length=64)),
                ('document', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='documents.document')),
            ],
        ),
        migrations.CreateModel(
            name='DocumentStorage',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('hidden', models.BooleanField(default=False)),
                ('doc', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='documents.document')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddConstraint(
            model_name='documentstorage',
            constraint=models.UniqueConstraint(fields=('doc', 'user'), name='unique_document_user_combination'),
        ),
    ]
