firebase.initializeApp(firebaseConfig);

const db = firebase.firestore(); // db문법 소환

var my_uid = JSON.parse(localStorage.getItem('user')).uid;
db.collection('user').doc(my_uid).get().then((result) => {
        console.log(result.data().nickname);
        $('#username').html(result.data().nickname)
    });
db.collection('post').get().then((결과) => {
        결과.forEach((doc)=>{
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