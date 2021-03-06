function partial( fn /*, args...*/) {
  var aps = Array.prototype.slice,
    args = aps.call( arguments, 1 );
  
  return function() {
    return fn.apply( this, args.concat( aps.call( arguments ) ) );
  };
}

var init=function (o, spec){
    for(value in spec){
        if(o[value]==undefined)
            o[value]=spec[value];
    }
};

var getters=function(o, props){
       for(var i=0; i<props.length; i++){
        var mi_get=function(x){
            return function(){
                return this[props[x]];
            };
        }(i);
        o.constructor.prototype['get_'+props[i]]=mi_get;
    }
};
