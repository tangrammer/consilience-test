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



function person_view(person, printer_d){
    var printer_data= function(){
        return this.date;
    };

    this.p=person;
    if(printer_d){
        this.p_data=printer_d;
    }else{
        this.p_data=printer_data;
    }
    
    var api={
        DOB: this.p_data.call({date: p.DOB})
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

var basic_person=person_view(person_example);
var my_no_locale_view_of_person=basic_person.DOB;
log("NO LOCALIZED: "+my_no_locale_view_of_person);

var printer_data_localized=date_in_locale_printer.UK;

var person_localized=person_view(person_example, printer_data_localized);
var my_locale_view_of_person=person_localized.DOB;
log("LOCALIZED: "+my_locale_view_of_person);

var other_person=Object.create(person_localized);
other_person.salud="buena";
log("Salud "+other_person.salud);


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
