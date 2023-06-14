Kakao.init("5b3c159344fe882ade9bb36e17918583");

    function kakaoLogin() {
        window.Kakao.Auth.login({
            success: function (authObj) {
                window.Kakao.API.request({
                    url: '/v2/user/me',
                    success: function (response) {
                        var email = response.kakao_account.email;
                        var nickname = response.properties.nickname;
                        var profileImageUrl = response.properties.profile_image;
                        console.log(nickname, email);

                        document.getElementById('username').value = nickname;
                        document.getElementById('signUpemail').value = email;
                    }
                });
            }
        });
    }