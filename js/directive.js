(function(){
  var testDirective = angular.module("testDirective",[]);

  testDirective.directive("noTouchMove",function(){
  	return {
  		restrict : "A",
  		link : function(scope, element, attrs){
  			element[0].addEventListener("touchmove",function(e){
  				e.preventDefault();
  				return false;
  			},false);
  		}
  	}
  });
})()