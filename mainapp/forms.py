# -*- coding: UTF-8
'''
Created on ١٨‏/٠٤‏/٢٠١٢

@author: Ahmed
'''
from django.forms.models import ModelForm
from models import Memory, Quote, Person

class QuoteForm(ModelForm):
  class Meta:
    model = Quote
    exclude = ['is_hidden']

class MemoryForm(ModelForm):
  class Meta:
    model = Memory
    exclude = ['is_hidden']
