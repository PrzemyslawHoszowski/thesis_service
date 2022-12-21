from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms

from identity.models import Identity


class SignupForm(UserCreationForm):
    email = forms.EmailField(max_length=200, help_text="Required")
    first_name = forms.CharField(max_length=50)
    last_name = forms.CharField(max_length=50)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2')

# class IdentityForm(ModelForm):
#     class Meta:
#         model = Identity
#         exclude = ['id', 'blockchain_address', 'user', 'verification_status', 'verification_token', ]
