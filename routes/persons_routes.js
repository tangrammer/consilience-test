var fs = require('fs'),  xml2js = require('xml2js'), sys=require('sys'), jstoxml=require('jstoxml');
var core=require('./../my_node_libs/my_core');
// loading my debug functions for logging or inspect values
core.load_library_to_global("debug");

var my_xml=require('./../my_node_libs/my_xml_lib');
var my_fs=require('./../my_node_libs/my_fs_lib');


function person_details (result){
    var person=result.person;
    return person;
}
var __dirname= "./data";


function write_data(data, write_callback){
    log(data);
    my_xml.create_xml_with_json_data('./data/'+data.person.id+'.xml', data, write_callback);
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

var  find_by_id=function(req, res){

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


    
    var person_id=req.params.id;    
    
    function on_delete(error){
        if(error) throw error;
        res.send({action:"OK"}); 
    };

    fs.unlink(__dirname+"/"+person_id+".xml", on_delete);
}



exports.add_new=function(req, res){
    var new_id=generate_id_person();
    req.body.id=new_id;
    write_data({person:req.body}, function(err) {
        if (err)  res.send({error:true});
        res.send(req.body);

    });


}

exports.edit_by_id=function(req, res){
    log(req.body);
    write_data({person:req.body}, function(err) { if (err) throw err; res.send(req.body);});
    res.send("OK");
}

exports.find_by_id=find_by_id;
exports.delete_by_id=delete_by_id;


exports.find_all=function (req, res) {

    
   var person_list=[];

   this.counter=0;

    function on_end_parse_file(result){
        person_list.push(person_details(result));
        if(person_list.length==counter){
            res.send(person_list);
        }
    };
    function on_no_result(){
          res.send({result:"SIN DATA"});        
    };

    my_xml.aply_fn_to_xml_files_in_dir_async(__dirname, on_no_result, on_end_parse_file);




};

