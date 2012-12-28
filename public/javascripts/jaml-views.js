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
Jaml.register('person_edit', function(person) {
    div({cls: 'person'},
        h1("Edit Person: "+person.get_fname()+" "+person.get_lname()),
        form({id:"person_edit"},
            input({type: 'hidden', name: 'id', id: 'id', value: person.get_id()}),
            label({for: 'fname'}, "First Name: "),
            input({type: 'text', name: 'fname', id: 'fname', value: person.get_fname()}),
            br(),
            label({for: 'lname'}, "Last Name: "),
            input({type: 'text', name: 'lname', id: 'lname', value: person.get_lname()}),
            br(),
            label({for: 'DOB'}, "Date Of Birth: "),
            input({type: 'text', name: 'DOB', id: 'DOB', value: person.get_DOB()}),
            br(),
            label({for: 'wage'}, "Wage: "),
            input({type: 'text', name: 'wage', id: 'wage', value: person.get_wage()}),
            br(),
            label({for: 'location'}, "Location: "),
            select({name: 'location', id: 'location'},
                  option({value:'US'}, 'US'),
                  option({value:'UK'}, 'UK'),
                  option({value:'AU'}, 'AU')
                 ),
            br(),
            input({type: 'submit', value: 'Edit', onclick:'edit_person();'})
        )
       );

});

Jaml.register('person_new', function(person) {
    div({cls: 'person'},
        h1("Inserting New Person "),
   form({id:"person_edit"},
            input({type: 'hidden', name: 'id', id: 'id', value: person.get_id()}),
            label({for: 'fname'}, "First Name: "),
            input({type: 'text', name: 'fname', id: 'fname', value: person.get_fname()}),
            br(),
            label({for: 'lname'}, "Last Name: "),
            input({type: 'text', name: 'lname', id: 'lname', value: person.get_lname()}),
            br(),
            label({for: 'DOB'}, "Date Of Birth: "),
            input({type: 'text', name: 'DOB', id: 'DOB', value: person.get_DOB()}),
            br(),
            label({for: 'wage'}, "Wage: "+person.get_wage_symbol()),
            input({type: 'text', name: 'wage', id: 'wage', value: person.get_wage()}),
            br(),
            label({for: 'location'}, "Location: "),
            select({name: 'location', id: 'location'},
                  option({value:'US'}, 'US'),
                  option({value:'UK'}, 'UK'),
                  option({value:'AU'}, 'AU')
                 ),
            br(),
            input({type: 'submit', value: 'Insert'})
        )
       );

});

Jaml.register('person_show_base', function(person) {
    div({cls: 'person'},
        
        label({for: 'fname'}, "First Name: "),
        span( person.get_fname()),
        br(),
        label({for: 'lname'}, "Last Name: "),
        span( person.get_lname()),
        br(),
        label({for: 'DOB'}, "Date Of Birth: "),
        span( person.get_DOB()),
        br(),
        label({for: 'wage'}, "Wage: "),
        span( person.get_wage()),
        br(),
        label({for: 'location'}, "Location: "),
        span( person.get_location()),
        br()
       );
});


Jaml.register('person_remove', function(person) {
    div({cls: 'person'},
        h1("Are you sure to remove to...? "),
        label({for: 'fname'}, "First Name: "),
        span( person.get_fname()),
        br(),
        label({for: 'lname'}, "Last Name: "),
        span( person.get_lname()),
        br(),
        form({id:"person_edit"},
            input({type: 'hidden', name: 'id', id: 'id', value: person.get_id()}),
            input({type: 'submit', value: 'REMOVE'})
        )
        

                
       );

});
Jaml.register('person_removed', function() {
    div(
        h1({cls:'result_action'},'Person removed Correctly!')
)
           
});


Jaml.register('person_edited', function(person) {
    div(
        h1({cls:'result_action'},'Edition Correct!'),
           Jaml.render('person_show_base', person));
});
Jaml.register('person_created', function(person) {
    div(
        h1({cls:'result_action'},'Inserting Correct!'),
           Jaml.render('person_show_base', person));
});

Jaml.register('person_show', function(person) {
    div(
        h1({cls:'result_action'}, "Show Person: "+person.get_fname()+" "+person.get_lname()),

           Jaml.render('person_show_base', person));
});




Jaml.register('languages', function(lang){
    hr(),
    div({cls:"languages" },
        a({cls:'US'==lang?'selected':'', href:'#'}, 'US'),
        a({cls:'UK'==lang?'selected':'',href:'#'}, 'UK'),
        a({cls:'AU'==lang?'selected':'',href:'#'}, 'AU'))
   
});

function delet_person_link(id){
function on_end_load_person_to_delete(){
    api.ajax.form({form:"#person_edit", type:"delete", url:"/persons/"+$('#id').val(), template:'person_removed', 
                   on_end: function(){
                       render_in_dom({fn:api.person.list, view:"widget", dom:".sidebar"});
                       render_in_dom({fn:partial(api.general.message, 'PERSON REMOVED') ,view:"message", dom:".main-content"});
                   } 
                  });
}

    render_in_dom({fn:partial(api.person.load,id), view:"person_remove", dom:".main-content", on_end:on_end_load_person_to_delete}); 
};

function show_person_link(id){
    render_in_dom({fn:partial(api.person.load,id) ,view: 'person_show', dom:'.main-content'});
}
function edit_person_link(id){
    render_in_dom({fn:partial(api.person.load,id) ,view: 'person_edit', dom:'.main-content'});
}


Jaml.register('person_link', function(person){
        li(span(person.get_fname()+" "+person.get_lname()) ,
       a({cls: names_id.person_detail_anchor, href: '#', onclick:"show_person_link("+person.get_id()+");"}, 'show'),
       a({cls: names_id.person_detail_anchor, href: '#', onclick:"edit_person_link("+person.get_id()+");"}, 'edit'),
       a({cls: names_id.person_detail_anchor, href: '#', onclick:"delet_person_link("+person.get_id()+");"}, 'del')
)
});

Jaml.register('widget', function(p) {
  //if(p)
    div({cls:'person'}, h1('Person List')),
    div(
        ul({cls:"ul_persons"}, Jaml.render('person_link', p.persons)
          ),
a({cls: names_id.person_insert_anchor, href: '#', 
onclick:"render_in_dom({fn:api.person.new_person,view:'person_new', dom:'.main-content', on_end:insert_person_on_end})"}, 'Add Person')

    ),
 div(Jaml.render('languages', PersonLocalized.prototype.lang));
});

function insert_person_on_end(){
    api.ajax.form({form:"#person_edit", type:"post", url:"/persons/", 
                   on_end: function(){
                       render_in_dom({fn:partial(api.general.message, 'PERSON INSERTED') ,view:"message", dom:".main-content"});
                       render_in_dom({fn:api.person.list, view:"widget", dom:".sidebar"});
                   }}
                 );

}

Jaml.register('intro', function(){

    div(
        h1({cls:'intro'},  'Person Mangement Zone. (Locale: '+PersonLocalized.prototype.lang+')'),
        p(
            span("Welcome, from this page you can edit the info related to persons. Use the right sidebar to select an existent row or add a new one"),
            br(),
        a({cls: names_id.person_insert_anchor, href: '#', 
onclick:"render_in_dom({fn:api.person.new_person,view:'person_new', dom:'.main-content', on_end:insert_person_on_end})"}, 'Add Person')
)
    );
});
Jaml.register('message', function(m){
    div(
        h1({cls:'intro'},  m)
    );
});



