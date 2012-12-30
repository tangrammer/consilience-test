function templating(template, model){
    return Jaml.render(template, model);
}

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
    ui:{
        binding_crud_person_action:function(){
            $("a.show_person").bind({
                click:function(){view.action.show_person_link($(this).attr("person_id"));}
                }
            );
            $("a.edit_person").bind({
                click:function(){view.action.edit_person_link($(this).attr("person_id"));}
                }
            );
            $("a.del_person").bind({
                click:function(){view.action.del_person_link($(this).attr("person_id"));}
                }
            );
            $("a.add_person").bind({
                click:function(){view.action.add_person_link();}
                }
            );
        },
        binding_start_person_cms:function(){
            $("a.start_cms_person").bind({
                click:function(){view.action.start();}
                }
            );
        },
        binding_languages:function(){
            $(".languages > a").bind({
                click: function(e) {
                    $(this).parent().children().removeClass('selected');
                    api.i18n.localize($(this).html());
                    //   if(cache[".sidebar"]!==undefined)
                    //     cache[".sidebar"]();
                    if(cache[".main-content"]!==undefined)
                        cache[".main-content"]();

                    //                       display_message_main_content(typeof 
                    //      reload_person_list_sidebar();
                    $(this).addClass('selected');     
                    e.preventDefault();
                }
            });
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
var utility_view={
    reload_person_list_sidebar:function(){
        render_in_dom({fn:api.person.list, view:"person_list", dom:".sidebar", on_end:function(){ api.ui.binding_languages.call(this); api.ui.binding_crud_person_action.call(this);}});
    },
    display_message_main_content:function(message){
        render_in_dom({fn:partial(api.general.message, message) ,view:"message", dom:".main-content"});
    },
    reload_persons_fn: function(message){
        return function(){
            utility_view.reload_person_list_sidebar();
            utility_view.display_message_main_content(message);
        }
    }
}



var view={
    action:{
        welcome_app:function(){
          render_in_dom({fn:api.render.view, view:"welcome_app", dom:".main-content", on_end: api.ui.binding_start_person_cms}); 
        },
        start:function(){
          render_in_dom({fn:api.render.view, view:"intro", dom:".main-content"}); 
            utility_view.reload_person_list_sidebar();
        },
        show_person_link:function(_id){
            render_in_dom({fn:partial(api.person.load, _id) ,view: 'person_show', dom:'.main-content'});
        },
        del_person_link:function (_id){
            var ajax_behavior= partial(api.ajax.form.behavior.remove,  
                                       utility_view.reload_persons_fn('PERSON REMOVED'),  
                                       utility_view.reload_persons_fn('AN ERROR HAS HAPPENED! :( '))
                .bind({form_id:"#person_edit", id:_id});
            render_in_dom({fn:partial(api.person.load,_id), view:"person_remove", dom:".main-content", on_end:ajax_behavior}); 
        },
        edit_person_link: function(_id){
            var ajax_behavior= partial(api.ajax.form.behavior.edit,
                                       utility_view.reload_persons_fn('PERSON EDITED OK'),  
                                       utility_view.reload_persons_fn('AN ERROR HAS HAPPENED! :( '))
                .bind({form_id:"#person_edit", id:_id});
            render_in_dom({fn:partial(api.person.load,_id) ,view: 'person_edit', dom:'.main-content', on_end:ajax_behavior});
        },
        add_person_link: function(){
            var ajax_behavior=partial(api.ajax.form.behavior.add, 
                                      utility_view.reload_persons_fn('PERSON INSERTED OK'),  
                                      utility_view.reload_persons_fn('AN ERROR HAS HAPPENED! :( '))
                .bind({form_id:"#person_edit"});
            render_in_dom({fn:api.person.new_person,view:'person_new', dom:'.main-content', on_end:ajax_behavior});
        }

    }
};






function localize_form(){
    $('#location').val(PersonLocalized.prototype.lang);
    addDatePicker("#DOB");
}

function addDatePicker(id){
    $(function() {
        var lang=PersonLocalized.prototype.lang;

        $("#DOB").datepicker({ 
            currentText:"juuu",
            dateFormat: date_formats[lang] ,
            onSelect:function(s, o){
                // alert('ey'+s+"---"+lang);
                //to change the last value this.value="ja";
                
            }
        }
                            );
    });
}


function check_dom_element(the_element){
    var o=$(the_element);
    if (!o.length){ 
        alert("ERROR FATAL: dom element undefined: "+the_element);
        throw new Error("Something bad happened.");
    }
    return o;
}



/**
   f_in_dom apply in the_dom_element the result of the_function, with callback
   on_end_function_displayed 
   the_view is the template 
**/
var cache={};
function add_cache_value(the_dom_element, _fn){
    if(cache[the_dom_element]===undefined){
//        console.log("setting prop");
    }else{
   //     console.log("prop exists");
}
 cache[the_dom_element]=_fn;
}
function render_in_dom(spec){  
    var the_function=spec.fn;
    var the_view=spec.view;
    var the_dom_element=spec.dom;
    var on_end=spec.on_end;


    var dom_element=check_dom_element(the_dom_element);
//    console.log(the_dom_element+"\n---"+cache[the_dom_element]);


    var the_render_function=function(){
        smoth_paint(dom_element, templating(the_view, this.result), on_end);
    };
    var args=[];
    // if(the_function.arguments)

    args.push(the_render_function);
    //  the_function.arguments.push(the_render_function);

    the_function.apply(this, args);
    add_cache_value(the_dom_element, function(){the_function.apply(this, args);});
    //final_fn.call(this);

}


function smoth_paint(e, r, on_end){
    e
        .html("<br>Loading")
        .fadeOut("slow", function(){
            $(this).html(r+"<br>")
                .fadeIn("slow", function(){
                    if(on_end){
                        on_end.call(this);
                    }
                }
                       );});
}

 $(document).ready(view.action.welcome_app);




