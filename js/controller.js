(function(){
  var testController = angular.module("testController",[]);

  testController.controller("headerCtrl",function($scope,$location){
    $scope.title = "臭臭";
    $scope.tool = "历史";
    $scope.goHistory = function(){
      if($location.path()=="/history"){
        $scope.tool = "历史";
        $location.path("/");
      }else{
        $scope.tool = "首页";
        $location.path("/history");
      }
    }
  })

  testController.controller("syCtrl",function($scope,$http){
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

  testController.controller("histCtrl",function($scope){
    $scope.message = "我是历史页面";
  });
})();