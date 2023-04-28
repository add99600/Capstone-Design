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


const db = firebase.firestore(); // db문법 소환
db.collection('product').get().then((결과)=>{
    결과.forEach((doc)=>{
        console.log(doc.data());

        var list = `    <div>
                           <div class="num">1</div>
                           <div class="title"><a href="http://127.0.0.1:8000/fb_view.html?id=${doc.id}">${doc.data().제목}</a></div>
                           <div class="writer">ㅎㅇ</div>
                           <div class="date">${doc.data().날짜}</div>
                           <div class="count">${doc.data().조회수}</div>
                           </div>`;
        $('.board_list').append(list);

        // 아래코드들은 조회수 +1 하고 해당 링크로 이동시키는 코드
        $('.board_list').on('click', '.title a', function(event) {
            event.preventDefault(); // 기본 동작 취소

            const postId = $(this).closest('div').find('.count'); // 게시글의 count 요소

            // 해당 게시글의 '조회수' 필드를 1 증가시킴
            db.collection('product').doc(doc.id).update({
                조회수: firebase.firestore.FieldValue.increment(1)
            })
                .then(() => {
                    postId.text(parseInt(postId.text()) + 1); // count 값을 1 증가시킴
                    window.location.href = $(this).attr('href');
                })
                .catch((error) => {
                    console.error('Error updating document: ', error);
                });
        });
    });
});