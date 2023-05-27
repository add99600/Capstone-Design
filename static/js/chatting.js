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
    const storage = firebase.storage();
    var my_uid = JSON.parse(localStorage.getItem('user')).uid;
    var chatroom_id
    var bring = new URLSearchParams(window.location.search);

    db.collection('chat').where('who', 'array-contains', bring.get('id')).get().then((result) => {
        result.forEach((doc) => {
        console.log(doc.data());
        var chatroom = `
                        <div class="chatting-room" data-chat-id="${doc.id}">
                           <img src="${doc.data().img}">
                            <div class="details">
                              <a href="#" class="name">${doc.data().product}</a>
                              <div class="message">${doc.data().name}</div>
                           </div>
                        </div>`;
        $('.chatting-list').append(chatroom);
      });

      $('.chatting-room').click(function (e) {
          chatroom_id = $(this).data('chat-id');

          e.stopImmediatePropagation();
          $('.chat-content').html('');

          console.log('Chatroom ID:', chatroom_id);

          db.collection('chat').doc(chatroom_id).collection('message').get().then((result)=>{
              result.forEach((a)=>{
                  console.log(a.data())
                  var message = `   <div class="chat ch2">
                                        <div class="icon"><i class="fa-solid fa-user"></i></div>
                                        <div class="textbox">${a.data().content}</div>
                                    </div>`;
                          $('.chat-content').append(message)
                    })
                })
            });
        });

    $('#send').click(function () {
      if (chatroom_id) {
        var chat_data = {
          content: $('#chat-input').val(),
          data: new Date(),
          uid: my_uid,
        };
        db.collection('chat').doc(chatroom_id).collection('message').add(chat_data);
      }
    });


