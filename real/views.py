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
def auction_write(request):
    return render(request, 'v2023/auction_write.html', {'auction_write': 'test2'})
def buy(request):
    return render(request, 'v2023/buy.html', {'buy': 'test2'})
def search(request):
    return render(request, 'v2023/search.html', {'search': 'test2'})

from django.shortcuts import render
import requests
import xmltodict
from django.http import JsonResponse

def check_price_data(search_date, item):
    api_key = '399a12818bb184fe2a3f0d3c393c10da8f967c234392c801455bb606d426ce6c'
    url = f'http://211.237.50.150:7080/openapi/{api_key}/xml/Grid_20141119000000000012_1/1/1000?AUCNG_DE={search_date}&PRDLST_NM={item}'
    content = requests.get(url).content
    data_dict = xmltodict.parse(content)

    totalCnt = int(data_dict['Grid_20141119000000000012_1']['totalCnt'])

    if totalCnt == 0:
        return 0

    page_size = 1000
    num_pages = (totalCnt + page_size - 1) // page_size
    total_price = []

    for i in range(num_pages):
        minimum = i * page_size + 1
        maximum = (i + 1) * page_size
        total_url = f'http://211.237.50.150:7080/openapi/{api_key}/xml/Grid_20141119000000000012_1/{minimum}/{maximum}?AUCNG_DE={search_date}&PRDLST_NM={item}'
        total_content = requests.get(total_url).content
        total_dict = xmltodict.parse(total_content)

        for row in total_dict['Grid_20141119000000000012_1']['row']:
            if isinstance(row, dict):
                total_price.append(int(row['AVRG_AMT']))

    avg_total_price = sum(total_price) // totalCnt
    return avg_total_price


def check_price_1(request):
    search_date = request.GET.get('search_date')
    item = request.GET.get('item')
    avg_total_price = check_price_data(search_date, item)
    context = {
        'search_date': search_date,
        'item': item,
        'avg_total_price': avg_total_price,
    }
    if avg_total_price == 0:
        context['message'] = '거래량이 없습니다.'

    return JsonResponse(context)
