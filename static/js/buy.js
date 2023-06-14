firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

    var bring_id = new URLSearchParams(window.location.search);
    var auctionId = bring_id.get('id'); // bring_id에서 실제 값 추출
    var my_name = JSON.parse(localStorage.getItem('user')).displayName;
    var my_uid = JSON.parse(localStorage.getItem('user')).uid;

    //시간 함수
    var today = new Date();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var hour = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();
    function padNumber(num) {
        return num.toString().padStart(2, '0');
    }
    var formattedDateTime = `${padNumber(month)}월 ${padNumber(day)}일 ${padNumber(hour)}시 ${padNumber(minute)}분 ${padNumber(second)}초`;

    var my_img;
    var email;
    var mmname;
    var maxMoney;

    let item;
    // 하루를 밀리초 단위로 나타내는 값
    var oneDay = 24 * 60 * 60 * 1000;

    // 오늘 날짜에서 하루를 뺀 날짜 계산
    var previousDay = new Date(today.getTime() - oneDay);

    // 연, 월, 일 정보 가져오기
    var previousYear = previousDay.getFullYear();
    var previousMonth = previousDay.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
    var previousDate = previousDay.getDate();

    // 날짜를 두 자리 숫자로 표현하기 위해 필요한 처리
    previousMonth = previousMonth < 10 ? '0' + previousMonth : previousMonth;
    previousDate = previousDate < 10 ? '0' + previousDate : previousDate;
    console.log(previousYear + previousMonth + previousDate);
    let search_date = previousYear + previousMonth + previousDate;

    // 입찰 최대가 가져오기
    db.collection('auction').doc(auctionId).collection('bid').get().then((result) => {
        maxMoney = 0;

        result.forEach((a) => {
            var money = a.data().money;
            if (money > maxMoney) {
                maxMoney = money;
            }
        });
    });

    // Firebase Firestore 데이터 가져오기 및 DOM 업데이트
    db.collection('auction').doc(auctionId).get().then((result) => {
        item = result.data().제목;
        console.log(item)
        console.log(search_date)
            // AJAX 요청을 보냅니다.
            $.ajax({
                url: '/check_price_1/',
                method: 'GET',
                data: {
                    search_date: search_date,
                    item: item,
                },
                success: function(response) {
                    if (response.avg_total_price === 0) {
                        // 거래량이 없는 경우
                        $('#resultt').html('거래량이 없습니다.');
                    } else if (response.avg_total_price) {
                        // 평균 가격이 있는 경우
                        var resultText = `${response.avg_total_price}원`;
                        $('#resultt').html(resultText);
                    } else {
                        // 입력이 필요한 경우
                        $('#resultt').html('입력 해 주세요.');
                    }
                },
                error: function(error) {
                    $('#resultt').html('요청실패');
                }
            });

        $('#nname').html(`<strong>${result.data().name}의 경매현황</strong>`);
        $('#pprice').html(`${maxMoney}원`);
        $('#buynow').html(result.data().즉구+'원');
        $('#yesterday').html(result.data().제목);

        db.collection('auction').doc(auctionId).collection('bid').orderBy('money', 'desc').get().then((result) => {
            result.forEach((a) => {
                console.log(a.data())
                var list = `
                                    <div class="buy-room">
                                    <img src="${a.data().my_img}">
                                    <div class="details">
                                        <h2 class="name">${a.data().mmname}</h2>
                                        <h3 class="user_name">${a.data().email}</h3>
                                    </div>
                                    <div class="bid_price" style="padding-right: 150px;"><p style="margin-top: 10px;">${a.data().money}원</p></div>
                                    <div clss="time" style="padding-right: 100px;"><p style="margin-top: 10px;width: 170px;">${a.data().data}</p></div>
                                    <button class="btn btn-success">버튼</button>
                                    <div>`;
                $('.board_list').append(list);
                });
        });
    });

    db.collection('user').doc(my_uid).get().then((result) => {
        my_img = result.data().이미지;
        email = result.data().email;
        mmname = result.data().name;



    $(document).ready(function() {
        $('#send').click(function() {
            var bidValue = $('#chat-input').val();
            if (bidValue > maxMoney) {
                var bid_data = {
                    money: Number(bidValue),
                    data: formattedDateTime,
                    uid: my_uid,
                    name: my_name,
                    my_img: my_img,
                    email: email,
                    mmname: mmname
                };
                db.collection('auction').doc(auctionId).collection('bid').add(bid_data)
                    .then(function() {
                        console.log('입찰완료');
                        location.reload(); // 페이지 새로고침
                    })
                    .catch(function(error) {
                        console.error('입찰 오류:', error);
                    });
            } else {
                console.error('입찰값을 입력해주세요.');
                alert("입력형식이 잘못되었습니다.");
            }
        });
    });
    });

