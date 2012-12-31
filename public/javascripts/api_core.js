
var core={
    ajax:{
        simple:function(_url,caller){
            $.ajax({url: _url, cache: false}).done(caller);
        },
        form:function (spec){
            var options = { 
                type: spec.type, 
                url: spec.url,
                beforeSubmit: function(arr, $form, options) {  
                    $(spec.form).fadeOut("slow") ;
                    // return false
                    // to cancel submit       
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert(errorThrown+"- "+textStatus);
                },
                success: function(html) { 
                    if(spec.on_end!==undefined){
                        //    alert("calling SUCCESS "+spec.on_end);
                        if(html.error!==undefined){
                            if(spec.on_error!==undefined){
                                spec.on_error.call(this);                            
                            } else{
                                alert("oh! an error dont catched  :( ")
                            }
                        }else{
                            spec.on_end.call(this);
                        }
                    }
                }
            };
            $(spec.form).ajaxForm(options) ;
        }
    }
};


var api={
    ajax:{
        form:{
            behavior:{
                base:function(_form, _type, _url, _on_end, _on_error){
                      core.ajax.form({form:_form, type:_type, url:_url, on_end: _on_end, on_error:_on_error});
                },
                remove:function( _on_end, _on_error){
                    api.ajax.form.behavior.base(this.form_id, "delete", "/persons/"+this.id, _on_end, _on_error);
                },
                add:function(_on_end, _on_error){
                    api.ajax.form.behavior.base(this.form_id, "post", "/persons/", _on_end, _on_error);
                },
                edit:function( _on_end, _on_error){
                    api.ajax.form.behavior.base(this.form_id, "put", "/persons/"+this.id, _on_end, _on_error);
                }
            } 
        }
    },
    dao:{
        persons:function(caller){
            core.ajax.simple('/persons', caller);              
        },
        person:function(id, caller){
            core.ajax.simple('/persons/'+id, caller);  
        }
    },
    person:{
        load:function(id, apply_function){
            var _caller=function(person){
                person_selected=internationalize(create_person(person));
                apply_function.call({result:person_selected});
            }
            api.dao.person(id, _caller);
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
            api.dao.persons(_caller);
        }
    },
    general:{
        message:function(message, apply_function){
            return apply_function.call({result:message});  
        }
    },
    
    i18n:{
        localize:function(_lang){set_locale(_lang);}
    },
    render:{

        view: function(render_function){
            return render_function.call({});
        }

    }
    
};



