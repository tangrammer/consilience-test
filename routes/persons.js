var fs = require('fs'),  xml2js = require('xml2js'), sys=require('sys'), jstoxml=require('jstoxml');

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
    var mi_parser=create_parser();    

    function target_data(result){
        var model=person_details(result);
        res.send(model); //plain response
        //jade response  res.render('person', model);
    };
    mi_parser.read_data(person_id, target_data);
};


var delete_by_id=function(req, res){
    function_inheritance(req_res_base, this, arguments);
    
    var person_id=req.params.id;    
    console.log("eyyyyyyy!");

    function on_delete(error){
        if(error) throw error;
        res.send({action:"OK"}); 
    };

    fs.unlink(__dirname+"/"+person_id+".xml", on_delete);
}

    

exports.add_new=function(req, res){
    console.log(req.body);
    var new_id=generate_id_person();
    req.body.id=new_id;
    write_data({person:req.body}, function(err) { if (err) throw err; res.send(req.body);});


}

exports.find_by_id=find_by_id;
exports.delete_by_id=delete_by_id;

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

