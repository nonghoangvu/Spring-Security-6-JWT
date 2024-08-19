app.factory('authInterceptor', function($q) {
    return {
        request: function(config) {
            var token = localStorage.getItem('access_token');
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        },
        responseError: function(response) {
            if (response.status === 401) {
                // Xử lý lỗi không được phép truy cập
            }
            return $q.reject(response);
        }
    };
});

app.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});