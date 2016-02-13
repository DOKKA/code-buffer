(function(){

  var config = {
    content: [{
      type: 'row'
    }]
  };

  var myLayout,
    savedState = localStorage.getItem( 'savedState' );



  if( savedState !== null ) {
    myLayout = new GoldenLayout( JSON.parse( savedState ),$('#main') );
  } else {
    myLayout = new GoldenLayout( config ,$('#main'));
  }

  myLayout.on('initialised', function () {
    angular.bootstrap(document.body, ['codeBufferApp']);
  });

  //this should be a service
  myLayout.registerComponent( 'example',function( container, state ){
    console.log(state)
    var editor = ace.edit(container.getElement()[0]);
    editor.setTheme(state.theme || 'ace/theme/monokai');
    editor.session.setMode( 'ace/mode/'+(state.mode || 'javascript'));
    editor.setOptions({fontSize: state.size || '14px'});
    container.setTitle(state.name || 'untitled');

    container.on('resize',function(){
      editor.resize();
    });
  });

  myLayout.on( 'stateChanged', function(){
    var state = JSON.stringify( myLayout.toConfig() );
    localStorage.setItem( 'savedState', state );
  });

  //lots of things depend on the layout being available as a value
  angular.module('codeBufferApp').value('myLayout', myLayout);

  //initialize the layout to bootstrap the application
  myLayout.init();
})();


