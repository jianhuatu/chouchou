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

  testDirective.directive("ngTap",function(){
    return {
      restrict : "A",
      controller : function($scope, $element){
        $($element[0]).tap(function(event){
          var method = $element.attr("ng-tap");
          $scope.$event = event;
          $scope.$apply(method);
        });
      }
    }
  });
})()