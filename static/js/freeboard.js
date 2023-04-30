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
const pageLimit = 10; // 한 페이지에 보여줄 데이터 수
let lastVisible = null; // 이전 페이지의 마지막 데이터

function loadProducts() {
  let query = db.collection('product').orderBy('date', 'desc').limit(pageLimit); // 날짜 역순으로 정렬

  if (lastVisible) {
    query = query.startAfter(lastVisible); // 이전 페이지의 마지막 데이터를 기준으로 다음 페이지를 가져옴
  }

  query.get().then((snapshot) => {
    if (snapshot.size > 0) {
      lastVisible = snapshot.docs[snapshot.size - 1]; // 이전 페이지의 마지막 데이터 저장
      snapshot.forEach((doc) => {
        const data = doc.data();
        const list = `
          <div>
            <div class="num">1</div>
            <div class="title"><a href="http://127.0.0.1:8000/fb_view.html?id=${doc.id}">${data.제목}</a></div>
            <div class="writer">작성자</div>
            <div class="date">${data.date.toDate().toLocaleDateString()}</div>
            <div class="count">조회수</div>
          </div>
        `;
        $('.board_list').append(list);
      });
    } else {
      console.log('No more data');
    }
  }).catch((error) => {
    console.log('Error getting documents:', error);
  });
}

loadProducts(); // 페이지 로드 시 첫번째 페이지 데이터 로드

$('.bt next').on('click', () => {
  loadProducts(); // 더보기 버튼 클릭 시 다음 페이지 데이터 로드
});

