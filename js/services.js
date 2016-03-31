(function(){
  var testservices = angular.module("testservices",[]);

  testservices.factory("jQGlobalData",function(){
    return {
      setData : function(key,data){
        if(!$.setData)$.setData = new Object();
        $.setData[key] = data;
        return $.setData;
      },
      getData : function(key){
        if(!$.setData)$.setData = new Object();
        return $.setData[key];
      },
      removeData : function(key){
        if(!$.setData)$.setData = new Object();
        if(this.hasData(key)){
          delete $.setData[key];
          return true;
        }else{
          return false;
        }
        return true;
      },
      hasData : function(key){
        if(!$.setData)$.setData = new Object();
        if(angular.isUndefined($.setData[key]))return false;
        return true;
      }
    }
  });

  testservices.factory("elemetnWHVal",function(){
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var headerHeight = angular.element("header").outerHeight();
    return {
      sectionHeight : function(){
        return clientHeight-headerHeight;
      }
    }
  });
})();