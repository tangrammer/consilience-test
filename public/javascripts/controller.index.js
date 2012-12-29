function templating(template, model){
    return Jaml.render(template, model);
}
var api={
    ajax:{
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
        },
        form_remove:function(id, _on_end){
            api.ajax.form({form:"#person_edit", type:"delete", url:"/persons/"+id, on_end: _on_end});
        },
        form_add:function(_on_end){
            api.ajax.form({form:"#person_edit", type:"post", url:"/persons/", on_end: _on_end});
        },
        form_edit:function(id, _on_end){
            api.ajax.form({form:"#person_edit", type:"put", url:"/persons/"+id, on_end: _on_end});
        }

    },
    dao_ajax:{
        ajax:function(_url,caller){
            $.ajax({url: _url, cache: false}).done(caller);
        },
        persons:function(caller){
            this.ajax('/persons', caller);              
        },
        person:function(id, caller){
            this.ajax('/persons/'+id, caller);  
        }
    },
    ui:{

        binding_languages:function(){
            $(".languages > a").bind({
                click: function(e) {
                    $(this).parent().children().removeClass('selected');
                    localize($(this).html());
                    $(this).addClass('selected');     
                    e.preventDefault();
                }
            });
        }
    },
    general:{
        hw:function(apply_function){
            return apply_function.call({result:"Hello World"});  

        },
        message:function(message, apply_function){
            return apply_function.call({result:message});  
        },
    },
    welcome:{
        intro: function(render_function){
            return render_function.call({});
        }
    },
    person:{
        load:function(id, apply_function){
//            TODO   last_action_selected=action;
           
            var _caller=function(person){
                person_selected=internationalize(create_person(person));
                apply_function.call({result:person_selected});
            }
            api.dao_ajax.person(id, _caller);
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
            this.api.dao_ajax.persons(_caller);
        }
    }
    
};

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
function render_in_dom(spec){  
    var the_function=spec.fn;
    var the_view=spec.view;
    var the_dom_element=spec.dom;
    var on_end=spec.on_end;


    var dom_element=check_dom_element(the_dom_element);

    var the_render_function=function(){
        smoth_paint(dom_element, templating(the_view, this.result), on_end);
    };
   var args=[];
   // if(the_function.arguments)

    args.push(the_render_function);
//  the_function.arguments.push(the_render_function);
  the_function.apply(this, args);
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







