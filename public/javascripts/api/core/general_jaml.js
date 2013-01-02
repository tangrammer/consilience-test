Jaml.register('languages', function(lang){
    hr(),
    div({cls:"languages" },
        a({cls:'US'==lang?'selected':'', href:'#'}, 'US'),
        a({cls:'UK'==lang?'selected':'',href:'#'}, 'UK'),
        a({cls:'AU'==lang?'selected':'',href:'#'}, 'AU'))
    
});


Jaml.register('intro', function(){

    div(
        h1({cls:'intro'},  'Person Mangement Zone. (Locale: '+PersonLocalized.prototype.lang+')'),
        p(
            span("Welcome, from this page you can edit the info related to persons. Use the right sidebar to select an existent row or add a new one"),
            br()
        )
    );
});
Jaml.register('message', function(m){
    div(
        h1({cls:'intro'},  m)
    );
});
Jaml.register('welcome_app', function (){
    div({clj:".welcome"},
       p("The point of this assessment is demonstrate skills with JS, JSON, XML and basic RESTful interaction. " ,
        br(),a({href:'#', cls:'start_cms_person'}, "start cms persons")))}
); 


