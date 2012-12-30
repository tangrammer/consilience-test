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

var my_jaml={
    action:{
        start:function(){
          render_in_dom({fn:api.welcome.intro, view:"intro", dom:".main-content"}); 
          render_in_dom({fn:api.person.list, view:"person_list", dom:".sidebar", on_end:api.i18n.ui.binding_languages});
            
        }
    }
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
            br(),
            a({cls: names_id.person_insert_anchor, href: '#', 
               onclick:"my_jaml.action.add_person_link()"}, 'Add Person')
        )
    );
});
Jaml.register('message', function(m){
    div(
        h1({cls:'intro'},  m)
    );
});



