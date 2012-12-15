var person_juan={
    id: 1,
    fname: "Static Juan",
    lname: "Ruz",
   DOB: "1976-06-13",
    wage: 100,
    location: "ES"
};


var fs = require('fs'),  xml2js = require('xml2js');
var __dirname="./data";


var parser = new xml2js.Parser();


var read_data =function (id){
    fs.readFile(__dirname + '/'+id+'.xml', function(err, data) {
        parser.parseString(data);
    });
};


exports.find_all=function (req, res) {
    res.send([person_juan, person_juan]);
};

exports.find_by_id= function(req, res){
    var asyncronous_response= function(res){
        return function(result){
            var person=result.person;
            res.send({id: person.id[0], fname : person.fname[0], lname: person.lname[0]});
        };
    };

    parser.addListener('end', asyncronous_response(res));

    read_data(req.params.id);

};


//    res.send({id:req.params.id, name: person.person.fname, description: person.person.lname});
//};


