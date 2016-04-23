(function(){
  var chouchouDirective = angular.module("chouchouDirective",[]);

  chouchouDirective.directive("noTouchMove",function(){
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

  chouchouDirective.directive("ngTap",function(){
    return {
      restrict : "A",
      controller : function($scope, $element){
        $($element[0]).tap(function(event){
          var method = $element.attr("ng-tap");
          $scope.$event = event;
          $scope.obj = $element;
          $scope.$apply(method);
          event.preventDefault();
          return false;
        });
      }
    }
  });

  chouchouDirective.directive("transDom",function(){
    return {
      restrict : "A",
      controller : function($scope, $element){
        $scope.$watch("",function(){
          setTimeout(function(){
            var thisClass=$element.attr("class-trans-name");
            $element.addClass(thisClass);
          }, 100);
        });
      }
    }
  });
})()