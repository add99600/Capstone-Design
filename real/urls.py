"""real URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from .views import *
from django.urls import include, path
from . import views

app_name = 'v2023'
urlpatterns = [
    path('', home, name='home'), #홈

    path('login.html', login, name='login'), #로그인
    path('jtm.html', jtm, name='jtm'), #회원가입

    path('freeboard.html', freeboard, name='freeboard'), #자유게시판
    path('fb_write.html', fb_write, name='fb_write'), #글쓰기

    path('market.html', market, name='market'), #직거래
    path('m_write.html', m_write, name='m_write'), #글쓰기

    path('view.html', view, name='view'), #글보기

    path('check_check', check_price, name='check_price'), #api
    path('check_price', check, name='check')
]
