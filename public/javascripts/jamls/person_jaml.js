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

my_jaml.action.show_person_link=function(id){
    render_in_dom({fn:partial(api.person.load,id) ,view: 'person_show', dom:'.main-content'});
};

my_jaml.action.del_person_link=function (id){
    var on_end_delete_person= partial(api.ajax.form_remove, id,  
                                      function(){
                                          render_in_dom({fn:api.person.list, view:"person_list", dom:".sidebar"});
                                          render_in_dom({fn:partial(api.general.message, 'PERSON REMOVED') ,view:"message", dom:".main-content"});
                                      } 
                                     );
    render_in_dom({fn:partial(api.person.load,id), view:"person_remove", dom:".main-content", on_end:on_end_delete_person}); 
};

my_jaml.action.edit_person_link =function(id){
    var on_end_edit_person= partial(api.ajax.form_edit, id,  
                                    function(){
                                        render_in_dom({fn:api.person.list, view:"person_list", dom:".sidebar"});
                                        render_in_dom({fn:partial(api.general.message, 'PERSON EDITED OK!') ,view:"message", dom:".main-content"});
                                    } 
                                   );
    render_in_dom({fn:partial(api.person.load,id) ,view: 'person_edit', dom:'.main-content', on_end:on_end_edit_person});
}


Jaml.register('person_link', function(person){
    li(span(person.get_id()+" - "+person.get_fname()+" "+person.get_lname()) ,
       a({ href: '#', onclick:"my_jaml.action.show_person_link("+person.get_id()+");"}, 'show'),
       a({ href: '#', onclick:"my_jaml.action.edit_person_link("+person.get_id()+");"}, 'edit'),
       a({ href: '#', onclick:"my_jaml.action.del_person_link("+person.get_id()+");"}, 'del')
      )
});

my_jaml.action.add_person_link=function(){
render_in_dom({fn:api.person.new_person,view:'person_new', dom:'.main-content', on_end:insert_person_on_end});
};

Jaml.register('person_list', function(p) {
    //if(p)
    div({cls:'person'}, h1('Person List')),
    div(
        ul({cls:"ul_persons"}, Jaml.render('person_link', p.persons)
          ),
        a({ href: '#', 
           onclick:"my_jaml.action.add_person_link()"}, 'Add Person')

    ),
    div(Jaml.render('languages', PersonLocalized.prototype.lang));
});

function insert_person_on_end(){
    api.ajax.form({form:"#person_edit", type:"post", url:"/persons/", 
                   on_end: function(){
                       render_in_dom({fn:partial(api.general.message, 'PERSON INSERTED') ,view:"message", dom:".main-content"});
                       render_in_dom({fn:api.person.list, view:"person_list", dom:".sidebar"});
                   },
                   on_error: function(){
                       render_in_dom({fn:partial(api.general.message, 'AN ERROR HAS HAPPENED! :( ') ,view:"message", dom:".main-content"});
                       render_in_dom({fn:partial(api.general.message,' '), view:"message", dom:".sidebar"});
                   }
                  }
                 );

}

