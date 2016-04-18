(function(){
  var chouchouController = angular.module("chouchouController",[]);

  chouchouController.controller("headerCtrl",function($scope,$location,titleStatus,headerStatus,titleData){
    $scope.titleVal = titleData.getTitleVal();
    $scope.userShow = titleStatus();
    $scope.headerShow = headerStatus();

    $scope.userData = function(){
      $location.path("/userData");
      $scope.userShow = titleStatus();
      $scope.headerShow = headerStatus();
    }

    $scope.goshouye = function(){
      $location.path("/");
      $scope.userShow = titleStatus();
      $scope.headerShow = headerStatus();
    }
  })

  chouchouController.controller("syCtrl",function($scope,$http,$window,$location,getCurrentPosition){
    var toKenId = $window.localStorage.getItem("chouchou_token_Id");
    if(!toKenId){
      $location.path("/login");
      return false;
    }
    $http({
      url : 'http://101.200.200.177:3000/lists',
      method : "post",
      responseType : 'json'
    }).success(function(data){
      if(data.code!=="0000"){
        alert(data.msg);
        return false;
      }
      $scope.dataShow = true;
      $scope.list = data.info;
    });

    $scope.addEvent = function(id,i){
      getCurrentPosition(function(pos){
        alert(pos.lat+"_"+pos.lng);
      });
      return false;
      $http({
        url : 'http://101.200.200.177:3000/addevent',
        method : "post",
        data : 'id='+id,
        responseType : 'json'
      }).success(function(data){
        alert(data.name);
      });
    }
  });

  chouchouController.controller("loginCtrl",function($scope,$location,$window,userData){
    $scope.submitLogin = function(){
      var userName = $scope.userName;
      var password = $scope.password;

      userData.loginUser(userName,password,function(data){
        if(data.code==="0000"){
          $window.localStorage.setItem("chouchou_token_Id",data.info.tokenId);
          $location.path("/");
        }else{
          alert(data.msg);
          return false;
        }
      });
    }

    $scope.goRegister = function(){
      $location.path("/register");
    }
  });

  chouchouController.controller("registerCtrl",function($scope,$location,$window,userData){
    $scope.submitRegister = function(){
      var userName = $scope.userName;
      var password = $scope.password;
      var respassword = $scope.respassword;
      var email = $scope.email;

      if(!userData.checkRegister(userName,password,respassword,email))return false;

      userData.registerUser(userName,password,email,function(data){
        if(data.code==="0000"){
          $window.localStorage.setItem("chouchou_token_Id",data.info.tokenId);
          $location.path("/");
        }else{
          alert(data.msg);
          return false;
        }
      });
    }

    $scope.goLogin = function(){
      $location.path("/login");
    }
  });

  chouchouController.controller("userCtrl",function($scope,$location,$window){
    $scope.message = "我是用户页面";

    $scope.clearUserData = function(){ 
      $window.localStorage.removeItem("chouchou_token_Id");
      $location.path("/login");
    }
  });
})();