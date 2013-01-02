/* functions printers outside for better reuse*/
// use date_format.js lib to augmenting Date function with format method.
// Obtained from http://jsfiddle.net/phZr7/1/ 

var generic_js_format_date="yyyy-mm-dd";

var date_formats={    
    US: "mm/dd/yy",
    UK: "dd/mm/yy",
    AU: "dd/mm/yy"
};

// in jquery only one "y" to show two digits year
var ui_date_formats={
    US: "mm/dd/y",
    UK: "dd/mm/y",
    AU: "dd/mm/y"
};

var date_and_wage_xml_format= function(){
    for(var i=0; i<this.arr.length; i++){
        var map=this.arr[i];
        // convert date to xml file_format
        if(map.name==="DOB"){
            var the_date=$("#DOB").datepicker( "getDate" ); 
            map.value=the_date.format(generic_js_format_date);
            // clean wage format to
            // adapt to xml file_format
            
        }else if(map.name==="wage"){
            map.value=map.value.replace("$","").replace("£", "");
        }
    }

}

var date_printer={
    //US = United States, UK = United Kingdom, AU = Australia
    US: function(){return this.date.format(date_formats.US);},
    UK: function(){return this.date.format(date_formats.UK);},
    AU: function(){return this.date.format(date_formats.AU);}
};

var wage_printer={
    //US = United States, UK = United Kingdom, AU = Australia
    US: function(){return "$"+this.wage;},
    UK: function(){return "£"+this.wage;},
    AU: function(){return "$"+this.wage;}
};

var wage_symbol_printer={
    //US = United States, UK = United Kingdom, AU = Australia
    US: function(){return "$";},
    UK: function(){return "£";},
    AU: function(){return "$";}
};
