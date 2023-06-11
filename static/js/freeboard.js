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

var firstVisible;
var lastVisible;

// 첫 페이지 데이터 로드
db.collection('product').orderBy('num', 'desc').limit(5).get().then((documentSnapshots) => {
  const docs = documentSnapshots.docs;
  firstVisible = docs[0];
  lastVisible = docs[docs.length - 1];

  docs.forEach((doc) => {
    console.log(doc.data());
    var list = `<div>
                  <div class="num">1</div>
                  <div class="title"><a style="text-decoration-line: none; color: black" href="http://127.0.0.1:8000/fb_view.html?id=${doc.id}">${doc.data().제목}</a></div>
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

    const next = db.collection("product").orderBy('num', 'desc').startAfter(lastVisible.data().num).limit(5);

    next.get().then((result) => {
      const nextDocs = result.docs;
      if (nextDocs.length > 0) {
        firstVisible = nextDocs[0];
        lastVisible = nextDocs[nextDocs.length - 1];

        nextDocs.forEach((doc) => {
          console.log(doc.data());
          var list = `<div>
                        <div class="num">1</div>
                        <div class="title"><a style="text-decoration-line: none; color: black" href="http://127.0.0.1:8000/fb_view.html?id=${doc.id}">${doc.data().제목}</a></div>
                        <div class="writer">${doc.data().이름}</div>
                        <div class="date">${doc.data().날짜}</div>
                        <div class="count">조회수</div>
                      </div>`;
          $('.board_list').append(list);
        });
      }
    });
  });

  // "이전" 버튼 클릭 시 실행될 함수
  $('#prev').on('click', function() {
    if (firstVisible === undefined) {
      return; // 첫 페이지인 경우, 이전 페이지를 불러오지 않음
    }

    $('.board_list').children().not('#top').remove();

    const prev = db.collection("product").orderBy('num', 'desc').endBefore(firstVisible.data().num).limitToLast(5);

    prev.get().then((result) => {
      const prevDocs = result.docs;
      if (prevDocs.length > 0) {
        firstVisible = prevDocs[0];
        lastVisible = prevDocs[prevDocs.length - 1];

        prevDocs.forEach((doc) => {
          console.log(doc.data());
          var list = `<div>
                        <div class="num">1</div>
                        <div class="title"><a style="text-decoration-line: none; color: black" href="http://127.0.0.1:8000/fb_view.html?id=${doc.id}">${doc.data().제목}</a></div>
                        <div class="writer">${doc.data().이름}</div>
                        <div class="date">${doc.data().날짜}</div>
                        <div class="count">조회수</div>
                      </div>`;
          $('.board_list').append(list);
        });
      }
    });
  });
});


