(function(){
  var testDirective = angular.module("testDirective",[]);

  testDirective.directive("domIscroll",function(jQGlobalData,mainHeight){
  	return {
  		restrict : "A",
  		link : function(scope, element, attrs){
  			element.css({
  				height : mainHeight.val()+"px",
  				overflow : "hidden"
  			});
  			if(jQGlobalData.hasData("myScroll")){
  				jQGlobalData.getData("myScroll").destroy();
  				jQGlobalData.removeData("myScroll");
  			}
  			jQGlobalData.setData("myScroll",new IScroll(element[0]));
  		}
  	}
  });
})()