firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();

var firstVisible;
var lastVisible;

var my_uid = JSON.parse(localStorage.getItem('user')).uid;
db.collection('user').doc(my_uid).get().then((result) => {
        console.log(result.data().nickname);
        $('#username').html(result.data().nickname)
    });
// 첫 페이지 데이터 로드
db.collection('product').orderBy('num', 'desc').limit(5).get().then((documentSnapshots) => {
  const docs = documentSnapshots.docs;
  firstVisible = docs[0];
  lastVisible = docs[docs.length - 1];

  docs.forEach((doc) => {
    console.log(doc.data());
    var list = `<div>
                  <div class="num">${doc.data().num}</div>
                  <div class="title"><a style="text-decoration-line: none; color: black" href="http://127.0.0.1:8000/fb_view.html?id=${doc.id}">${doc.data().제목}</a></div>
                  <div class="writer">${doc.data().이름}</div>
                  <div class="date">${doc.data().날짜}</div>
                  <div class="count">13</div>
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
                        <div class="num">${doc.data().num}</div>
                        <div class="title"><a style="text-decoration-line: none; color: black" href="http://127.0.0.1:8000/fb_view.html?id=${doc.id}">${doc.data().제목}</a></div>
                        <div class="writer">${doc.data().이름}</div>
                        <div class="date">${doc.data().날짜}</div>
                        <div class="count">11</div>
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
                        <div class="num">${doc.data().num}</div>
                        <div class="title"><a style="text-decoration-line: none; color: black" href="http://127.0.0.1:8000/fb_view.html?id=${doc.id}">${doc.data().제목}</a></div>
                        <div class="writer">${doc.data().이름}</div>
                        <div class="date">${doc.data().날짜}</div>
                        <div class="count">10</div>
                      </div>`;
          $('.board_list').append(list);
        });
      }
    });
  });
});


