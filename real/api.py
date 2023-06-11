from django.shortcuts import render
import requests
import xmltodict
from datetime import datetime, timedelta
import time

def check(search_date, item):
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




def check_price(request):
    search_date = request.GET.get('search_date')
    item = request.GET.get('item')
    avg_total_price = check(search_date, item)
    context = {
        'search_date': search_date,
        'item': item,
        'avg_total_price': avg_total_price,
    }
    if avg_total_price == 0:
        context['message'] = '거래량이 없습니다.'

    return render(request, 'v2023/home.html', context)

