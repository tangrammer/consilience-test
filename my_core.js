exports.load_library_to_global=function (p){
    var load_file=require('./'+p);
    for(v in load_file){
        global[v]=load_file[v];
   } 
};
exports.init=function (o, spec){
for(value in spec){
    if(o[value]==undefined)
o[value]=spec[value];

}

}
exports.getters=function(f, props){
for(var i=0; i<props.length; i++){
    var mi_get=function(x){
        return function(){
            return this[props[x]];
        };
    }(i);
f.prototype['get_'+props[i]]=mi_get;

}
}
