    firebase.initializeApp(firebaseConfig);

    const auth = firebase.auth();
    const db = firebase.firestore();
    const storage = firebase.storage();
    var my_uid = JSON.parse(localStorage.getItem('user')).uid
    var bring = new URLSearchParams(window.location.search);

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user.uid);
        }
    });

    // 자유게시판 본인이 작성한 글만 불러옴
    db.collection('product').where('uid', '==', my_uid).orderBy("date", "desc").limit(5).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var list = `<tr>
                            <td class="fb_num">${doc.data().num}</td>
                            <td class="fb_title"><a href="http://127.0.0.1:8000/fb_view.html?id=${doc.id}">${doc.data().제목}</a></td>
                            <td class="fb_writer">${doc.data().이름}</td>
                            <td class="fb_date">${doc.data().날짜}</td>
                            <td class="fb_count">조회수</td>
                        </tr>`;
            $('.fb_my_write').append(list);
        });
      })
      .catch((error) => {
        console.log(error);
      });


    db.collection('post').where('uid', '==', my_uid).orderBy("date", "desc").limit(5).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var list = `        <div class="m_profile">
                                    <img src="${doc.data().이미지}">
                                    <div class="m_details">
                                        <h2 class="m_title">${doc.data().title}</h2>
                                        <h4 class="m_price">${doc.data().가격}</h4>
                                        <h4 class="m_date">작성 날짜 : ${doc.data().날짜}</h4>
                                    </div>
                                </div>`;
            $('.m_line').append(list);
        });
    }).catch((error) => {
        console.log(error);
    });

    db.collection('auction').where('uid', '==', my_uid).orderBy("date", "desc").limit(5).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var list = `        <tr><!-- 테스트 예시 -->
                                    <td class="ac_num">0</td>
                                    <td class="ac_title" ><a href="http://127.0.0.1:8000/auction.html">${doc.data().제목}</a></td>
                                    <td class="ac_price">${doc.data().현재가}</td>
                                    <td class="ac_date">${doc.data().날짜}</td>
                                    <td class="ac_count">2</td>
                                </tr>`;
            $('.ac_my_write').append(list);
        });
    }).catch((error) => {
        console.log(error);
    });


    // 마이페이지 본인이름 뜨게함
    db.collection('user').doc(bring.get('id')).get().then((result) => {
        $('#name').html(result.data().nickname)
    });





    //변경된 나의 정보
    db.collection('user').doc(my_uid).get().then((result) => {
        $('#myname').html(result.data().nickname);
        $('#myage').html(result.data().age);
        $('#myjob').html(result.data().job);
        $('#mybaN').html(result.data().ban);
        $('#myhmA').html(result.data().hma);
        $('#circle-img').attr('src', result.data().이미지);

        $('#username').val(result.data().nickname);
        $('#age').val(result.data().age);
        $('#job').val(result.data().job);
        $('#baN').val(result.data().ban);
        $('#hmA').val(result.data().hma);
    });