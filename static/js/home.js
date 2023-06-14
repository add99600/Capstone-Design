    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore(); // db문법 소환
    const storage = firebase.storage();

    var my_uid = JSON.parse(localStorage.getItem('user')).uid;



    //직거래 이미지 리스트
    db.collection('post').where("이미지", "!=", null)
        .limit(10).get().then((결과) => {
        결과.forEach((doc) => {
            console.log(doc.data().이미지);

            var list = `<li class=""><a href="#"><img style="width: 250px; height: 250px; border-radius: 30px;" src="${doc.data().이미지}"></a></li>`;
            $('.tab ul').append(list);
        });
    });

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user.uid);
            console.log(user.email);
            localStorage.setItem('user', JSON.stringify(user))
        }
    });
    var getout =localStorage.getItem('user')
    // $('#username').html(JSON.parse(getout).email)

    db.collection('user').doc(my_uid).get().then((result) => {
        console.log(result.data().nickname);
        $('#username').html(result.data().nickname)
    });


    db.collection('product').orderBy('num','desc').limit(1).get().then((result) => {
        console.log(result.docs[0].data().제목);
        $('#title').html(result.docs[0].data().제목);
    });

    db.collection('product').orderBy('num','desc').limit(2).get().then((result) => {
        $('#title2').html(result.docs[1].data().제목);
    });

    db.collection('product').orderBy('num','desc').limit(3).get().then((result) => {
        $('#title3').html(result.docs[2].data().제목);
    });


    let mostFrequentWord, maxCount;

    db.collection('search').get().then((result) => {
        var wordCount = {};

        result.forEach((doc) => {

        var data = doc.data();
        var searchField = data.search;

        if (searchField && typeof searchField === 'string') {
            var words = searchField.split(' ');

            words.forEach((word) => {
            if (wordCount[word]) {
                wordCount[word]++;
            } else {
                wordCount[word] = 1;
            }
            });
        }
        });

      maxCount = 0;

      for (var word in wordCount) {
          if (wordCount[word] > maxCount) {
          mostFrequentWord = word;
          maxCount = wordCount[word];
          }
      }
      $('#best_search').html('#현재 인기 검색어 : ' + mostFrequentWord + ' '  + '[검색횟수 : ' + maxCount +']');

      console.log('가장 많이 등장한 단어:', mostFrequentWord);
      console.log('등장 횟수:', maxCount);
    });




