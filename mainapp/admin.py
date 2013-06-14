#from django.contrib.admin.sites import AdminSite
from django.contrib import admin
from models import Memory, Quote, Person




admin.site.register(Memory)
admin.site.register(Quote)
admin.site.register(Person)

