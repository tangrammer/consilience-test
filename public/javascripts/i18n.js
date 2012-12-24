/* functions printers outside for better reuse*/
// use date_format.js lib to augmenting Date function with format method.
// Obtained from http://jsfiddle.net/phZr7/1/ 

var date_formats={
 US: "mm/dd/yy",
 UK: "dd/mm/yy",
 AU: "dd/mm/yy"
};

var date_printer={
        //US = United States, UK = United Kingdom, AU = Australia
    US: function(){return this.date.format(date_formats.US);},
    UK: function(){return this.date.format(date_formats.UK);},
    AU: function(){return this.date.format(date_formats.AU);}
};

var wage_printer={
        //US = United States, UK = United Kingdom, AU = Australia
    US: function(){return ""+this.wage;},
    UK: function(){return ""+this.wage;},
    AU: function(){return ""+this.wage;}
};

var wage_symbol_printer={
        //US = United States, UK = United Kingdom, AU = Australia
    US: function(){return "$";},
    UK: function(){return "£";},
    AU: function(){return "$";}
};
