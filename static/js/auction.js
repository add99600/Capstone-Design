firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

var my_uid = JSON.parse(localStorage.getItem('user')).uid;
db.collection('user').doc(my_uid).get().then((result) => {
    console.log(result.data().nickname);
    $('#username').html(result.data().nickname)
    });

db.collection('auction').get().then((결과) => {
    결과.forEach((doc) => {
        console.log(doc.data());

        var list = `
                    <div class="product" style="padding: 10px;">
                        <div class="card shadow-sm" style="color:white; background-color: #4e555b; width: 300px;"><!--그레이 테마-->
                            <h3 id="clock" style="color:white; text-align: center; font-size: 16px; padding: 10px">${doc.data().od} ${doc.data().ot} 까지</h3> <!--현재 시계로 테스트 -->
                            <img width="100%" height="160px" src="${doc.data().이미지}"></svg>
                            <div class="card-body">
                                <h3 class="item_name" style="height: 50px; font-weight: bold; text-align: center">${doc.data().제목}</h3>
                                <div class="item_container" style="color:white; background-color: #4e555b">
                                    <p>바로 구매가: <span class="item_fast_cost">${doc.data().즉구}</span>원</p>
                                    <p>입찰가: <span class="item_cost">${doc.data().현재가}</span>원</p>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                 <div class="btn-group" style="padding: 5px; width: 100%; height: 50px">
                                    <button type="button" class="btn btn-primary pr" style="width: 50%; height: auto; font-size: 1.4rem">바로 구매</button>
                                    <button type="button" class="btn btn-warning buy" style="width: 50%; height: auto; font-size: 1.4rem" onclick="location.href='buy.html?id=${doc.id}'">입찰 하기</button>
                                </div>
                            </div>
                        </div>
                    </div>`;
        $('.ac_b').append(list);
    });
});