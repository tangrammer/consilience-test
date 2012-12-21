var assert=require('assert');
var express=require('express');
var app =express();

var core=require('./my_core');
var i18n=require('./i18n');
var dob=require('./dob.js');
core.load_library_to_global("debug");
require('./persons.js');

app.listen(3000);
reloadCode();

spec([
"when locale change rebuild the object using prototypes and closures",
"(modular design) It uses the nexts libs:",
"public/javascripts/core.js",
"public/javascripts/i18n.js"
]);
log("--------->>>>>>"+webmaster);

var person=create_person(data_person_example);

var person_i18n=internationalize(person);
var person_i18n_bis=internationalize(create_person({id: 1, DOB: "1999-07-23", wage:150, fname: "PEPE"}));

invoke_i18n_methods(person);

invoke_i18n_methods(person_i18n);
set_locale("AU");
invoke_i18n_methods(person_i18n);

