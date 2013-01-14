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

var BASE_OBJ=function(){;};
// this value is reached from prototype chain ok
//BASE_OBJ.prototype.name="julian";


var BASE_OBJ_inst =function(){;};

//why never participate in chain ????
BASE_OBJ_inst.name="this never participate in prototype chain";


var OBJ=new BASE_OBJ();

OBJ.prototype=BASE_OBJ_inst;
//OBJ.name="ofu";



var MIF=function(){
// instance properties
//this.name="instancia name";
};
MIF.prototype=OBJ;
//MIF.prototype.name="hola";
MIF.prototype.saluda=function(){return "greeting function"+this.name;};
log(new MIF().saluda());
