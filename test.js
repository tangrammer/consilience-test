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
app.delete('/persons/:id', persons.delete_by_id);

//app.delete('/persons', persons.delete_all);
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






