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

  chouchouController.controller("syCtrl",function($scope,$window,$location,$timeout,getToDay,getLists,addEvent,getToDayX,getUserEventPostion){
    var toKenId = $window.localStorage.getItem("chouchou_token_Id");
    if(!toKenId){
      $location.path("/login");
      return false;
    }
    $scope.ck=1;
    $scope.$parent.section  = {
      hScrollbar: false,
      vScrollbar: false,
      vScroll: true,
    }
    $scope.$parent.eventList  = {
      hScrollbar: false,
      vScrollbar: false,
      vScroll: false,
      x : getToDayX()
    }
    getToDay($scope);
    getLists($scope);

    $scope.addEvent = function(id){
      var thisObj = this.obj;
      var thisCk = thisObj.attr("data-ck");
      if(thisCk!=="1")return false;
      thisObj.attr("data-ck","0");
      addEvent(id,function(msg){
        thisObj.attr("data-ck","1");
        if(msg.code!=="0000"){
          alert(msg.msg);
          return false;
        }

        var oldData = $scope.todayEvent;
        var newData = getUserEventPostion([msg.info]);
        angular.forEach(oldData,function(data,i){
          if(data['stageTime'] == newData[0].stageTime){
            newData[0]["noClass"] = " no";
            $scope.todayEvent[i] = newData[0];
            $timeout(function(){
              $scope.todayEvent[i]["noClass"] = "";
            },400);
          }
        });
      },$scope);
    };
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