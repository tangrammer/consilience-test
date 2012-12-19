var assert=require('assert');
var express=require('express');
var app =express();
app.listen(3000);
function log(o){
console.log(o);
}

var d=new Date();
var t=d.toLocaleTimeString();

log("\n\n"+t+"\n");

/*

when locale change rebuild the object using prototypes and closures

*/
/* functions printers outside for better reuse*/
var date_in_locale_printer={
        //US = United States, UK = United Kingdom, AU = Australia
    US: function(){return "TRAD US:"+this.date},
    UK: function(){return "TRAD UK:"+this.date},
    AU: function(){return "TRAD AU:"+this.date}


}

var printer_data= function(){
    return "BASIC DATE FORMAT: "+this.date;
};

var person_example={
        id: 1,
        fname: "Juan Antonio",
        lname: "Ruz",
        DOB: "1976-06-13",
        wage: 100,
        location: "ES"
    };
var juan_date="1976-06-13";

function parse_data(val){
    return new Date(val);
}
log(parse_data(juan_date));

function Person_data(){
    this.id=1;
    
    this.fname="juanantonio"; 
    this.lname="ruz";

    this.DOB_value=juan_date;
    this.printer_dob=printer_data;

    /*
      // 2 forms to include api
      
      // -->>  including api in function var

      this.DOB=function(){
      return this.printer_dob.call({date:this.DOB_value});
      };
      this.get_fname=function(){return this.fname};    
      
      // --> outside the function definition    
      
      Person_data.prototype.DOB=function(){return this.printer_dob.call({date:this.DOB_value});    
      Person_data.prototype.get_fname=function(){return this.fname;}();
    */

    this.DOB=function(){
        return this.printer_dob.call({date:this.DOB_value});
    };
    this.get_fname=function(){return this.fname};    

};


var person_example=new Person_data();

log("person_example.get_fname: "+person_example.get_fname());
log("person_example.get_DOB: "+person_example.DOB());

var person_localized_function=function(){
    //refining in instance
    this.printer_dob=date_in_locale_printer.UK;
    this.fname="JOE";
};

/*
  //--> asigning prototype to person_localized_function 
  person_localized_function.prototype=new person_example.constructor;
  //--> the same as
  person_localized_function.prototype=new Person_data();
*/

person_localized_function.prototype=new Person_data();

var person_localized_example=new person_localized_function();
var new_name="JOE AU";

person_localized_example.fname=new_name;

person_localized_example.printer_dob=date_in_locale_printer.AU;

// this not affect to the refined instance
person_localized_function.prototype.printer_dob=date_in_locale_printer.US;

person_localized_function.prototype.fname="esto no se solapa a la instancia";

var person_localized_example_fname=person_localized_example.get_fname();


var person_localized_example_DOB=person_localized_example.DOB();
var DOB_expected=date_in_locale_printer.AU.call({date:juan_date});

log("testing!!");
assert(person_localized_example_fname===new_name, "the instance name is not correct, it must be: "+new_name+" and actual is "+person_localized_example_fname);
assert(person_localized_example_DOB===DOB_expected, "the DOB LOCATED  is not correct, it must be: "+DOB_expected+" and actual is "+person_localized_example_DOB);
log("CORRECT person_localized fname: "+person_localized_example_fname);
log("CORRECT person_localized: "+person_localized_example_DOB);
log("\n\n\n\n\n");


