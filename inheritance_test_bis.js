var assert=require('assert');
var express=require('express');
var app =express();
var core=require('./my_core');
var i18n=require('./i18n');

core.load_library_to_global("debug");

app.listen(3000);

reloadCode();


/*
when locale change rebuild the object using prototypes and closures
*/



function data_person()
{
    this={
        id: 1,
        fname: "Juan Antonio",
        lname: "Ruz",
        DOB: "1976-06-13",
        wage: 100,
        location: "ES"
    }
};

function person(){
    this.mensaje=function(){
        log("mensaje de:: "+this.fname);
    };
}
person.prototype=new data_person();

var data=new data_person();
log(data.model.id);


log("\n\n\n\n\n");






