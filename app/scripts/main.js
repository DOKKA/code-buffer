var config = {
  settings: {
    selectionEnabled: true
  },
  content: [{
    type: 'row',
    content: [
      {
        type:'component',
        componentName: 'example',
        componentState: { text: 'Component 1' }
      }
    ]
  }]
};


var myLayout,
  savedState = localStorage.getItem( 'savedState' );

if( savedState !== null ) {
  myLayout = new GoldenLayout( JSON.parse( savedState ),$('#main') );
} else {
  myLayout = new GoldenLayout( config ,$('#main'));
}


myLayout.registerComponent( 'example', function( container, state ){
  var mode = $('#selMode').val() || 'javascript';
  var theme = $('#selTheme').val() || "ace/theme/monokai";
  var name = $('#txtName').val() || 'example';
  var fontSize = $('#selFontsize').val();
  var editor = ace.edit(container.getElement()[0]);
  editor.setTheme(theme);
  editor.session.setMode('ace/mode/'+mode);
  editor.setOptions({fontSize: fontSize});
  container.setTitle(name);

  container.on('resize',function(){
    editor.resize();
  });
});

myLayout.on( 'stateChanged', function(){
  var state = JSON.stringify( myLayout.toConfig() );
  localStorage.setItem( 'savedState', state );
});

$('#btnAdd').click(function(){
  if(myLayout.root.contentItems && myLayout.root.contentItems.length > 0){
    var container = myLayout.root.contentItems[0].addChild({
      type: 'component',
      componentName: 'example'
    });
  } else {
    var container = myLayout.root.addChild({
      type: 'component',
      componentName: 'example'
    });
  }


});

$.get('modes.html',function(data){
  $('#selMode').html(data)
});

$.get('themes.html',function(data){
  $('#selTheme').html(data)
});

function resize(){
  var height = $(window).height();
  var width = $(window).width();
  var main = $('#main').css({
    width: width,
    height: height-35,
  });
  setTimeout(function(){
    myLayout.updateSize();
  },10);
}

myLayout.init();
$(window).resize(resize);
resize();
