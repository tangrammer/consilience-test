function reload_person_list_sidebar(){
    render_in_dom({fn:api.person.list, view:"person_list", dom:".sidebar", on_end:api.i18n.ui.binding_languages});
};

function display_message_main_content(message){
  render_in_dom({fn:partial(api.general.message, message) ,view:"message", dom:".main-content"});
}
function reload_persons_fn(message){
    return function(){
        reload_person_list_sidebar();
        display_message_main_content(message);
    };
}

my_jaml.action.show_person_link=function(id){
    render_in_dom({fn:partial(api.person.load, id) ,view: 'person_show', dom:'.main-content'});
};

my_jaml.action.del_person_link=function (id){
    var form_behavior_delete_person_fn= partial(api.form.remove, id,  reload_persons_fn('PERSON REMOVED'),  reload_persons_fn('AN ERROR HAS HAPPENED! :( '));
    render_in_dom({fn:partial(api.person.load,id), view:"person_remove", dom:".main-content", on_end:form_behavior_delete_person_fn}); 
};


my_jaml.action.edit_person_link =function(id){
    var form_behavior_edit_person_fn= partial(api.form.edit, id,  reload_persons_fn('PERSON EDITED OK'),  reload_persons_fn('AN ERROR HAS HAPPENED! :( '));
    render_in_dom({fn:partial(api.person.load,id) ,view: 'person_edit', dom:'.main-content', on_end:form_behavior_edit_person_fn});
}
 
my_jaml.action.add_person_link=function(){
    var form_behavior_add_person_fn=partial(api.form.add, reload_persons_fn('PERSON INSERTED OK'),  reload_persons_fn('AN ERROR HAS HAPPENED! :( '));
    render_in_dom({fn:api.person.new_person,view:'person_new', dom:'.main-content', on_end:form_behavior_add_person_fn});
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
             input({type: 'submit', value: 'Edit'})
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

Jaml.register('person_link', function(person){
    li(span(person.get_id()+" - "+person.get_fname()+" "+person.get_lname()) ,
       a({ href: '#', onclick:"my_jaml.action.show_person_link("+person.get_id()+");"}, 'show'),
       a({ href: '#', onclick:"my_jaml.action.edit_person_link("+person.get_id()+");"}, 'edit'),
       a({ href: '#', onclick:"my_jaml.action.del_person_link("+person.get_id()+");"}, 'del')
      )
});

Jaml.register('person_list', function(p) {
    div({cls:'person'}, h1('Person List: ')),
    div(
        ul({cls:"ul_persons"}, Jaml.render('person_link', p.persons)
          ),
        a({ href: '#', 
            onclick:"my_jaml.action.add_person_link()"}, 'Add Person')
    ),
    div(Jaml.render('languages', PersonLocalized.prototype.lang));
});




