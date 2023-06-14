    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();
    const storage = firebase.storage();

    var my_uid = JSON.parse(localStorage.getItem('user')).uid;
    var bring = new URLSearchParams(window.location.search)

    db.collection('product').doc(bring.get('id')).get().then((doc) => {
      console.log(doc.data())

      // 게시글 내용 생성
      var list = `<div class="title">${doc.data().제목}</div>
                  <div class="info">
                    <dl>
                      <dt>번호</dt>
                      <dd>5</dd>
                    </dl>
                    <dl>
                      <dt>글쓴이</dt>
                      <dd>${doc.data().이름}</dd>
                    </dl>
                    <dl>
                      <dt>작성일</dt>
                      <dd>${doc.data().날짜}</dd>
                    </dl>
                    <dl>
                      <dt>조회</dt>
                      <dd>67</dd>
                    </dl>
                  </div>
                  <div class="content" style="font-size: 1.6rem; line-height: 140%; padding: 10px;">${doc.data().내용}</div>`;

      // 게시글 내용을 .board_view에 추가
      $('.board_view').append(list);
    });


    db.collection('product').doc(bring.get('id')).collection('comment').orderBy('data').get().then((result) =>{
        result.forEach((a) => {
            var list = `          <div clss="user_reply" style="display: flex; align-items: center; width: 100%; height: auto; padding:10px; justify-content: space-around">
                                       <div clss="profile" style="display: flex; margin-top: 15px; ">
                                           <h3 class="name" style="width: 130px; height: 30px; padding-left: 10px; font-size: 1.4rem">${a.data().mmname}</h3>
                                           <h3 class="name" style="width: 150px; height: 30px; color: rgba(162,162,162); font-size: 1.2rem">${a.data().email}</h3>
                                       </div>
                                       <div class="reply_text" style="margin-top: 6px; width: 580px; height: auto; padding-left: 50px; font-size: 1rem"><h3>${a.data().comm}</h3></div>
                                       <div class="reply_time" ><h4 style="margin-top: 6px; padding-left: 15px; color: rgba(162,162,162); font-size: 1rem">${a.data().날짜}</h4></div>
                                  </div>`

            $('.card-body-1').append(list);
        });
    });


