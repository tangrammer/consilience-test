var person_juan={
    person:{
    id: 1,
    fname: "Static Juan",
    lname: "Ruz",
   DOB: "1976-06-13",
    wage: 100,
    location: "ES"
}
};

var fs = require('fs'),  xml2js = require('xml2js'), sys=require('sys');

function person_details (result){
    var person=result.person;
        return {id: person.id, fname : person.fname, lname: person.lname};
}

function create_parser(){
    var __dirname= "./data";
    var parser= new xml2js.Parser({explicitArray:false});
    var asyncronous_response= function(res_function){
        return function(result){
                     res_function(result);
        };
    };
   return {
    read_data: function (id, target_function){
 
       parser.addListener('end',asyncronous_response(target_function));

        fs.readFile(__dirname + '/'+id+'.xml', function(err, data) {
            parser.parseString(data);
        });
    },
   
}
}

function req_res_base(req, res){
   return {
       print_result: function (r){
        res.send(r);
    }
   }
}

function function_inheritance(older, newer, args){
    var superior=older.apply(this, args);
    for(var name in superior){
         newer[name]=superior[name];
    } 
    

}

var  find_by_id=function(req, res){
    function_inheritance(req_res_base, this, arguments);

    var person_id=req.params.id;    
    var mi_parser=create_parser();    

    function target_data(result){
        var model=person_details(result);
            res.render('person', {person: model});

      //  print_result(person_details(result));
    };



    mi_parser.read_data(person_id, target_data);
};
 

exports.find_by_id=find_by_id;

exports.find_all=function (req, res) {
    var mi_parser=create_parser();    
    var cole=[];
    var contador=2;
    function addResult(result){
        cole.push(person_details(result));
        if(cole.length==contador){
            //TODO ORDER THE RESULTS BY ID
            res.send(cole);
        }
 }
    
   create_parser().read_data(2, addResult);
   create_parser().read_data(1, addResult);
};












// TESTING SOME IDEAS


function prueba_method_call_use_context(){
var x = 10;
var o = { x: 15 };
function f(message)
{
    console.log(message);
    console.log(this.x);
}

f("invoking f**************");
f.call(o, "invoking f via call*************");
}
