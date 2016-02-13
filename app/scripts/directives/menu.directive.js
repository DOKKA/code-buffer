angular.module('codeBufferApp').directive('menu',function(myLayout, $rootScope){

  var controller = function($scope){

    $scope.mode = 'javascript';

    $scope.size = '14px';

    $scope.theme = 'ace/theme/monokai';

    $scope.addContainer = function(){
      var componentState = {
        mode: $scope.mode,
        size: $scope.size,
        theme: $scope.theme,
        name: $scope.name
      };

      if(myLayout.root.contentItems && myLayout.root.contentItems.length > 0){
        var container = myLayout.root.contentItems[0].addChild({
          type: 'component',
          componentName: 'example',
          componentState: componentState
        });
      } else {
        var container = myLayout.root.addChild({
          type: 'component',
          componentName: 'example',
          componentState: componentState
        });
      }

    }
  };

  return {
    restrict: 'AE',
    templateUrl: 'templates/menu.directive.html',
    controller: controller
  };
});
