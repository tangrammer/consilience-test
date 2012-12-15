var express=require('express');
var app =express();
var persons = require('./routes/persons');
app.get('/persons', persons.find_all);
app.get('/persons/:id', persons.find_by_id);

app.listen(3000);
console.log("server listen in 3000");
