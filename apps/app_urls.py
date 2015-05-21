# -*- coding: utf-8 -*-
from django.conf.urls.defaults import *
from django.contrib.auth.views import login, logout
from example1 import example1_urls
from apps.app_views import *

urlpatterns = patterns('',
       url(r'^$', index),
       url(r'^example1/', include(example1_urls)),
)
