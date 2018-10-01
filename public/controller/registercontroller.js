// var chatApp = angular.module('registrationController', [])
chatApp.controller('registrationController', function ($scope, $http,$location) {
    
    if(localStorage.getItem("token")!=null){
        $location.path("/dashboard");
    }
    else{
    console.log('register');
    $scope.user = {
        'firstname':'',
        'lastname':'',
        'mobilenumber':'',
        'username':'',
        'email_id': '',
        'password': ''
    }
    console.log($scope.user);
    $scope.register = function () {
        console.log("registration process", $scope.user);
        $http({
            method: 'POST',
            url: '/register',
            data: $scope.user
        }).then(function (response) {
            console.log(response);
            console.log(response.data.error);

            if (response.data.error == false) {
                console.log("successfull");
                $scope.message = "register Successful";
                $location.path("/");
            }
            else if (response.status == 400) {
                $scope.message = "register Unsuccessful"
            }
            
        })
    }
    $scope.check = function () {
        if ($scope.user.password != undefined && $scope.confirmpassword != undefined) {
            if ($scope.user.password != $scope.confirmpassword) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    }
})
