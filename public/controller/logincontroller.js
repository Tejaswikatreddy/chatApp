chatApp.controller('loginController', function ($scope, $http,$location) {
 
    if(localStorage.getItem("token")!=null){
        $location.path("/dashboard")
    }

    else{
    console.log('login');
    $scope.user = {
        'email_id': '',
        'password': ''
    }
    console.log($scope.user);
      
    $scope.login = function () {
        console.log("login credential process", $scope.user);
        $http({
            method: 'POST',
            url: '/login',
            data: $scope.user
        }).then(function (response) {
            console.log(response);
            console.log(response.data.error);
                                       
            if (response.data.error == false) {
                console.log("successfull login");
                $scope.message = "login Successful";
                var token=response.data.token;
                localStorage.setItem("token",token);
                var id=response.data.userid;
                localStorage.setItem("id",id)
                var username = response.data.username
                localStorage.setItem("username",username)
                $location.path("/dashboard");
            }
            else if (response.data.status == 400) {
                $scope.message = "login Unsuccessful";
            }
       
       
        })
    
    }
    }

});
