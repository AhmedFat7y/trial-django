from django.conf.urls.defaults import patterns, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('mainapp.views',
    # Examples:
    url(r'^/?$', 'index', name='home'),
    #url(r'^about/?$', 'about', name='about'),
    
    url(r'^memories/(?P<memories_group>SE-\d{4})/?$', 'memories', name='memories'),
    url(r'^memories/(?P<memories_group>SE-\d{4})/check-for-new/?$', 'check_for_new_memories', name='check_for_new_memories'),
    url(r'^memories/(?P<memories_group>SE-\d{4})/get-new/?$', 'get_new_memories', name='get_new_memories'),
    
    url(r'^quotes/?$', 'quotes', name='quotes'),
    url(r'^quotes/(?P<quote_id>\d+)/?', 'quote', name='quote'),
    url(r'^quotes/check-for-new/?$', 'check_for_new_quotes', name='check_for_new_quotes'),
    url(r'^quotes/get-new/?$', 'get_new_quotes', name='get_new_quotes'),
    
)
