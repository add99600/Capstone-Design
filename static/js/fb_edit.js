    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();
    const storage = firebase.storage();

    var bring_id = new URLSearchParams(window.location.search);

    db.collection('product').doc(bring_id.get('id')).get().then((result) => {
        console.log(result.data());
        $('#title').val(result.data().제목);
        $('#content').val(result.data().내용);
    });
