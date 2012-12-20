exports.mi_funcion=function(){console.log("load");};

exports.log=function log(o){
console.log(o);
}

exports.reloadCode=function reloadCode(){
    var d=new Date();
    var t=d.toLocaleTimeString();
    log("\n\nTesting: Reloading Code at: "+t+"\n");
}

