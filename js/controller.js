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

  chouchouController.controller("syCtrl",function($scope,$http){
    $http({
      url : 'http://101.200.200.177:3000/lists',
      method : "post",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      responseType : 'json'
    }).success(function(data){
      $scope.list = data;
    });

    $scope.addEvent = function(id,i){
      $http({
        url : 'http://101.200.200.177:3000/addevent',
        method : "post",
        data : 'id='+id,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        responseType : 'json'
      }).success(function(data){
        alert(data.name);
      });
    }
  });

  chouchouController.controller("loginCtrl",function($scope,$location,userData){
    $scope.submitLogin = function(){
      var userName = $scope.userName;
      var password = $scope.password;

      userData.loginUser(userName,password,function(data){
        alert(data.msg);
        if(data.code==="0000"){
          $location.path("/");
        }else{
          return false;
        }
      });
    }

    $scope.goRegister = function(){
      $location.path("/register");
    }
  });

  chouchouController.controller("registerCtrl",function($scope,$location,userData){
    $scope.submitRegister = function(){
      var userName = $scope.userName;
      var password = $scope.password;
      var respassword = $scope.respassword;
      var email = $scope.email;

      if(!userData.checkRegister(userName,password,respassword,email))return false;

      userData.registerUser(userName,password,email,function(data){
        alert(data.msg);
        if(data.code==="0000"){
          $location.path("/");
        }else{
          return false;
        }
      });
    }

    $scope.goLogin = function(){
      $location.path("/login");
    }
  });

  chouchouController.controller("userCtrl",function($scope){
    $scope.message = "我是用户页面";
  });
})();