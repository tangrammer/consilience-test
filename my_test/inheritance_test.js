var assert=require('assert');
var express=require('express');
var app =express();

var core=require('./../my_node_libs/my_core');
var i18n=require('./../my_node_libs/i18n');

core.load_library_to_global("debug");

var $persons=require('./../my_node_libs/persons.js');

app.listen(3000);
reloadCode();

spec([
"when locale change rebuild the object using prototypes and closures",
"(modular design) It uses the nexts libs:",
"public/javascripts/core.js",
"public/javascripts/i18n.js"
]);


var person=$persons.create_person($persons.data_person_example);

var person_i18n=$persons.internationalize(person);
var other_person=$persons.create_person({id: 5,  DOB: "1999-07-23", wage:150, fname: "PEPE"});
var person_i18n_bis=$persons.internationalize(other_person);

$persons.invoke_i18n_methods(person);

$persons.invoke_i18n_methods(person_i18n);
$persons.set_locale("AU");
$persons.invoke_i18n_methods(person_i18n);
$persons.invoke_i18n_methods(person_i18n_bis);



