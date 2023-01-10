import bech32
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from django.core.exceptions import ValidationError


class SignupForm(UserCreationForm):
    email = forms.EmailField(max_length=200, help_text="Required")
    first_name = forms.CharField(max_length=50)
    last_name = forms.CharField(max_length=50)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2')


def validate_bech32(value):
    if bech32.bech32_decode(value) == (None, None):
        raise ValidationError("Given value is not bech32 address with cosmos prefix")


class RequestTokensForm(forms.Form):
    address = forms.CharField(max_length=45, validators=[validate_bech32])
