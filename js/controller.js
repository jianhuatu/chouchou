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
    $scope.list = [
      {id:"baba",name:"臭臭",img:"img/baba.png"},
      {id:"home",name:"宅着",img:"img/home.png"},
      {id:"love",name:"爱爱",img:"img/love.png"},
      {id:"movie",name:"看电影",img:"img/movie.png"},
      {id:"shopping",name:"购物",img:"img/shopping.png"},
      {id:"sport",name:"运动",img:"img/sport.png"},
      {id:"travel",name:"旅游",img:"img/travel.png"},
    ];

    $scope.addEvent = function(id,i){
      alert($scope.list[i]['name']);
    }
  });

  testController.controller("histCtrl",function($scope){
    $scope.message = "我是历史页面";
  });
})();