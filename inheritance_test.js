var assert=require('assert');
var express=require('express');
var app =express();
var core=require('./my_core');
var i18n=require('./i18n');
var dob=require('./dob.js');
core.load_library_to_global("debug");

app.listen(3000);

reloadCode();


/*
when locale change rebuild the object using prototypes and closures
*/


var data_person_example={
        id: 1,
        fname: "Juan Antonio",
        lname: "Ruz",
        DOB: "1976-06-13",
        wage: 100,
        location: "ES"
    };


function Person(){
    core.getters(Person, ["id", "fname", "lname", "DOB", "wage", "location"]);
};

function create_person(spec){
    var p=new Person();
    core.init(p, spec);
    return p;
}

var person=create_person(data_person_example);

function PersonLocalized(){
    this.get_fname=function(){return "i18n_ "+this.fname};

    this.get_DOB=function(){
        return i18n.date_printer[this.lang].call({date:this.DOB});
    };

    this.get_wage=function(){
        return i18n.wage_printer[this.lang].call(this);
    };
};

PersonLocalized.prototype=new Person();

function set_locale(new_lang){
    PersonLocalized.prototype.lang=new_lang;
};

function internationalize(person){
    var p_l=new PersonLocalized();
    core.init(p_l, person);
    return p_l;
};

var person_i18n=internationalize(person);
var person_i18n_bis=internationalize(create_person({id: 1, DOB: "1999-07-23", wage:150, fname: "PEPE"}));

function invoke_i18n_methods(_p){
    log("\n test person: language"+PersonLocalized.prototype.lang);
    log(_p.get_fname());
    log(_p.get_DOB());
    log(_p.get_wage());
    
}

set_locale("US");
invoke_i18n_methods(person_i18n);
invoke_i18n_methods(person_i18n_bis);

set_locale("UK");
invoke_i18n_methods(person_i18n);
invoke_i18n_methods(person_i18n_bis);

log("\n\n\n\n\n");
