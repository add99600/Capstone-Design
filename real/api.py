import requests
import xmltodict
from datetime import datetime, timedelta
import agri_key

def check_out(search_date, item):
    api_key = agri_key.key
    tday = datetime.today() - timedelta(1)
    tday = int(tday.strftime("%Y%m%d"))
    if not search_date.isdigit() or int(search_date) < 20180118 or int(search_date) > tday:
        return '올바른 검색 날짜를 입력하세요.'
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

    if not total_price:
        return f"{search_date} {item}의 검색 결과가 없습니다."
    avg_total_price = sum(total_price) // totalCnt
    return avg_total_price

