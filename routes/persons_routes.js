var fs = require('fs'),  xml2js = require('xml2js'), sys=require('sys'), jstoxml=require('jstoxml');
var core=require('./../my_core');
// loading my debug functions for logging or inspect values
core.load_library_to_global("debug");

var my_xml=require('./../my_xml_lib');
var my_fs=require('./../my_fs_lib');



function person_details (result){
    var person=result.person;
    return person;
}
var __dirname= "./data";


function write_data(data, write_callback){
    //function write_callback(err) { if (err) throw err;
    //console.log('It\'s saved!');}
    var xml_data=jstoxml.toXML(data);
    fs.writeFile('./data/'+data.person.id+'.xml', xml_data, write_callback);
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
    var mi_parser=my_xml.create_parser(__dirname);    

    function target_data(result){
        var model=person_details(result);
        res.send(model); //plain response
        //jade response  res.render('person', model);
    };
    mi_parser.read_data(person_id, target_data);
};


var delete_by_id=function(req, res){
    log("DELETE BY ID"+req.body.id);
    function_inheritance(req_res_base, this, arguments);
    
    var person_id=req.params.id;    
    
    function on_delete(error){
        if(error) throw error;
        res.send({action:"OK"}); 
    };

    fs.unlink(__dirname+"/"+person_id+".xml", on_delete);
}

    

exports.add_new=function(req, res){
    log(req.body);
    var new_id=generate_id_person();
    req.body.id=new_id;
    write_data({person:req.body}, function(err) { if (err) throw err; res.send(req.body);});
    res.send("OK");

}

exports.edit_by_id=function(req, res){
    log(req.body);
    write_data({person:req.body}, function(err) { if (err) throw err; res.send(req.body);});
    res.send("OK");
}

exports.find_by_id=find_by_id;
exports.delete_by_id=delete_by_id;


exports.find_all=function (req, res) {


    var cole=[];
    var contador=0;
    function addResult(result){
        cole.push(person_details(result));
        if(cole.length==contador){
            //TODO ORDER THE RESULTS BY ID
            res.send(cole);
        }
    };

function on_read_file_in_directory_function(){
  if(this.file.indexOf(".xml")!==-1){        
    var name=this.file.replace(".xml", "");
    my_xml.create_parser(__dirname).read_data(name, addResult);
}
};

    fs.readdir(__dirname, function(err, files){
        my_fs.apply_fn_to_files(files, function(){ contador++; });
        if(contador>0){
            my_fs.apply_fn_to_files(files, on_read_file_in_directory_function);
            }else{
                res.send({});
            }

    }); 
    


};

