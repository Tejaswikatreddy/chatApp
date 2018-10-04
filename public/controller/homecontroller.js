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
        arr.push(response.data.message[i])
    }
    // console.log(arr);
})
    $scope.arr = arr;


    $scope.sendMessage = function () {
        
        if($scope.message!=null)
         
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
        console.log(response.data)
        for(var i=0;i<(response.data.message).length;i++)
        msgArr.push(response.data.message[i]);
    })
    $scope.msgArr=msgArr;
    console.log(msgArr)
    
    $scope.logout=function () {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        $location.path('/login')

    }
    $scope.navigate=function(peerid,user){
        // console.log(user)
        localStorage.setItem("peerUser",user)
        localStorage.setItem("peerId", peerid)
        $location.path('/ptop');
        
    }

  
    SocketService.on('tofrontend',function(msg){
        $scope.msgArr.push(msg)
    })

})
    
