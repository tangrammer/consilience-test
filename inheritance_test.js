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


var printer_basic_date= function(){
    return "BASIC DATE FORMAT: "+this.date;
};

var printer_basic_wage=function(){
    return "BASIC WAGE FORMAT: "+this.wage;
};

var data_person_example={
        id: 1,
        fname: "Juan Antonio",
        lname: "Ruz",
        DOB: "1976-06-13",
        wage: 100,
        location: "ES"
    };


function Person(){
    this.id=1;
    
    this.fname="juanantonio"; 
    this.lname="ruz";

    this.DOB_value=data_person_example.DOB;
    this.printer_dob=printer_basic_date;
    this.wage_value=100;
    this.printer_wage=printer_basic_wage;

    /*
      // 2 forms to include api
      
      // -->>  including api in function var

      this.DOB=function(){
      return this.printer_dob.call({date:this.DOB_value});
      };
      this.get_fname=function(){return this.fname};    
      
      // --> outside the function definition    
      
      Person.prototype.DOB=function(){return this.printer_dob.call({date:this.DOB_value});    
      Person.prototype.get_fname=function(){return this.fname;}();
    */
    
    this.DOB=function(){
        return this.printer_dob.call({date:this.DOB_value});
    };

    this.wage=function(){
        return  this.printer_wage.call({wage:this.wage_value});
    };
    this.get_fname=function(){return this.fname};    

};


var person_example=new Person();

log("person_example.get_fname: "+person_example.get_fname());
log("person_example.get_DOB: "+person_example.DOB());




function PersonLocalized(){
    //refining in instance

    this.printer_dob=i18n.date_printer.UK;
    log(this.printer_dob.call({date: data_person_example.DOB}));
    this.fname="JOE";
};

/*
  //--> asigning prototype to PersonLocalized 
  PersonLocalized.prototype=new person_example.constructor;
  //--> the same as
  PersonLocalized.prototype=new Person();
*/

PersonLocalized.prototype=new Person();

var person_localized_example=new PersonLocalized();
var new_name="JOE AU";
var new_wage=150.5;

person_localized_example.fname=new_name;
person_localized_example.printer_dob=i18n.date_printer.AU;

person_localized_example.wage_value=new_wage;
person_localized_example.printer_wage=i18n.wage_printer.AU;

// this not affect to the refined instance
PersonLocalized.prototype.printer_dob=i18n.date_printer.US;
PersonLocalized.prototype.printer_wage=i18n.wage_printer.US;
PersonLocalized.prototype.fname="i18n localized user";


var person_localized_example_fname=person_localized_example.get_fname();
var person_localized_example_DOB=person_localized_example.DOB();
var person_localized_example_wage=person_localized_example.wage();

var DOB_expected=i18n.date_printer.AU.call({date:data_person_example.DOB});
var wage_expected=i18n.wage_printer.AU.call({wage:new_wage});

log("\ntesting!!");
assert(person_localized_example_fname===new_name, "the instance name is not correct, it must be: "+new_name+" and actual is "+person_localized_example_fname);
assert(person_localized_example_DOB===DOB_expected, "the DOB LOCATED  is not correct, it must be: "+DOB_expected+" and actual is "+person_localized_example_DOB);
assert(person_localized_example_wage==wage_expected, "the wage LOCATED  is not correct, it must be: "+wage_expected+" and actual is "+person_localized_example_wage);
log("CORRECT person_localized fname: "+person_localized_example_fname);
log("CORRECT person_localized DOB: "+person_localized_example_DOB);
log("CORRECT person_localized wage: "+person_localized_example_wage);
log("\n\n\n\n\n");






