    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();
    const storage = firebase.storage();

    var bring_id = new URLSearchParams(window.location.search);

    db.collection('post').doc(bring_id.get('id')).get().then((result) => {
        console.log(result.data())
        $('#title').val(result.data().title)
        $('#price').val(result.data().가격)
        $('#content').val(result.data().내용)
    });


