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

    db.collection('chat').where('who','array-contains',my_uid).get().then((result)=>{
        result.forEach((doc)=>{
            console.log(doc.data());
            var chatroom =`<li class="list-group-item">
                               <h6>${doc.data().product}</h6>
                               <h6 class="text-small">${doc.data().name}</h6>
                           </li>`
            $('.chat-list').append(chatroom)

            $('.list-group-item').click(function (){
                chatroom_id = $(this).children('.small-text').text() // 현재 클릭한 텍스트

                e.stopImmediatePropagation(); // 이벤트 버블링 막아줌
                $('.chat-content').html('');

                db.collection('chat').doc(chatroom_id).collection('message').get().then((result)=>{
                    result.forEach((a)=>{
                        console.log(a.data())
                        var temp = `<li><span class="chat-box">${a.data().content}</span></li>`;
                        $('.chat-content').append(temp);
                    })
                    }
                )

            })
            })
        })



    $('#send').click(function (){
        var chat_data = {
            content: $('#chat-input').val(),
            data: new Date(),
            uid: my_uid,
        }
    db.collection('chat').doc(chatroom_id).collection('message').add(chat_data)
    })

