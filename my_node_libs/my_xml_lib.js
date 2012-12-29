var hola="hola";
exports.hola=hola;
var  xml2js = require('xml2js'), jstoxml=require('jstoxml');
var my_fs=require('./my_fs_lib');
function create_parser(__dirname){
    var parser= new xml2js.Parser({explicitArray:false});
    var asyncronous_response= function(res_function){
        return function(result){
            res_function(result);
        };
    };
    return {
        // name of the file without extension and target_function(result)
        read_data: function (name, target_function){
            
            parser.addListener('end',asyncronous_response(target_function));

            function on_end_read(err, data){
                parser.parseString(data);
            };
            my_fs.read_file(__dirname + '/'+name+'.xml', on_end_read);
        },
        
    }
};

exports.create_parser=create_parser;

exports.count_xml_files=function(files){
    var c=0;
    my_fs.apply_fn_to_files(files, function(){ 
        if(this.file.indexOf(".xml")!==-1)
            c++; 
    });
    return c;
};

var get_only_xml_files=function(files){
    var xml_files=[];
    my_fs.apply_fn_to_files(files, function(){ 
        if(this.file.indexOf(".xml")!==-1)
            xml_files.push(this.file);
    });
    return xml_files;
};
exports.get_only_xml_files=get_only_xml_files;
//if_no_results_fn with method invocation 
//on_each_result_fn apply invocation
exports.aply_fn_to_xml_files_in_dir_async=function(__dirname, if_no_results_fn, on_end_parse_file){

    my_fs.read_dir(__dirname, function(err, files){
        files=get_only_xml_files(files);
        this.counter=files.length;
        
        // exit if there aren't xml files in dir
        if(this.counter==0){
            // without apply invocation cause never mind the inside
            // context in this case
            on_no_result();
        }
        
        function on_file_function(){
           create_parser(__dirname).read_data(this.file.replace(".xml", ""), on_end_parse_file);
        };
        
        my_fs.apply_fn_to_files(files, on_file_function);


    }); 

};
exports.create_xml_with_json_data=function(file_path, data, on_end){
  
    var xml_data=jstoxml.toXML(data);
    my_fs.write_file(file_path, xml_data, on_end);
};
