# Create your views here.
from django.http import HttpResponse, HttpRequest, HttpResponseRedirect
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.core import serializers
from models import Person, Memory, Quote
from django.views.decorators.http import require_GET
from django.contrib.auth.decorators import user_passes_test, login_required
#from wwwroot.mainapp.forms import CommentForm, LoginForm, RegisterationForm, BlogCreationForm
from django.contrib import auth
from django.core.urlresolvers import reverse

def index(request):
  memories = Memory.objects.all()
  
  return render_to_response("mainapp/index.html", {'all_memories': memories}, context_instance=RequestContext(request))
