var names_id={
    _main_content_div:".main-content",
    _widget_div:".widget",
    person_detail_anchor:"person_detail",
    __welcome_div:".welcome", 
    person_edit_anchor:"person_edit",
    person_del_anchor:"person_remove",
    person_insert_anchor:"person_insert",
    attr_person_id:"person_id"

};



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


