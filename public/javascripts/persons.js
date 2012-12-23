// this file use ./core.js and ./i18n.js
var webmaster="juanantonioruz@gmail.com";

var data_person_example={
        id: 1,
        fname: "Juan Antonio",
        lname: "Ruz",
        DOB: "1976-06-13",
        wage: 100,
        location: "ES"
    };


function Person(){
    getters(this, ["id", "fname", "lname", "DOB", "wage", "location"]);
};

function create_person(spec){
    var p=new Person();
    init(p, spec);
// converting p.DOB from string value to date value 
    p.DOB=new Date(p.DOB);
    return p;
}

function PersonLocalized(){
    this.get_fname=function(){return "i18n_ "+this.fname};

    this.get_DOB=function(){
        return date_printer[this.lang].call({date:this.DOB});
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
    init(p_l, person);
    return p_l;
};


function invoke_i18n_methods(_p){
    log("\nDebug Person:\nLanguage: "+(_p.lang || "NO LOCALIZED"));
    log(_p.get_fname());
    log(_p.get_DOB());
    log(_p.get_wage());
    
}

//console.log(Person);
