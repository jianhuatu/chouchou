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
      {id:"baba",name:"臭臭",img:"img/icons-128/baba.png"},
      {id:"home",name:"宅着",img:"img/icons-128/home.png"},
      {id:"love",name:"爱爱",img:"img/icons-128/love.png"},
      {id:"movie",name:"看电影",img:"img/icons-128/movie.png"},
      {id:"shopping",name:"购物",img:"img/icons-128/shopping.png"},
      {id:"sport",name:"运动",img:"img/icons-128/sport.png"},
      {id:"travel",name:"旅游",img:"img/icons-128/travel.png"},
      {id:"travel",name:"吃饭",img:"img/icons-128/eat.png"},
    ];

    $scope.addEvent = function(id,i){
      console.log($scope.list[i]['name']);
    }
  });

  testController.controller("histCtrl",function($scope){
    $scope.message = "我是历史页面";
  });
})();