var dao={
    persons:function(caller){
        ajax.simple('/persons', caller);              
    },
    person:function(id, caller){
        ajax.simple('/persons/'+id, caller);  
    }
};
var person_entity={
    load:function(id, apply_function){
        var _caller=function(person){
            person_selected=internationalize(create_person(person));
            apply_function.call({result:person_selected});
        }
        dao.person(id, _caller);
    },
    new_person:function(apply_function){
        person_selected=internationalize(create_person(data_person_example));
        apply_function.call({result:person_selected});
    },
    list:function(render_function){
        var _caller= function( persons ) {
            var ps=[];
            for(var i =0; i<persons.length; i++){
                ps.push(internationalize(create_person(persons[i])));
            }
            ps={persons:ps};
            render_function.call({result:ps});
        };
        dao.persons(_caller);
    }
};
