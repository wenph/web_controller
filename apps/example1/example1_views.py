#coding=utf-8

from django.contrib.auth.decorators import login_required, permission_required
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.template import RequestContext
from django.shortcuts import render_to_response
import logging
import traceback
import json


def example1_menu_tree(request):
    children = [
        {'id': 'leaf1', 'text': '例子1', 'leaf': True},

    ]
    tree = {'id': '0', 'children': children}
    json_tree = json.dumps(tree)
    return HttpResponse(json_tree)

#@csrf_exempt
#def example1_view(request):
#    try:
#        args = RequestContext(request)
#        args['title_info_bar'] = 'Example Portal'
#        args['username'] = '游客'
#        return render_to_response('index.html', args)
#    except:
#        print traceback.format_exc()

@csrf_exempt
def example1_graph_view(request):
    try:
        args = RequestContext(request)
        return render_to_response('example1/example1.html', args)
    except:
        print traceback.format_exc()

