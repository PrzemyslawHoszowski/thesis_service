from django.contrib import admin

from .models import Identity, Certificate

admin.site.register(Identity)
admin.site.register(Certificate)
