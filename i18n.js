/* functions printers outside for better reuse*/
exports.date_printer={
        //US = United States, UK = United Kingdom, AU = Australia
    US: function(){return "US: "+this.date.toString("mm/dd/yy");},
    UK: function(){return "UK: "+this.date.toString("dd/mm/yy");},
    AU: function(){return "AU: "+this.date.toString("dd/mm/yy");}
};

exports.wage_printer={
        //US = United States, UK = United Kingdom, AU = Australia
    US: function(){return "US: $"+this.wage;},
    UK: function(){return "UK: £"+this.wage;},
    AU: function(){return "AU: $"+this.wage;}
};




