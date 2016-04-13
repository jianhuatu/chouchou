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
        templateUrl : "tpl/userdata.html",
        controller : "userCtrl"
      }).when("/login",{
        templateUrl : "tpl/login.html",
        controller : "loginCtrl"
      }).when("/register",{
        templateUrl : "tpl/register.html",
        controller : "loginCtrl"
      });
      $locationProvider.html5Mode(false).hashPrefix("!");
  });
})();