var express=require('express'), stylus = require('stylus'), nib = require('nib'), app =express();

// my core library, has utilities to load to globally other js libs
var core=require('./my_node_libs/my_core');
// loading my debug functions for logging or inspect values
core.load_library_to_global("debug");

// configuring express.js to use jade, stylus/nib and public resources directory
app.configure(function(){
    function compile(str, path) {
        return stylus(str)
            .set('filename', path)
            .use(nib())
    }
    var __dirname=".";
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'this is a secret' }));
    app.use(stylus.middleware({
        src: __dirname + '/public',
        compile: compile
    }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

// configuring routes for person resource
var persons = require('./routes/persons_routes');
app.get('/persons', persons.find_all);
app.get('/persons/:id', persons.find_by_id);
app.delete('/persons/:id', persons.delete_by_id);
app.put('/persons/:id', persons.edit_by_id);
app.post('/persons', persons.add_new);

// configuring HOME
app.get('/',  function(req, res){res.render('index', {title:'Consilience Skill Test'});});


var port = process.env.PORT || 3000;
app.listen(port);
var mensaje="server is  listening in "+port;
log(mensaje);
