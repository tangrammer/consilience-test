var assert=require('assert');
var express=require('express');
var app =express();

var core=require('./../my_node_libs/my_core');

core.load_library_to_global("debug");

app.listen(3000);
reloadCode();

spec([
"more inheritance tests"
]);

Object.beget=function(o){
    var F=function(){};
    F.prototype=o;
    return new F();
};


var animal={
    name: 'this is an animal',
    get_name: function(){
        return this.name;
    }
    
};
log(animal.name);

var my_cat=Object.beget(animal);
my_cat.name="Troni";
my_cat.address="c/AZafran";
my_cat.color="white";

log(my_cat.name+" address: "+my_cat.address);

var little_blue=Object.beget(my_cat);
little_blue.name="pim";
little_blue.color="blue";
log(little_blue.name+" address: "+little_blue.address+little_blue.color);


var little_red=Object.beget(my_cat);
little_red.name="pam";
little_red.color="red";

log(little_red.name+" address: "+little_red.address+little_red.color);


var little_bis=Object.beget(little_red);
little_red.name="bis";
little_bis.color="orange";

log(little_bis.name+" address: "+little_bis.address+little_bis.color);

