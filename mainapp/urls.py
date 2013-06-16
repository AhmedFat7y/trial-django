from django.conf.urls.defaults import patterns, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('mainapp.views',
    # Examples:
    url(r'^/?$', 'index', name='home'),
    url(r'^check-for-new-images/?$', 'check_for_new_images', name='check_for_new_images'),
    url(r'^get-new-images/?$', 'get-new-images', name='get_new_images'),
    
)
