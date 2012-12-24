Jaml.register('person', function(person) {
  div({cls: 'person'},
    h1(person.fname),
    form(
      label({for: 'fname'}, "Quantity"),
      input({type: 'text', name: 'fname', id: 'fname', value: person.get_id()}),
      br(),
      label({for: 'DOB'}, "DOB"),
      input({type: 'text', name: 'DOB', id: 'DOB', value: person.get_DOB()}),
      br(),
      input({type: 'submit', value: 'Edit'})
    )
  );

});


Jaml.register('languages', function(lang){
div({cls:"languages" },
a({cls:'US'==lang?'selected':'', href:'#',onclick:"localize(&#39;US&#39;);"}, 'US'),
a({cls:'UK'==lang?'selected':'',href:'#', onclick:"localize(&#39;UK&#39;);"}, 'UK'),
a({cls:'AU'==lang?'selected':'',href:'#', onclick:"localize(&#39;AU&#39;);"}, 'AU')),
hr()
});
Jaml.register('person_link', function(person){
       li(span(person.get_fname()+" "+person.get_lname()) ,a({cls: 'person_detail', href: '#', person_id:person.get_id()}, 'edit'))
});

Jaml.register('widget', function(p) {
div(Jaml.render('languages', PersonLocalized.prototype.lang))
h1('Persons List'),
div(
ul({cls:"ul_persons"},
Jaml.render('person_link', p.persons)
)
);
});

Jaml.register('intro', function(){
div("intro");
});
