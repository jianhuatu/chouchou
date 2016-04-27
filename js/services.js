(function(){
  var chouchouServices = angular.module("chouchouServices",[]);

  chouchouServices.factory("elemetnWHVal",function(){
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    // var headerHeight = $("header").height();
    return {
      sectionHeight : function(){
        return clientHeight-64;
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

  chouchouServices.factory("userData",function($http,encryption){
    return {
      registerUser : function(user,pwd,email,succFun){
        $http({
          url : 'http://101.200.200.177:3000/users/register',
          method : "post",
          data : "userName="+user+"&pwd="+encryption.md5(pwd)+"&email="+email,
          responseType : 'json'
        }).success(function(data){
          succFun(data);
        });
      },
      loginUser : function(user,pwd,succFun){
        $http({
          url : 'http://101.200.200.177:3000/users/login',
          method : "post",
          data : "userName="+user+"&pwd="+encryption.md5(pwd),
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

  chouchouServices.factory("getLists",function($http){
    return function(scope){
      $http({
        url : 'http://101.200.200.177:3000/lists',
        method : "post",
        responseType : 'json'
      }).success(function(data){
        if(data.code!=="0000"){
          if(!data.noMsg)alert(data.msg);
          return false;
        }
        scope.show = true;
        scope.list = data.info;
      });
    }
  });

  chouchouServices.factory("getToDay",function($http,getUserEventPostion){
    return function(scope){
      $http({
        url : 'http://101.200.200.177:3000/lists/today',
        method : "post",
        responseType : 'json'
      }).success(function(data){
        if(data.code!=="0000"){
          alert(data.msg);
          return false;
        }
        var newData = getUserEventPostion(data.info);
        scope.todayEvent = newData;
      });
    }
  });

  chouchouServices.factory("getUserEventPostion",function(){
    return function(data){
      for(var i=0,ilen=data.length;i<ilen;i++){
        var thisStageTime = data[i]['stageTime'];
        var dataObj = new Date(thisStageTime);
        var hours = dataObj.getHours();
        var minutes = dataObj.getMinutes();

        data[i].left = Number(hours)*31+(31-22)/2+"px";
        data[i].top = Number(minutes)/10*31+(31-22)/2+"px";
      }

      return data;
    }
  });

  chouchouServices.factory("getToDayX",function(){
    return function(){
      var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
      var newDateObj = new Date();
      var hours = newDateObj.getHours();
      var left = Number(hours)*31+(31-22)/2-clientWidth/2;
      return -1*left;
    }
  });

  chouchouServices.factory("setEvent",function($http){
    return function(reqData,succFun){
      var postData = [];
      angular.forEach(reqData,function(data,key){
        if(key=="position"){
          angular.forEach(reqData[key],function(poD,poK){
            poK=poK.replace(" ","");
            postData.push("position"+poK+"="+poD);
          })
          return false;
        }
        postData.push(key+"="+data);
      });

      $http({
        url : 'http://101.200.200.177:3000/addevent',
        method : "post",
        data : postData.join("&"),
        responseType : 'json'
      }).success(function(data){
        succFun(data);
      });
    }
  })

  chouchouServices.factory("addEvent",function($http,getCurrentPosition,addEventShow,setEvent){
   return function(id,succFun,scope){
    var userData = {
      eventId : id,
      positionCode : "timeOut",
      positionMsg : "超时",
      position : {
        'Longitude' : "", 
        'Altitude' : "",   
        'Accuracy' : "",          
        'Altitude Accuracy' : "", 
        'Heading' : "",      
        'Speed' : "",             
        'Timestamp' : ""   
      }
    }

    var checkHttp = false;
    getCurrentPosition(function(data){
      if(checkHttp==="setTime")return false;
      checkHttp = true;
      userData.positionCode = data.code;
      userData.positionMsg = data.msg;
      userData.position = data.info;
      addEventShow(userData,scope);
      setEvent(userData,succFun);
    });

    setTimeout(function(){
      if(checkHttp===true)return false;
      addEventShow(userData,scope);
      setEvent(userData,succFun);
      checkHttp = "setTime";
    },2000);
   }
  });

  chouchouServices.factory("addEventShow",function(getUserEventPostion,getStageTime){
    return function(reqData,scope){
      var eventData = {};
      angular.forEach(reqData,function(data,key){
        if(key=="position"){
          angular.forEach(reqData[key],function(poD,poK){
            poK=poK.replace(" ","");
            eventData["position"+poK] = poD;
          })
          return false;
        }
        eventData[key] = data;
      });

      eventData.time = new Date().getTime();
      eventData.stageTime = getStageTime();
      eventData.noClass = " no";

      var oldData = scope.todayEvent;
      var newData = getUserEventPostion([eventData]);

      angular.forEach(oldData,function(data,i){
        if(data['stageTime'] == eventData.stageTime){
          oldData[i] = newData[0];
          newData = [];
        }
      });

      scope.todayEvent = oldData.concat(newData);
    }
  });

  chouchouServices.factory("getStageTime",function(){
    return function(){
      var dateObj = new Date();
      var minutes = dateObj.getMinutes();
      var minutesG = minutes%10;
      if(minutesG>6){
        var newMinutes = minutes-minutesG+10;
      }else{
        var newMinutes = minutes-minutesG;
      }
      return new Date(dateObj.getUTCFullYear(),dateObj.getMonth(),dateObj.getDate(),dateObj.getHours(),newMinutes,0,0,0).getTime();
    }
  });

  chouchouServices.factory("encryption",function(){
    return {
      md5 : function(str){
        return hex_md5(str);
      }
    } 
  });

  chouchouServices.factory('authInterceptor', function ($rootScope, $q, $window,$location) {

    return {
      request: function (config) {
        if(config.url.indexOf("101.200.200.177")<0)return config;
        config.headers = config.headers || {};
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        if ($window.localStorage.chouchou_token_Id) {
          config.headers.Authorization = "chouchou"+$window.localStorage.chouchou_token_Id;
        }
        return config;
      },
      response: function (response) {
        if (response.status === 401) {
          $location.path("/login");
        }
        if(response.data.code == "-1002" || response.data.code == "-1003" || response.data.code == "-1004" || response.data.code == "-1005"){
          response.data.noMsg = true;
          $location.path("/login");
          return response || $q.when(response);
        }else{
          return response || $q.when(response);
        }
      }
    };
  });

  chouchouServices.factory("getCurrentPosition",function(){
    return function(fun){
     navigator.geolocation.getCurrentPosition(function(position){
        fun({
          code : "0000",
          msg : "成功",
          info : position['coords']
        });
     },function(error){
        fun({
          code : error.code,
          msg : error.message,
          info : {
            'Longitude' : "", 
            'Altitude' : "",   
            'Accuracy' : "",          
            'Altitude Accuracy' : "", 
            'Heading' : "",      
            'Speed' : "",             
            'Timestamp' : ""       
          }
        })
     });
    }
    
  })
})();