function log(e){
    console.log(e);
}

var hola="hola";
console.log(hola);
if(typeof ey === "undefined" )
log("------- //// undefined");



var data_person_example={
        id: 1,
        fname: "Juan Antonio",
        lname: "Ruz",
        DOB: "1976-06-13",
        wage: 100,
        location: "ES"
    };


function Person(spec){
    for(var v in spec)
        this["get_"+v]=(function(x){return function(){return x}})(spec[v]);
}

function PersonLocalized(){
    this.get_fname=function(){return "i18n_ "+this.fname};

    this.get_DOB=function(){
        return date_printer[this.lang].call({date:this.get_DOB()});
    };

    this.get_wage=function(){
        return wage_printer[this.lang].call(this);
    };
};

PersonLocalized.prototype=new Person();
PersonLocalized.prototype.lang="US";
function set_locale(new_lang){
    PersonLocalized.prototype.lang=new_lang;
};


function internationalize(person){
    var p_l=new PersonLocalized();
    for(var h in person){
        if(!p_l.hasOwnProperty(h))
        p_l[h]=person[h];
    }

    return p_l;
};


var date_printer={
        //US = United States, UK = United Kingdom, AU = Australia
    US: function(){return "US: "+this.date.format("mm/dd/yy");},
    UK: function(){return "UK: "+this.date.format("dd/mm/yy");},
    AU: function(){return "AU: "+this.date.format("dd/mm/yy");}
};


var my_prueba=new Person(data_person_example);
console.log(my_prueba.get_fname());
console.log(my_prueba.get_DOB());
var person_i18n=internationalize(my_prueba);
console.log(person_i18n.get_DOB());

