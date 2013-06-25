# Create your views here.
from django.http import HttpResponse, HttpRequest, HttpResponseRedirect, HttpResponseForbidden, HttpResponseBadRequest
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.core import serializers
from django.utils import simplejson
from django.views.decorators.http import require_GET
from django.contrib.auth.decorators import user_passes_test, login_required
#from wwwroot.mainapp.forms import CommentForm, LoginForm, RegisterationForm, BlogCreationForm
from django.contrib import auth
from django.core.urlresolvers import reverse
import MemoryRepository
import QuoteRepository
from mainapp.Settings import LOCK_SITE

def if_logged_in(user):
  return not LOCK_SITE or user.is_authenticated()

@user_passes_test(if_logged_in)
def index(request):
  images_count = MemoryRepository.all().count()
  data = {
    'images_count' : images_count
  }
  return render_to_response("mainapp/main_pages/index.html", data, context_instance=RequestContext(request))

@user_passes_test(if_logged_in)
def memories(request, memories_group):
  memories = MemoryRepository.get_memories_group(memories_group)[:20]
  data = {
    'all_memories'    : memories,
    'expected_number' : 20,
    'memories_group'  : memories_group,
  }
  return render_to_response("mainapp/main_pages/memories.html", data, context_instance=RequestContext(request))

@user_passes_test(if_logged_in)
def quotes(request):
  quotes = QuoteRepository.all()[:20]
  images_count = MemoryRepository.all().count()
  data = {
    'all_quotes': quotes,
    'images_count' : images_count,
    'expected_number': 20,
  }
  return render_to_response("mainapp/main_pages/quotes.html", data, context_instance=RequestContext(request))

@user_passes_test(if_logged_in)
def quote(request, quote_id):
  quote = QuoteRepository.find(quote_id)
  if not quote:
    return HttpResponseBadRequest
  dict_to_be_dumped = {
    'owner_name': quote.owner_name,
    'quote_content': quote.content,
  }
  return HttpResponse(simplejson.dumps(dict_to_be_dumped), mimetype='application/json')

@user_passes_test(if_logged_in)
def get_new_memories(request, memories_group):
  try :
    totalImages = request.GET['totalImages']
    totalImages = int(totalImages)
  except: return HttpResponseBadRequest()
  
  memories = MemoryRepository.get_memories_group(memories_group)[totalImages : totalImages + 10]
  dict_to_be_dumped = {}
  i = 0
  for memory in memories:
    dict_to_be_dumped['%s_situation' % i] = memory.situation
    dict_to_be_dumped['%s_image' % i] = memory.image.url
    dict_to_be_dumped['%s_thumb_image' % i] = memory.image.thumbnail.url()
    i+=1
  return HttpResponse(simplejson.dumps(dict_to_be_dumped), mimetype='application/json')
  
@user_passes_test(if_logged_in)
def check_for_new_memories(request, memories_group):
  try :
    totalImages = request.GET['totalImages']
    totalImages = int(totalImages)
  except: return HttpResponseBadRequest()

  memories_count = MemoryRepository.get_memories_group(memories_group)[totalImages : totalImages + 10].count()
  return HttpResponse(memories_count, mimetype='application/text')

@user_passes_test(if_logged_in)
def get_new_quotes(request):
  try :
    totalQuotes = request.GET['totalQuotes']
    totalQuotes = int(totalQuotes)
  except: return HttpResponseBadRequest()
  
  quotes = QuoteRepository.all()[totalQuotes : totalQuotes + 10]
  dict_to_be_dumped = {}
  i = 0
  for quote in quotes:
    dict_to_be_dumped['%s_content' % i] = quote.content[:30]
    dict_to_be_dumped['%s_owner_name' % i] = quote.owner_name
    #dict_to_be_dumped['%s_owner_image' % i] = quote.owner_image.url
    #dict_to_be_dumped['%s_related_image' % i] = quote.quote_related_image.url
    i+=1
  return HttpResponse(simplejson.dumps(dict_to_be_dumped), mimetype='application/json')
  
@user_passes_test(if_logged_in)
def check_for_new_quotes(request):
  try :
    totalQuotes = request.GET['totalQuotes']
    totalQuotes = int(totalQuotes)
  except: return HttpResponseBadRequest()

  quotes_count = QuoteRepository.all()[totalQuotes : totalQuotes + 10].count()
  return HttpResponse(quotes_count, mimetype='application/text')
