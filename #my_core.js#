var core=require('./core_node.js');

exports.load_library_to_global=function (p){
    var load_file=require('./'+p);
    for(v in load_file){
        global[v]=load_file[v];
   } 
};



