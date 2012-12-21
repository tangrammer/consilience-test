var fs = require('fs');
exports.load_js_client=function(context, path_lib, method_names, subcontext){
   var subcontext_=this;
    if(!(subcontext === undefined))
        subcontext_=subcontext;

       eval.call(subcontext_, fs.readFileSync(path_lib,'utf8'));

    for(var i=0; i<method_names.length; i++){
        context[method_names[i]]=eval.call(subcontext_, method_names[i]);
    }


    
}

