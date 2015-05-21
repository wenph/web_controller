#coding=utf-8
from django.conf.urls.defaults import patterns

from apps.example1.example1_views import *


urlpatterns = patterns('',
    (r'example1_menu_tree/$', example1_menu_tree),
    (r'example1_graph_view/$', example1_graph_view),

)