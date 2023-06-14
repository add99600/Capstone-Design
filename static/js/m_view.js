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