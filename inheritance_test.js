var assert=require('assert');
var express=require('express');
var app =express();

var core=require('./my_core');
var i18n=require('./i18n');
var dob=require('./dob.js');



core.load_library_to_global("debug");

var $persons=require('./persons.js');

app.listen(3000);
reloadCode();

spec([
"when locale change rebuild the object using prototypes and closures",
"(modular design) It uses the nexts libs:",
"public/javascripts/core.js",
"public/javascripts/i18n.js"
]);
log("--------->>>>>>"+$persons.webmaster);

var person=$persons.create_person($persons.data_person_example);

var person_i18n=$persons.internationalize(person);
var person_i18n_bis=$persons.internationalize($persons.create_person({id: 1, DOB: "1999-07-23", wage:150, fname: "PEPE"}));

$persons.invoke_i18n_methods(person);

$persons.invoke_i18n_methods(person_i18n);
$persons.set_locale("AU");
$persons.invoke_i18n_methods(person_i18n);


