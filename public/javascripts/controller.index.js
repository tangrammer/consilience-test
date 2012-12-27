function templating(template, model){
    return Jaml.render(template, model);
}
var contexts={
    ajax:{
        form:function (spec){
            alert("ajax_form");
            var options = { 
                type: spec.type, 
                url: spec.url,
                //  beforeSubmit: function(arr, $form, options) {  // alert($("#wage").val());       // return false to cancel submit       // },
                success: function(html) { 
                    if(spec.on_end!==undefined){
                        spec.on_end.call(this);
                    }
                }
            };
            $(spec.form).ajaxForm(options) ; 
        },
        form_remove:function(_on_end){
            contexts.ajax.form({form:"person_edit", type:"delete", url:"/persons/", on_end: _on_end});
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
        form_remove: function(){
            delete_person();
        },
        binding_languages:function(){
            $(".languages > a").bind({
                click: function(e) {
                    $(this).parent().children().removeClass('selected');
                    localize($(this).html());
                    $(this).addClass('selected');     
                    e.preventDefault();
                }
            });
        },
        binding_person_links:function(){ 
            $("."+names_id.person_detail_anchor).bind({
                click: function(e) {
                    load_person($(e.target).attr(names_id.attr_person_id), 'show');
                    e.preventDefault();
                }
            });
            $("."+names_id.person_edit_anchor).bind({
                click: function(e) {
                    load_person($(e.target).attr(names_id.attr_person_id),'edit');
                    e.preventDefault();
                }
            });
            $("."+names_id.person_del_anchor).bind({
                click: function(e) {
                    load_person($(e.target).attr(names_id.attr_person_id),'remove');
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
        intro: function(apply_function){
            return apply_function.call({});
        }
    },
    person:{
        load:function(id, apply_function){
//            TODO   last_action_selected=action;
            var _caller=function(person){
                person_selected=internationalize(create_person(person));
                apply_function.call({result:person_selected});
            }
            contexts.dao_ajax.person(id, _caller);
        },
        list:function(apply_function){
            var _caller= function( persons ) {
                var ps=[];
                for(var i =0; i<persons.length; i++){
                    ps.push(internationalize(create_person(persons[i])));
                }
                ps={persons:ps};
                              apply_function.call({result:ps});
            };
            this.contexts.dao_ajax.persons(_caller);
        }
    }
    
};

function check_function(the_function){
    var the_args=[];
    if(the_function.indexOf("(")>0){
       the_args=the_function.substring((the_function.indexOf("(")+1), the_function.indexOf(")")).split(",");
        the_function=the_function.substring(0, (the_function.indexOf("(")));
    }
    var url_function=the_function.split(".");

    var function_mapper=contexts;
    for(var i=0; i<url_function.length; i++){
        var check_key=url_function[i];
        var step=function_mapper[check_key];
        if(step===undefined){
            alert("ERROR FATAL: trying to call a undefined function: "+check_key+" in "+ url_function);
            return;
        }else{
            function_mapper=step;
        }
    }
    return {fn:function_mapper, args:the_args};  
}

function check_dom_element(the_element){
    var o=$(the_element);
    if (!o.length){ 
        alert("ERROR FATAL: dom element undefined: "+the_element);
        throw new Error("Something bad happened.");
    }
    return o;
}


function smoth_paint(e, r, on_end){
   
    e
        .html("<br>Loading")
        .fadeOut("slow", function(){
            $(this).html(r+"<br>")
                .fadeIn("slow", function(){
                    if(on_end){
                        on_end.fn.apply(this, on_end.args);
                    }
                }
                       );});
}

/**
   apply in the_dom_element the result of the_function, with callback
   on_end_function_displayed 
**/
function my_apply(the_function,the_template, the_dom_element, on_end){  
 var register_function=check_function(the_function);
   if(on_end)
       on_end=check_function(on_end);

    var dom_element=check_dom_element(the_dom_element);

    var the_apply_function=function(){
        //, on_end
        smoth_paint(dom_element, templating(the_template, this.result), on_end);
    };
    register_function.args.push(the_apply_function);

    register_function.fn.apply(this, register_function.args);
}








