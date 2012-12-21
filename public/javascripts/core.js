var init=function (o, spec){
for(value in spec){
    if(o[value]==undefined)
        o[value]=spec[value];

}

}
var getters=function(f, props){
    for(var i=0; i<props.length; i++){
        var mi_get=function(x){
            return function(){
                return this[props[x]];
            };
        }(i);
        f.prototype['get_'+props[i]]=mi_get;
    }
}
