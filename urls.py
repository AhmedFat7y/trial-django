from django.conf.urls.defaults import patterns, include, url
from settings import MEDIA_ROOT, MEDIA_URL
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
     url(r'^admin/', include(admin.site.urls)),
     url(r'^' +  MEDIA_URL + '(?P<path>.*)$', 'django.views.static.serve', 
                                  {'document_root': MEDIA_ROOT,}),
     url(r'^', include('wwwroot.mainapp.urls')),
)
