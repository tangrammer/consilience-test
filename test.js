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

var jquery=require('jquery');
var persons = require('./routes/persons');
app.get('/persons', persons.find_all);
app.get('/persons/:id', persons.find_by_id);
app.get('/', 
        function(req, res){
            res.render('index', {title:'hola', youAreUsingJade: 'me'});
        }
       );


function log(o){
console.log(o);
}

app.listen(3000);
var mensaje="server is  listening in 3000";
log(mensaje);

// testing prototypal inheritance
var prueba={name: "juan"};
prueba.canta=function(){return "canta:::"+this.name;};
log(prueba.canta());


var prueba_child=Object.create(prueba);
prueba_child.name="eppe";
log(prueba_child.canta());

prueba_child.canta= function(){return "singing"+this.name;};
log(prueba.canta());
log(prueba_child.canta());

/*
 - Create a webpage primarily using JavaScript that throw an personalized object
- implements the basic logic for interacting with the xml resource - load/save/create new/etc  (it's okay to use an AJAX library for the actual data exchange)
- synchs member attributes with the fields of the resource
- has methods to translate the DOB (date of birth) and wage into formats appropriate for the location; using Functional Programming (not using IF/switch statements)
- Uses prototypes and closures to rebuild the object when the location changes, modifying/replacing methods. 
 
- Uses an open source JS library to generate the user interface.
*/


var jstoxml = require('jstoxml');
XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

jquery.support.cors = true;
jquery.ajaxSettings.xhr = function () {
    return new XMLHttpRequest;
}


function write_data(data, url_data, write_callback){
//function write_callback(err) { if (err) throw err; console.log('It\'s saved!');}
    fs.writeFile('./data/new_'+data.id+'.txt', xml_data, write_callback);
}

function generate_id_person(){
var id_counter=1;
var filename='./data/counter.txt';

var counter_file=fs.readFileSync(filename);
    console.log(counter_file);
    if(!counter_file){
        fs.writeFileSync(filename, id_counter);
        return id_counter;
    }else{
        counter_file++;
        fs.writeFileSync(filename, counter_file);
       return counter_file;
    }
    
}

function load_data(url){

    function error(jqXHR, textStatus, errorThrown){
        console.log("error"+errorThrown);
    };
 
    function success(data, textStatus, jqXHR){
        console.log(data);
        var xml_data=jstoxml.toXML({person:data});
        console.log(xml_data);
    }

    jquery.ajax({
        type: 'GET',
        url: url,
        //  data: data,
        success: success,
        error: error,
        dataType: "json"
    });
};

load_data("http://localhost:3000/persons/1");






