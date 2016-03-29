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

  testController.controller("syCtrl",function($scope){
    $scope.message = "我是首页";
  });

  testController.controller("histCtrl",function($scope){
    $scope.message = "我是历史页面";
  });
})();