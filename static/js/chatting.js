    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();
    const storage = firebase.storage();
    var my_uid = JSON.parse(localStorage.getItem('user')).uid;
    var chatroom_id
    var bring = new URLSearchParams(window.location.search);
    var my_img
    var whoValue

    db.collection('chat').where('who', 'array-contains', my_uid).get().then((result) => {
      result.docs.forEach((doc) => {
        whoValue = doc.data().who;
        console.log(whoValue);
      });
    });


    db.collection('chat').where('who', 'array-contains', bring.get('id')).get().then((result) => {
        result.forEach((doc) => {
        var chatroom = `
                        <div class="chatting-room" data-chat-id="${doc.id}">
                           <img src="${doc.data().img}">
                            <div class="details">
                              <a href="#" class="room_name">${doc.data().product}</a>
                              <div class="room_owner">${doc.data().name}</div>
                           </div>
                        </div>`;
        $('.chatting-list').append(chatroom);
      });

      $('.chatting-room').click(function (e) {
          chatroom_id = $(this).data('chat-id');

          e.stopImmediatePropagation();

          console.log('Chatroom ID:', chatroom_id);

          db.collection('chat').doc(chatroom_id).collection('message').orderBy('data').onSnapshot((result)=>{
              $('.chat-content').html('');
              result.forEach((a)=>{
                    var message = '';
                    if (a.data().uid === my_uid) {
                        db.collection('user').doc(my_uid).get().then((result)=>{
                            my_img = result.data().이미지;
                        });
                        message = `
                            <div class="chat ch2">
                                <div class="icon"><i class="fa-solid fa-user"></i></div>
                                <div class="textbox">${a.data().content}</div>
                            </div>`;
                    } else {
                        message = `
                            <div class="chat ch1">
                                <div class="icon"><i class="fa-solid fa-user"></i></div>
                                <div class="textbox">${a.data().content}</div>
                            </div>`;
                    }
                $('.chat-content').append(message)
                    })
                    var chatContent = $('.chat-content');
                    chatContent.scrollTop(chatContent.prop("scrollHeight"));
                })
            });
        });


