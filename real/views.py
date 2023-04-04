# Create your views here.
from django.shortcuts import render
#xpvpvpvp
def home(request):
    return render(request, '../../real/templates/v2023/home.html')


def freeboard(request):
    return render(request, '../../real/templates/v2023/freeboard.html', {'freeboard': 'test2'})


def login(request):
    return render(request, '../../real/templates/v2023/login.html', {'login': 'test2'})


def jtm(request):
    return render(request, '../../real/templates/v2023/jtm.html', {'jtm': 'test2'})


def write(request):
    return render(request, '../../real/templates/v2023/write.html', {'write': 'test2'})


def market(request):
    return render(request, '../../real/templates/v2023/market.html', {'market': 'test2'})


def view(request):
    return render(request, '../../real/templates/v2023/view.html', {'view': 'test2'})

import requests
import xmltodict
from datetime import datetime, timedelta
import time

def check(search_date, item):
    start = time.time()
    api_key = '399a12818bb184fe2a3f0d3c393c10da8f967c234392c801455bb606d426ce6c'
    tday = datetime.today() - timedelta(1)
    tday = int(tday.strftime("%Y%m%d"))

    url = f'http://211.237.50.150:7080/openapi/{api_key}/xml/Grid_20141119000000000012_1/1/1000?AUCNG_DE={search_date}&PRDLST_NM={item}'
    content = requests.get(url).content
    dict = xmltodict.parse(content)

    totalCnt = int(dict['Grid_20141119000000000012_1']['totalCnt'])

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
            total_price.append(int(row['AVRG_AMT']))

    avg_total_price = sum(total_price) // totalCnt
    end = time.time()
    runtime = end - start
    return avg_total_price


def check_price(request):
    search_date = request.GET.get('search_date')
    item = request.GET.get('item')
    avg_total_price = check(search_date, item)
    context = {
        'search_date': search_date,
        'item': item,
        'avg_total_price': avg_total_price
    }
    return render(request, 'v2023/home.html', context)



