    firebase.initializeApp(firebaseConfig);


    const db = firebase.firestore(); // db문법 소환

    var my_uid = JSON.parse(localStorage.getItem('user')).uid;
    var sear;

    db.collection('search').where('uid', '==', my_uid).orderBy("data", "desc").limit(1).get().then((result) => {
        sear = result.docs[0].data().search;
        console.log(sear);

        db.collection('post').where('title', '>=', sear).where('title', '<=', sear + '\uf8ff').get().then((result) => {
            result.forEach((doc) => {
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