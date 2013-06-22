from django.db import models
from django.contrib import auth
from django.db.models.query import QuerySet
from settings import QUOTES_OWNERS_IMAGES, QUOTES_RELATED_IMAGES, MEMORIES_IMAGES
from wwwroot.stdimage import StdImageField


# Create your models here.
class Person(models.Model):
  name = models.CharField(max_length=500)
  memories = models.ManyToManyField('Memory', related_name='people_in_image_set')
  def __unicode__(self):
    return self.name
    
class Memory(models.Model):
  situation = models.CharField(max_length=500)
  image = StdImageField(upload_to=MEMORIES_IMAGES, blank=True, size=(1920, 1200), thumbnail_size=(150, 75, True))
  people_in_image_set = QuerySet()
  is_hidden = models.BooleanField()
  def __unicode__(self):
    return self.situation

class Quote(models.Model):
  owner_image = StdImageField(upload_to=QUOTES_OWNERS_IMAGES, blank=True, thumbnail_size=(150, 75, True))
  quote_related_image = StdImageField(upload_to=QUOTES_RELATED_IMAGES, blank=True, size=(1920, 1200), thumbnail_size=(150, 75, True))
  owner_name = models.CharField(max_length=500)
  content = models.CharField(max_length=1000)
  is_hidden = models.BooleanField()
  def __unicode__(self):
    return self.content