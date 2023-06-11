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
from django.conf import settings
from django.conf.urls.static import static

from .views import *
from django.urls import path
from .api import check_price, check

app_name = 'v2023'
urlpatterns = [
    path('', home, name='home'), #홈

    path('login.html', login, name='login'), #로그인
    path('jtm.html', jtm, name='jtm'), #회원가입
    path('mypage.html', mypage, name='mypage'),  # 마이페이지

    path('chat.html', chat, name='chat'),  # 임시 채팅
    path('chatting.html', chatting, name='chatting'),  # 채팅


    path('freeboard.html', freeboard, name='freeboard'), #자유게시판
    path('fb_write.html', fb_write, name='fb_write'), #글쓰기
    path('fb_view.html', fb_view, name='fb_view'), #글보기
    path('fb_edit.html', fb_edit, name='fb_edit'), #글수정

    path('market.html', market, name='market'), #직거래
    path('m_write.html', m_write, name='m_write'), #글쓰기
    path('m_view.html', m_view, name='m_view'), #글보기
    path('m_edit.html', m_edit, name='m_edit'), #글수정

    path('auction.html', auction, name='auction'), #경매
    path('auction_write.html', auction_write, name='auction_write'), #경매작성
    path('buy.html', buy, name='buy'), #경매

    path('check_price/', check_price, name='check_price'),
    path('check/', check, name='check'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)