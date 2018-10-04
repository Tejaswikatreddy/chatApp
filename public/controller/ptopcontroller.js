chatApp.controller('ptopcontroller', function ($scope, $http, $location, SocketService) {
    var mytoken = localStorage.getItem("token");
    //getting the token from the local storage
    var id = localStorage.getItem("id");
    //getting the id from the local storage
    var username = localStorage.getItem("username");
    //getting the userename from the local storage
    var peerUser=localStorage.getItem("peerUser");
    $scope.peerUser=peerUser;
    var peerId = localStorage.getItem("peerId");
    $scope.peerId = peerId;
    $scope.id=id;
    $scope.loginuser = username;
    console.log("id is" + id)
    
    var arr = [],msgArr=[];
    $http({
        method: 'GET',
        url: 'auth/users/' + id + '/list',
        headers: {
            'token': mytoken
        }
    }).then(function (response) {
        for (var i = 0; i < (response.data.message).length; i++) {
            arr.push(response.data.message[i])
        }
        // console.log(arr);
    })
    $scope.arr = arr;
    console.log(peerId),

    $http({
        method: 'GET',
        url: '/auth/users/' + id + '/personalmsgs/' + peerId,
        headers: {
            'token': mytoken
        }
    }).then(function (response) {
            $scope.msgArr=response.data.message;
    })


    $scope.logout = function () {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("peerUser");
        localStorage.removeItem("peerId");
        localStorage.removeItem("username");
        $location.path('/login')
    }

    $scope.navigate = function ( user,peerid) {
        // console.log(user)
        localStorage.setItem("peerUser", user)
        localStorage.setItem("peerId", peerid)
        $location.path('/ptop')
    }


    $scope.sendMessage = function () {
        if ($scope.message != null)
            SocketService.emit('topersonalbackend', { "senderid": id, "message": $scope.message, "date": new Date(), "sendername": username,"receiverid":peerId,"receivername":peerUser})
        $scope.msgArr.push({ "senderid": id, "message": $scope.message, "date": new Date(), "sendername": username, "receiverid": peerId, "receivername": peerUser})
        $scope.message = " ";
    }

    $scope.close=function () {
        localStorage.removeItem("peerUser");
        localStorage.removeItem("peerId");
        $location.path("/dashboard")
    }
    SocketService.on(id,function(msg){
        console.log(msg)
        if(id==msg.receiverid)
        {
            $scope.msgArr.push(msg)
        }
    })
})