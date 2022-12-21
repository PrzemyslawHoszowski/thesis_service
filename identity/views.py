from django.contrib.auth.decorators import login_required
from django.core.mail import EmailMessage
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import render

from django.http import HttpResponse
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

from identity.forms import SignupForm
from identity.models import Identity
from identity.tokens import account_activation_token

import logging
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
        # return redirect('home')
        return HttpResponse('Thank you for your email confirmation. Now you can login your account.')
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
