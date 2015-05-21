from django.conf.urls import patterns, include, url
from apps.example1.example1_views import *

# Uncomment the next two lines to enable the admin:

urlpatterns = patterns('',
    # Examples:
    #url(r'^$', 'apps.app_views.index', name='home'),

    # Uncomment the admin/doc line below to enable admin documentation:
    #url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    #url(r'^admin/', include(admin.site.urls)),
    #url(r'^$', example1_view),
    url(r'^', include('apps.app_urls')),
)
