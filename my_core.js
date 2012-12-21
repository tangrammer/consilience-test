var core=require('./core_node.js');
var path_lib='./public/javascripts/core.js';
exports.load_library_to_global=function (p){
    var load_file=require('./'+p);
    for(v in load_file){
        global[v]=load_file[v];
   } 
};
core.load_js_client(exports, path_lib, ['init', 'getters']);



