(function(){
  var chouchouApp = angular.module("chouchouApp",[
      'ngRoute',
      'ng-iscroll',
      'chouchouController',
      'chouchouDirective',
      'chouchouservices'
    ]);

  chouchouApp.config(function($routeProvider,$locationProvider){
      $routeProvider.
      when("/",{
        templateUrl : "tpl/sy.html",
        controller : "syCtrl"
      }).when("/userData",{
        templateUrl : "tpl/register.html",
        controller : "registerCtrl"
      }).when("/login",{
        templateUrl : "tpl/login.html",
        controller : "loginCtrl"
      }).when("/register",{
        templateUrl : "tpl/register.html",
        controller : "registerCtrl"
      });
      $locationProvider.html5Mode(false).hashPrefix("!");
  });
})();