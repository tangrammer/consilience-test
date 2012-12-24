/* functions printers outside for better reuse*/
// use date_format.js lib to augmenting Date function with format method.
// Obtained from http://jsfiddle.net/phZr7/1/ 

var date_formats={
 US: "mm/dd/yy",
 UK: "dd/dd/yy",
 AU: "dd/mm/yy"
};

var date_printer={
        //US = United States, UK = United Kingdom, AU = Australia
    US: function(){return "US: "+this.date.format(date_formats.US);},
    UK: function(){return "UK: "+this.date.format(date_formats.UK);},
    AU: function(){return "AU: "+this.date.format(date_formats.AU);}
};

var wage_printer={
        //US = United States, UK = United Kingdom, AU = Australia
    US: function(){return "US: $"+this.wage;},
    UK: function(){return "UK: £"+this.wage;},
    AU: function(){return "AU: $"+this.wage;}
};

