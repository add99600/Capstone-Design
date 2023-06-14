    firebase.initializeApp(firebaseConfig);


    const db = firebase.firestore();
    const storage = firebase.storage();
    var count

    var my_name = JSON.parse(localStorage.getItem('user')).displayName;
    var user_name;

    db.collection('user').where('name', '==', my_name).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        user_name = doc.data().name;
        console.log(user_name);
      });
    }).catch((error) => {
      console.log('Error getting documents: ', error);
    });

    //firestore 데이터 개수
    db.collection("product").get().then((querySnapshot) => {
      count = querySnapshot.size;
      console.log("컬렉션 'product'의 데이터 개수: " + count);
    }).catch((error) => {
      console.log("데이터 개수를 가져오는 동안 에러 발생: ", error);
    });


