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

  chouchouServices.factory("userData",function($http){
    return {
      registerUser : function(user,pwd,email,succFun){
        $http({
          url : 'http://101.200.200.177:3000/users/register',
          method : "post",
          data : "userName="+user+"&pwd="+pwd+"&email="+email,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          responseType : 'json'
        }).success(function(data){
          succFun(data);
        });
      },
      loginUser : function(user,pwd,succFun){
        $http({
          url : 'http://101.200.200.177:3000/users/login',
          method : "post",
          data : "userName="+user+"&pwd="+pwd,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          responseType : 'json'
        }).success(function(data){
          succFun(data);
        });
      },
      checkRegister : function(user,pwd,respwd,email){
        if(!user){
          alert("必须输入用户名");
          return false;
        }
        var userReg = /^[a-zA-Z0-9]{5,15}[a-zA-Z0-9]$/g;
        if(user.length<6 || user.length >16 || !userReg.test(user)){
          alert("用户名必须为6-16位字符或数字");
          return false;
        }
        var userReg = /^\w*\@+\w+\.+\w+$/g;
        if(!userReg.test(email)){
          alert("请输入正确的邮箱地址");
          return false;
        }
        if(!pwd){
          alert("必须输入密码");
          return false;
        }
        var pwdReg = /^[a-zA-Z0-9]{5,15}[a-zA-Z0-9]$/g;
        if(pwd.length<6 || pwd.length >16 || !pwdReg.test(pwd)){
          alert("密码必须为6-16位字符或数字");
          return false;
        }
        if(!respwd){
          alert("必须重复输入密码");
          return false;
        }
        if(pwd!==respwd){
          alert("两次密码输入不一样");
          return false;
        }
        return true;
      }
    }

  })
})();