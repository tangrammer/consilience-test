var hola="hola";
exports.hola=hola;
var  xml2js = require('xml2js'), jstoxml=require('jstoxml');
var my_fs=require('./my_fs_lib');
exports.create_parser=function create_parser(__dirname){
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

