exports.load_library_to_global=function asimilate(p){
    var load_file=require('./'+p);
    for(v in load_file){
        console.log("hola"+v+":"+load_file[v]);
        global[v]=load_file[v];
   } 
}
