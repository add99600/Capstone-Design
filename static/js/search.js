firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
var my_uid = JSON.parse(localStorage.getItem('user')).uid;
var sear;

db.collection('user').doc(my_uid).get().then((result) => {
        console.log(result.data().nickname);
        $('#username').html(result.data().nickname)
});

// 본인이 검색한 데이터를 가져오고, 시간 역순으로 나열한 값 중에 1번째 값만 가져옴
db.collection('search').where('uid', '==', my_uid).orderBy("data", "desc").limit(1).get().then((result) => {
    sear = result.docs[0].data().search;
    console.log(sear)
    $('#search_namee').html(sear + '의 검색결과');


    db.collection('post').get().then((result) => {
        const filteredDocs = result.docs.filter((doc) => {
            const title = doc.data().title;
            return title.includes(sear);
        });

        filteredDocs.forEach((doc) => {
            console.log(doc.data());

            var list = `
                <div class="item">
                    <img src="${doc.data().이미지}" style="border-radius: 12px; height: 200px; width:200px">
                    <h2 class="item_name"><a style="text-decoration-line: none; color: black" href="http://127.0.0.1:8000/m_view.html?id=${doc.id}">${doc.data().title}</a></h2>
                    <h2 class="item_cost">${doc.data().가격}원</h2>
                    <h1 class="item_place"></h1>
                    <div class="like_chating">
                        <span class="like">관심 15</span>
                        <span>&nbsp;&nbsp;・&nbsp;&nbsp;</span>
                        <span class="chat">채팅 48</span>
                    </div>
                </div>`;

            $('.item_row').append(list);
        });
    });
});
