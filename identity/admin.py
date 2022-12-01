from django.contrib import admin

from .models import Certificate, OwnedIdentities


admin.site.register(Certificate)
admin.site.register(OwnedIdentities)
