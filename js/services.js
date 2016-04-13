(function(){
  var chouchouServices = angular.module("chouchouservices",[]);

  chouchouServices.factory("elemetnWHVal",function(){
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var headerHeight = $("header").height();
    return {
      sectionHeight : function(){
        return clientHeight-headerHeight;
      }
    }
  });

  chouchouServices.factory("titleStatus",function($location){
    return function(){
      return $location.path()=="/userData" ? true : false;
    }
  });

  chouchouServices.factory("headerStatus",function($location){
    var arr = [
      "/userData",
      "/",
      ""
    ];
    return function(){
      return $.inArray($location.path(),arr)>-1 ? true : false;
    }
  });

  chouchouServices.factory("titleData",function($location){
    return {
      getTitleVal : function(){
        var thisUrl = $location.path();
        switch(thisUrl){
          case "/login" : return "登录";break;
          case "/register" : return "注册";break;
          default : return "臭臭";break;
        }
      }
    }
  })
})();