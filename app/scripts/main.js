(function(){

  var config = {
    content: [{
      type: 'row'
    }]
  };

  var myLayout = new GoldenLayout( config ,$('#main'));

  myLayout.on('initialised', function () {
    angular.bootstrap(document.body, ['codeBufferApp']);
  });

  angular.module('codeBufferApp').value('myLayout', myLayout);

  myLayout.init();
})();


