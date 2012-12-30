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
    form:{
        remove:function(id, _on_end, _on_error){
            core.ajax.form({form:"#person_edit", type:"delete", url:"/persons/"+id, on_end: _on_end, on_error:_on_error});
        },
        add:function(_on_end, _on_error){
            core.ajax.form({form:"#person_edit", type:"post", url:"/persons/", on_end: _on_end, on_error:_on_error});
        },
        edit:function(id, _on_end, _on_error){
            core.ajax.form({form:"#person_edit", type:"put", url:"/persons/"+id, on_end: _on_end, on_error:_on_error});
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
        ui:{
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
        localize:function(_lang){set_locale(_lang);}
    },
    render:{

        view: function(render_function){
            return render_function.call({});
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

/*
  function localize(lang_){
  set_locale(lang_);
  if(person_selected !== undefined){
  if(person_selected.get_id()!==0){
  load_person(person_selected.get_id(), last_action_selected);
  }else{
  new_person();
  }
  } else{
  include_main_div(Jaml.render('intro'));
  }

  }
*/

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
        console.log("setting prop");
    }else{
        console.log("prop exists");
}
 cache[the_dom_element]=_fn;
}
function render_in_dom(spec){  
    var the_function=spec.fn;
    var the_view=spec.view;
    var the_dom_element=spec.dom;
    var on_end=spec.on_end;


    var dom_element=check_dom_element(the_dom_element);
    console.log(the_dom_element+"\n---"+cache[the_dom_element]);


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

 $(document).ready(my_jaml.action.welcome_app);




