var sys=require('sys');
var fs=require('fs');
function console_inspects(o){
            sys.puts(sys.inspect(o));    
}

var express=require('express');
var app =express();
var jquery=require('jquery');
var persons = require('./routes/persons');
app.get('/persons', persons.find_all);
app.get('/persons/:id', persons.find_by_id);

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


function write_data(data, write_callback){
//function write_callback(err) { if (err) throw err; console.log('It\'s saved!');}
    fs.writeFile('./data/new_'+data.id+'.txt', xml_data, write_callback);
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





