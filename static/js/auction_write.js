firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();
    const storage = firebase.storage();

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
