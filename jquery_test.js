var jstoxml = require('jstoxml');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var jquery=require('jquery');

jquery.support.cors = true;
jquery.ajaxSettings.xhr = function () {
    return new XMLHttpRequest;
}



function load_data(url){

    function error(jqXHR, textStatus, errorThrown){
     console.log(errorThrown);
    };
 
    function success(data, textStatus, jqXHR){
        console.log(data);
        var xml_data=jstoxml.toXML({person:data});
        console.log(xml_data);
    }

    jquery.ajax({
        type: 'GET',
        url: url,
        //  data: data,
        success: success,
        error: error,
        dataType: "json"
    });
};

load_data("http://localhost:3000/persons/1");

