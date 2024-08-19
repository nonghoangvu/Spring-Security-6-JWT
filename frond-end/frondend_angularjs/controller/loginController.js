// loginController.js
app.controller('loginCtrl', function($scope, $http, $location) {
    $scope.login = function() {
        $http.post('http://localhost:8080/auth/access', {
            username: $scope.username,
            password: $scope.password,
            platform: 'WEB'
        }).then(function(response) {
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            localStorage.setItem('user_id', response.data.user_id);
            $location.path('/home');
        }).catch(function(error) {
            console.error('Login failed:', error);
        });
    };

    $scope.logout = function() {
        var token = localStorage.getItem('access_token');
        $http.post('http://localhost:8080/auth/logout', {}, {
            headers: {
                'Authorization': token
            }
        }).then(function(response) {
            // Xóa token và dữ liệu người dùng
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user_id');
            // Chuyển hướng về trang đăng nhập
            $location.path('/login');
        }).catch(function(error) {
            console.log(token);
            
            console.error('Logout failed:', error);
        });
    };
});
