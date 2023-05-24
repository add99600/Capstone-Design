from django.shortcuts import render

def home(request):
    return render(request, 'v2023/home.html')


def login(request):
    return render(request, 'v2023/login.html')
def jtm(request):
    return render(request, 'v2023/jtm.html', {'jtm': 'test2'})
def mypage(request):
    return render(request, 'v2023/mypage.html', {'mypage': 'test2'})
def chat(request):
    return render(request, 'v2023/chat.html', {'chat': 'test2'})

def chatting(request):
    return render(request, 'v2023/chatting.html', {'chatting': 'test2'})


def freeboard(request):
    return render(request, 'v2023/freeboard.html', {'freeboard': 'test2'})
def fb_write(request):
    return render(request, 'v2023/fb_write.html', {'fb_write': 'test2'})
def fb_view(request):
    return render(request, 'v2023/fb_view.html', {'fb_view': 'test2'})
def fb_edit(request):
    return render(request, 'v2023/fb_edit.html', {'edit': 'test2'})


def market(request):
    return render(request, 'v2023/market.html', {'market': 'test2'})
def m_write(request):
    return render(request, 'v2023/m_write.html', {'m_write': 'test2'})
def m_view(request):
    return render(request, 'v2023/m_view.html', {'m_view': 'test2'})
def m_edit(request):
    return render(request, 'v2023/m_edit.html', {'m_edit': 'test2'})


def auction(request):
    return render(request, 'v2023/auction.html', {'auction': 'test2'})
