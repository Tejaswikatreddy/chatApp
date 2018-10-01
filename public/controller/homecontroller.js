chatApp.controller('homecontroller', function ($scope, $http, $location, SocketService) {
var mytoken = localStorage.getItem("token");
//getting the token from the local storage
var id=localStorage.getItem("id");
//getting the id from the local storage
var username=localStorage.getItem("username");
//getting the userename from the local storage
$scope.loginuser=username;
console.log("id is"+id)
   var arr=[];
   var msgArr=[],nameArr=[],twoArray=[];
   
$http({
    method: 'GET',
    url: 'auth/users/'+id+'/list',
    headers:{
        'token': mytoken
    }
}).then(function (response) {
    // console.log(response.data.message)
    for(var i=0;i<(response.data.message).length;i++){
        arr.push(response.data.message[i].username)
    }
    // console.log(arr);
})
    $scope.arr = arr;


    $scope.sendMessage = function () {
        if($scope.message.length!=0)
        SocketService.emit('tobackend', { "userid": id, "message": $scope.message, "date": new Date(),"username":username })
         $scope.message=" ";

    }


    $http({
        method: 'GET',
        url: '/auth/users/'+id+'/msgs',
        headers: {
            'token': mytoken
        }
    }).then(function (response) {
        for(var i=0;i<(response.data.message).length;i++)
        msgArr.push(response.data.message[i]);
        // nameArr.push(response.data.message[i].username);
    })
    $scope.msgArr=msgArr;
    
    $scope.logout=function () {
        localStorage.removeItem("token");
        localStorage.removeItem(id);
        $location.path('/login')

    }

  
    SocketService.on('tofrontend',function(msg){
        $scope.msgArr.push(msg)
    })

})
    
