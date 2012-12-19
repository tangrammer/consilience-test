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
function person_view(){
   p_data=printer_data;
    var person={};
    
    var api={
        DOB: p_data.call({date: person.DOB})
    };

   return api;
}

var person_example={
        id: 1,
        fname: "Juan Antonio",
        lname: "Ruz",
        DOB: "1976-06-13",
        wage: 100,
        location: "ES"
    };


function basic_person_f(){
    data=person_example;
     p_data=printer_data;
    //person and printer
    //...

}
var comp_locale

function Person_data(){

    this.fname="juanantonio"; 
    this.lname="ruz";

    this.DOB_value="13/06/1976";
    this.printer_dob=printer_data;



//    this.printer_dob.call({date:this.DOB_value});    

    this.DOB=function(){
        
        return this.printer_dob.call({date:this.DOB_value});
    };
    this.get_fname=function(){return this.fname};
    
// extract this.DOB and this.fname outside definition Person_data
//Person_data.prototype.get_DOB=function(){return this.locale.DOB.get_print_value();}.call(person_example);    
//Person_data.prototype.get_fname=function(){return this.fname;}();
};


var person_example=new Person_data();


log("person_example.get_fname: "+person_example.get_fname());
log("person_example.get_DOB: "+person_example.DOB());


var person_localized_function=function(){
    //refining in instance
    this.printer_dob=date_in_locale_printer.UK;
    this.fname="jolin";
};
//person_localized_function.prototype=new person_example.constructor;
// the same that 
person_localized_function.prototype=new Person_data();
var person_localized_example=new person_localized_function();
person_localized_example.fname="peep";

person_localized_example.printer_dob=date_in_locale_printer.AU;
person_localized_function.prototype.printer_dob=date_in_locale_printer.US;

person_localized_function.prototype.fname="esto no se solapa a la instancia";
log("testing!!");
log("person_localized fname: "+person_localized_example.get_fname());
log("person_localized: "+person_localized_example.DOB());

/*
var f=function(){};
f.prototype=o;

var k=new f();
log("k.aver: "+k.aver());
*/
/*
person_data.prototype.fname="mas";
log("f: after "+f.aver());

log("f.fname: "+ f.locale.DOB.get_print_value());
f.fname="hole";
log("f: after "+f.aver());


var d=new f.constructor();
d.prototype=f;

log("d from f: "+d.fname);
d.fname="jon";
log("d from f: "+d.prototype.fname);

var k=new d.constructor();
log("k: "+k.fname);
*/
log("\n\n\n\n\n");



function person_app(){
    var get_fname= function() {return this.fname;};

//    var DOB=locale.DOB.get_print_value();
}
var h=new person_app();
h.prototype=new Person_data();
h.get_fname=function(){return this.fname;};
console.log("FNAMEEE"+h.get_fname());

//person_data.prototype.DOB=person_data.prototype.locale.DOB.get_print_value();

//log("BASE PERSON APP/ DOB: "+person_app.DOB);

//var person_locale=new person_app.constructor();
//person_app.prototype.A="ey";
//person_locale.prototype.A="EE";
//log("fname: "+person_app.get_fname());

/*
var person_i18n=new person_data();
log("fffff::::"+b_p.data);
basic_person_f.prototype.get_data=function(){return data};
basic_person_f.prototype.localize=function(local){return data};
log("fffff:2:::"+b_p.get_data().fname);

var l_p=new b_p.constructor();
*/


/*
var basic_person=new person_view();
person_view.prototype.person=person_example;
var my_no_locale_view_of_person=basic_person.DOB;
log("NO LOCALIZED: "+my_no_locale_view_of_person);
*/
/*
var printer_data_localized=date_in_locale_printer.UK;

var person_localized=person_view(person_example, printer_data_localized);
var my_locale_view_of_person=person_localized.DOB;
log("LOCALIZED: "+my_locale_view_of_person);
*/
function circle(){
}
var mi_circulo=new circle();
circle.prototype.radio=5;
log("radio: "+mi_circulo.radio);

var mi_aro=new mi_circulo.constructor();
circle.prototype.diametro=10;
log("aro radio: "+mi_aro.radio);
log("aro diametro: "+mi_aro.diametro);



// testing prototypal inheritance
/*
var prueba={name: "juan"};
prueba.canta=function(){return "canta:::"+this.name;};
log(prueba.canta());


var prueba_child=Object.create(prueba);
prueba_child.name="eppe";
log(prueba_child.canta());

prueba_child.canta= function(){return "singing"+this.name;};
log(prueba.canta());
log(prueba_child.canta());

*/

log("\n\n");
