var fs = require('fs'),  xml2js = require('xml2js'), sys=require('sys');

function person_details (result){
    var person=result.person;
        return person;
}
 var __dirname= "./data";
function create_parser(){
   
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
//plain response
            res.send(model);
//jade response
        //    res.render('person', model);
    };



    mi_parser.read_data(person_id, target_data);
};
 

exports.add_new=function(req, res){
    console.log(req.body);
     var mi_parser=create_parser();    

    function target_data(result){
        var model=person_details(result);
//plain response
            res.send(model);
//jade response
        //    res.render('person', model);
    };



    mi_parser.read_data(1, target_data);
/*    function_inheritance(req_res_base, this, arguments);
    var person_id=req.params.id;    
    console.log(person_id);

   */ 

//    res.send(data_person_example);
}

exports.find_by_id=find_by_id;


function read_files(files, ff){
  for(var f=0; f<files.length; f++){
           this.file_in=files[f];
           if(file_in.indexOf(".xml")!==-1){
               ff();
               
           }
}
       
}

exports.find_all=function (req, res) {
    var mi_parser=create_parser();    
    var cole=[];
    var contador=0;
    function addResult(result){
        cole.push(person_details(result));
        if(cole.length==contador){
            //TODO ORDER THE RESULTS BY ID
            res.send(cole);
        }
 }
   fs.readdir(__dirname, function(err, files){
     read_files(files, function(){ contador++; });
     read_files(files, function(){
         var name=this.file_in.replace(".xml", "");
   create_parser().read_data(name, addResult);

}
);

}); 
    


};

