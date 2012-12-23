var fs = require('fs');
exports.load_js_client=function(context, path_lib, method_names, subcontext){
    (function(){
        if(typeof subcontext !== "undefined"){
            for(var v in subcontext){
                this[v]=subcontext[v];
            }
        }
        eval(fs.readFileSync(path_lib,'utf8'));
        for(var i=0; i<method_names.length; i++){
            context[method_names[i]]=eval(method_names[i]);
        }
    })();
}

