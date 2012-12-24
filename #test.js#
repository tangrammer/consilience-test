var sys=require('sys');
var fs=require('fs');
function console_inspects(o){
            sys.puts(sys.inspect(o));    
}

var express=require('express'), stylus = require('stylus'), nib = require('nib');


var app =express();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
var __dirname=".";

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'this is a secret' }));
  app.use(stylus.middleware({
      src: __dirname + '/public',
      compile: compile
    }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});


var persons = require('./routes/persons');
app.get('/persons', persons.find_all);
app.get('/persons/:id', persons.find_by_id);
app.post('/persons', persons.add_new);
//app.get('/persons.json/:id', persons.find_by_id_json);
app.get('/', 
        function(req, res){
            res.render('index', {title:'Consilience Skill Test'});
        }
       );


function log(o){
console.log(o);
}
var port = process.env.PORT || 3000;
app.listen(port);
var mensaje="server is  listening in "+port;
log(mensaje);



/*
 - Create a webpage primarily using JavaScript that throw an personalized object
- implements the basic logic for interacting with the xml resource - load/save/create new/etc  (it's okay to use an AJAX library for the actual data exchange)
- synchs member attributes with the fields of the resource
- has methods to translate the DOB (date of birth) and wage into formats appropriate for the location; using Functional Programming (not using IF/switch statements)
- Uses prototypes and closures to rebuild the object when the location changes, modifying/replacing methods. 
 
- Uses an open source JS library to generate the user interface.
*/





