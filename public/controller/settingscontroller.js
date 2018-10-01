chatApp.controller('settingscontroller', function ($scope, $http, $location) {
    
    
    
    $scope.change=function(){
        $location("/change")
     }
     $scope.back=function(){
         $location.path('/dashboard');
     }








})