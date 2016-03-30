(function(){
  var testApp = angular.module("testApp",[
      'ngRoute',
      'ngAnimate',
      'testController',
      'testDirective',
      'testservices'
    ]);

  testApp.config(function($routeProvider,$locationProvider){
      $routeProvider.
      when("/",{
        templateUrl : "tpl/sy.html",
        controller : "syCtrl"
      }).when("/history",{
        templateUrl : "tpl/history.html",
        controller : "histCtrl"
      });
      $locationProvider.html5Mode(false).hashPrefix("!");
  });
})();