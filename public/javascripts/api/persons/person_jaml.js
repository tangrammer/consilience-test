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

Jaml.register('person_json', function(person) {
    var data=person.data+" ";
    div(
        h1({cls:'result_action'}, "Show JSON Person: "+person.get_fname()+" "+person.get_lname()),
        div(JSON.stringify(person)));


});

Jaml.register('person_link', function(person){

    li(span(person.get_id()+" - "+person.get_fname()+" "+person.get_lname()) ,
       a({ href: '#', cls:'show_person',   person_id:person.get_id()}, 'show'),
       a({ href: '#', cls:'edit_person',   person_id:person.get_id()}, 'edit'),
       a({ href: '#', cls:'del_person',   person_id:person.get_id()}, 'del'),
    a({ href: '#', cls:'json_person',   person_id:person.get_id()}, 'json')
      )
});

Jaml.register('person_list', function(p) {
    div({cls:'person'}, h1('Person List: ')),
    div(
        ul({cls:"ul_persons"}, Jaml.render('person_link', p.persons)
          ),
        a({ href: '#', cls:'add_person'}, 'Add Person')
    ),
    div(Jaml.render('languages', PersonLocalized.prototype.lang));
});




