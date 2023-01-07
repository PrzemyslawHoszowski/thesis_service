import base64
import hashlib
import uuid
from datetime import datetime

from OpenSSL import crypto
from cryptography.hazmat.primitives._serialization import Encoding, PublicFormat
from django.contrib.auth.models import User
from django.db import models
from service import settings
from cryptography.hazmat.primitives.asymmetric import ec


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

class Certificate(models.Model):
    identity = models.ForeignKey(Identity, on_delete=models.SET_NULL, null=True)
    certificate_der = models.BinaryField(null=True)

    @classmethod
    def create(cls, public_key: str, identity: Identity):
        pk_bytes = base64.b64decode(public_key)
        public_key = ec.EllipticCurvePublicKey.from_encoded_point(ec.SECP256K1(), pk_bytes)
        public_key = public_key.public_bytes(encoding=Encoding.PEM, format=PublicFormat.SubjectPublicKeyInfo)
        public_key = crypto.load_publickey(crypto.FILETYPE_PEM, public_key)
        certificate = Certificate(identity=identity)
        certificate.save()
        cert = crypto.X509()
        cert.get_subject().C = "PL"
        cert.get_subject().CN = " ".join([identity.user.first_name, identity.user.last_name, identity.blockchain_address])
        cert.set_serial_number(certificate.id)
        cert.gmtime_adj_notBefore(0)
        cert.gmtime_adj_notAfter(365 * 24 * 60 * 60) # year in seconds
        cert.set_issuer(settings.CERTIFICATE.get_subject())
        cert.set_pubkey(public_key)
        cert.sign(settings.CERTIFICATE_PRIVATE_KEY, 'sha512')
        cert = crypto.dump_certificate(crypto.FILETYPE_PEM, cert)
        certificate.certificate_der = cert
        return certificate

    def hash(self):
        print(hashlib.sha256(self.certificate_der).hexdigest())
        return hashlib.sha256(self.certificate_der).hexdigest()