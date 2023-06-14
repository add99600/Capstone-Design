    firebase.initializeApp(firebaseConfig);

    var today = new Date();
    var month = today.getMonth() + 1;
    var day = today.getDate();

    const db = firebase.firestore();
    const storage = firebase.storage();

    var my_uid = JSON.parse(localStorage.getItem('user')).uid

    var my_name = JSON.parse(localStorage.getItem('user')).displayName

    var bring = new URLSearchParams(window.location.search);

    var seller_uid
    var item_name
    var seller_name
    var img

    db.collection('post').doc(bring.get('id')).get().then((result) => {
      seller_uid = result.data().uid;
      item_name = result.data().title;
      seller_name = result.data().name;
      img = result.data().이미지;

      console.log(result.data())
      $('.title').html(result.data().title)
      $('.price').html(result.data().가격)
      $('.date').html(result.data().날짜)
      $('.content').html(result.data().내용)
      $('.detail-pic').attr('src', img);

      if (my_name == seller_name){
          $('#chat').hide();
      }
    });


$('#chat').click(function(){
    var chat_data = {
        who: [my_uid, seller_uid].sort(), // 내 uid, 판매자 uid를 정렬한 배열
        product: item_name,
        date: month + "월 " + day + "일",
        name: seller_name,
        img: img
    };

    // who 필드를 정렬한 후 문자열로 변환
    var chat_id = chat_data.who.join('') + chat_data.product;

    // 중복 체크 및 채팅방 생성
    db.collection('chat').doc(chat_id)
        .get()
        .then((doc) => {
            if (doc.exists) {
                // 이미 채팅방이 존재하는 경우
                window.location.href = 'chatting.html?id=' + my_uid;
            } else {
                // 중복 체크를 위해 해당 채팅방 ID를 저장해둠
                localStorage.setItem('currentChatId', chat_id);

                // 새로운 채팅방 생성
                db.collection('chat').doc(chat_id).set(chat_data)
                    .then(() => {
                        console.log("채팅방이 생성되었습니다.");
                        window.location.href = 'chatting.html?id=' + my_uid;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        })
        .catch((error) => {
            console.error(error);
        });
});
