from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import redirect_to_login
from django.core.mail import EmailMessage
from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import render, redirect

from django.http import HttpResponse, FileResponse
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.views.generic import FormView

from documents.models import DocumentStorage
from identity.forms import SignupForm, RequestTokensForm
from identity.models import Identity, Certificate
from identity.tokens import account_activation_token

import os
import logging

from service import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# https://medium.com/@frfahim/django-registration-with-confirmation-email-bb5da011e4ef
def sign_up(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            current_site = get_current_site(request)
            email_subject = 'Activate your thesis service account'
            message = render_to_string('acc_activate_email.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': account_activation_token.make_token(user)
            })
            email_address = form.cleaned_data.get('email')
            email = EmailMessage(
                email_subject,
                message,
                to=[email_address]
            )
            email.content_subtype = "html"
            email.send()
            return HttpResponse('Please confirm your email address to complete the registration')
    else:
        form = SignupForm()
    logger.info(form.errors)
    return render(request, 'sign_up.html', {'form': form})

def activate(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        login(request, user)
        return redirect('identity:tokens')
    else:
        return HttpResponse('Activation link is invalid!')

@login_required
def index(request):
    try:
        user_identity = Identity.objects.get(user=request.user)
    except Identity.DoesNotExist:
        user_identity = Identity.create(request.user)
        user_identity.save()
    return render(request, 'identity_data.html', {'user': request.user, 'identity': user_identity})

class RequestTokensFormView(FormView):
    form_class = RequestTokensForm
    template_name = 'tokens.html'

    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect_to_login(request.get_full_path())
        form = RequestTokensForm(request.GET)
        if form.is_valid():
            address = form.cleaned_data["address"]
            # this should be logged as in commercial use this option should be somehow limited
            logger.error(f"Sending tokens to {address}")
            os.system(f"{settings.BLOCKCHAIN_CLI} tx bank send {settings.BLOCKCHAIN_CLI_ACCOUNT} {address} 500stake -y")
            messages.info(request, f"Sent tokens to {address}")
            return render(request, self.template_name)
        else:
            return self.form_invalid(form)

@login_required
def certificate(request):
    caller_identity = Identity.objects.get(user=request.user)
    cert = Certificate.objects.select_related("identity__user").get(identity__id=caller_identity.id)
    return FileResponse(cert.certificate_pem, content_type="application/x-pem-file", filename=cert.identity.user.first_name + " " + cert.identity.user.last_name + ".pem")

@login_required
def document_user_certificate(request, document_index, address):
    user_identity = Identity.objects.select_related("user").get(blockchain_address=address)
    doc_storage = DocumentStorage.objects.filter(user__in=[request.user, user_identity.user],
                                                 doc__index=document_index).count()
    if doc_storage == 2 or user_identity.user == request.user:
        cert = Certificate.objects.select_related("identity__user").get(identity__id=user_identity.id)
        return FileResponse(cert.certificate_pem, content_type="application/x-pem-file",
                            filename=cert.identity.user.first_name + " " + cert.identity.user.last_name + ".pem")
    messages.error(request, "You are unauthorized to see this identity or it doesn't exist.")
    return redirect('documents:doc', document_index)

@login_required
def document_identity(request, document_index, address):
    user_identity = Identity.objects.select_related("user").get(blockchain_address=address)
    doc_storage = DocumentStorage.objects.filter(user__in=[request.user, user_identity.user], doc__index=document_index).count()
    if doc_storage == 2 or user_identity.user == request.user:
        return render(request, "other_user_identity.html", {'identity': user_identity, 'document_index': document_index})
    messages.error(request, "You are unauthorized to see this identity or it doesn't exist.")
    return redirect('documents:doc', document_index)
