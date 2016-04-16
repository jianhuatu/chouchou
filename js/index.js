(function(){
  var chouchouApp = angular.module("chouchouApp",[
      'ngRoute',
      'ng-iscroll',
      'chouchouController',
      'chouchouDirective',
      'chouchouServices'
    ]);

  chouchouApp.config(function($routeProvider,$locationProvider,$httpProvider){
      $routeProvider.
      when("/",{
        templateUrl : "tpl/sy.html",
        controller : "syCtrl"
      }).when("/userData",{
        templateUrl : "tpl/user.html",
        controller : "userCtrl"
      }).when("/login",{
        templateUrl : "tpl/login.html",
        controller : "loginCtrl"
      }).when("/register",{
        templateUrl : "tpl/register.html",
        controller : "registerCtrl"
      });
      $httpProvider.interceptors.push('authInterceptor');
      $locationProvider.html5Mode(false).hashPrefix("!");
  });
})();