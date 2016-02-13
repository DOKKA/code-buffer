angular.module('codeBufferApp').directive('resize',function($window, myLayout){
  return function (scope, element, attr) {
    var w = angular.element($window);
    var changeHeight = function() {element.css('height', (w.height() -35) + 'px' );};
    var changeWidth = function() {element.css('width', (w.width()) + 'px' );};

    w.bind('resize', function () {
      changeHeight();   // when window size gets changed
      changeWidth();
      setTimeout(function(){
        myLayout.updateSize();
      },10);
    });
    changeHeight(); // when page loads
    changeWidth();
    setTimeout(function(){
      myLayout.updateSize();
    },10);
  }
});
