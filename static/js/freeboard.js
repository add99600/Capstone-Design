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

db.collection('product').orderBy('date','desc').limit(5).get().then((결과) => {
        결과.forEach((doc)=>{
            console.log(doc.data());

        var list = `<div>
                        <div class="num">1</div>
                        <div class="title"><a href="http://127.0.0.1:8000/fb_view.html?id=${doc.id}">${doc.data().제목}</a></div>
                        <div class="writer">작성자</div>
                        <div class="date">${doc.data().날짜}</div>
                        <div class="count">조회수</div>
                    </div>`;
        $('.board_list').append(list);
    });
});
