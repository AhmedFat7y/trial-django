# Create your views here.
from django.http import HttpResponse, HttpRequest, HttpResponseRedirect
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.core import serializers
from django.utils import simplejson
from models import Person, Memory, Quote
from django.views.decorators.http import require_GET
from django.contrib.auth.decorators import user_passes_test, login_required
#from wwwroot.mainapp.forms import CommentForm, LoginForm, RegisterationForm, BlogCreationForm
from django.contrib import auth
from django.core.urlresolvers import reverse

def index(request):
  memories = Memory.objects.all()[:20]
  return render_to_response("mainapp/index.html", {'all_memories': memories, 'expected_number': 20}, context_instance=RequestContext(request))

def get_new_images(request):
  try :
    totalImages = request.GET['totalImages']
    totalImages = int(totalImages)
  except: return HttpResponseBadRequest()
  
  memories = Memory.objects.all()[totalImages : totalImages + 10]
  dict_to_be_dumped = {}
  i = 0
  for memory in memories:
    dict_to_be_dumped['%s_situation' % i] = memory.situation
    dict_to_be_dumped['%s_image' % i] = memory.image.url
    dict_to_be_dumped['%s_thumb_image' % i] = memory.image.thumbnail.url()
    i+=1
  return HttpResponse(simplejson.dumps(dict_to_be_dumped), mimetype='application/json')
  
def check_for_new_images(request):
  try :
    totalImages = request.GET['totalImages']
    totalImages = int(totalImages)
  except: return HttpResponseBadRequest()

  memories_count = Memory.objects.all()[totalImages : totalImages + 10].count()
  return HttpResponse(memories_count, mimetype='application/text')