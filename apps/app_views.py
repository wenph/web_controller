# -*- coding: utf-8 -*-
import urllib

import simplejson
import settings
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.template import RequestContext
from django.utils.simplejson import dumps
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as auth_login



def index(request):
    args = RequestContext(request)
    args['title_info_bar'] = 'Example Portal'
    args['username'] = '游客'
    return render_to_response('index.html', args)


def welcome(request):
    args = RequestContext(request)
    return render_to_response('welcome.html', args)


# noinspection PyBroadException
def logout(request):
    response = HttpResponseRedirect('/')
    try:
        response.delete_cookie('SSO_TOKEN')
        response.delete_cookie('USER_COOKIE')
        response.delete_cookie('LAST_HEART_BEAT_TIME')
        return response
    except Exception:
        return response


def get_current_user(request):
    username = request.user.username
    change = request.user.has_perm('sites.change_site')
    json = dumps({'username':username,'topo_edit':change})
    return HttpResponse(json)
