/* functions printers outside for better reuse*/
// use date_format.js lib to augmenting Date function with format method.
// Obtained from http://jsfiddle.net/phZr7/1/ 
var date_printer={
        //US = United States, UK = United Kingdom, AU = Australia
    US: function(){return "US: "+this.date.format("mm/dd/yy");},
    UK: function(){return "UK: "+this.date.format("dd/mm/yy");},
    AU: function(){return "AU: "+this.date.format("dd/mm/yy");}
};

var wage_printer={
        //US = United States, UK = United Kingdom, AU = Australia
    US: function(){return "US: $"+this.wage;},
    UK: function(){return "UK: £"+this.wage;},
    AU: function(){return "AU: $"+this.wage;}
};

