var firebaseConfig = {
    apiKey: "AIzaSyCunQjLi23bBAybA97IFMaIrXUwuJSV8mM",
    authDomain: "wepdo-7bed1.firebaseapp.com",
    databaseURL: "https://wepdo-7bed1-default-rtdb.firebaseio.com",
    projectId: "wepdo-7bed1",
    storageBucket: "wepdo-7bed1.appspot.com",
    messagingSenderId: "204948006692",
    appId: "1:204948006692:web:bbb863d7032ddbbf64b5b1",
    measurementId: "G-7NQSDSFC61"
};
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();

// 초기 데이터 로드
var lastVisible;

// 첫 페이지 데이터 로드
db.collection('product').orderBy('date', 'desc').limit(5).get().then((documentSnapshots) => {
  documentSnapshots.forEach((doc) => {
    lastVisible = doc;
    console.log(doc.data());

    var list = `<div>
                  <div class="num">1</div>
                  <div class="title" ><a style="text-decoration-line: none; color: black" href="http://127.0.0.1:8000/fb_view.html?id=${doc.id}">${doc.data().제목}</a></div>
                  <div class="writer">${doc.data().이름}</div>
                  <div class="date">${doc.data().날짜}</div>
                  <div class="count">조회수</div>
                </div>`;
    $('.board_list').append(list);
  });

  // "다음" 버튼 클릭 시 실행될 함수
    $('#next').on('click', function() {
      if (lastVisible === undefined) {
        return; // 마지막 페이지인 경우, 다음 페이지를 불러오지 않음
      }

      $('.board_list').children().not('#top').remove();

      const next = db.collection("product").orderBy('date', 'desc').startAfter(lastVisible).limit(5);

      next.get().then((result) => {
        result.forEach((doc) => {
          console.log(doc.data());
          var list = `<div>
                        <div class="num">1</div>
                        <div class="title"><a style="text-decoration-line: none; color: black" href="http://127.0.0.1:8000/fb_view.html?id=${doc.id}">${doc.data().제목}</a></div>
                        <div class="writer">${doc.data().이름}</div>
                        <div class="date">${doc.data().날짜}</div>
                        <div class="count">조회수</div>
                      </div>`;
          $('#board').append(list);
          lastVisible = doc;
        });
      });
    });
});




$('.on').click(function(){
    const my_uid = JSON.parse(localStorage.getItem('user')).uid

    if (my_uid) {
        window.location.href = 'http://127.0.0.1:8000/fb_write.html?id=' + my_uid;
    } else {
        // 로그인이 되어 있지 않은 경우, 로그인 페이지로 이동하도록 설정할 수 있습니다.
        window.location.href = 'http://127.0.0.1:8000/login.html';
    }
});

