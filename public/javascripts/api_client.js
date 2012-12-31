var api_client={ 
    binding:{
        crud_person_action:function(){
            $("a.show_person").bind({
                click:function(){api_client.action.show_person_link($(this).attr("person_id"));}
            });
            $("a.edit_person").bind({
                click:function(){api_client.action.edit_person_link($(this).attr("person_id"));}
            });
            $("a.del_person").bind({
                click:function(){api_client.action.del_person_link($(this).attr("person_id"));}
            });
            $("a.add_person").bind({
                click:function(){api_client.action.add_person_link();}
            });
        },
        start_person_cms:function(){
            $("a.start_cms_person").bind({
                click:function(){api_client.action.start();}
            });
        },
        languages:function(){
            $(".languages > a").bind({
                click: function(e) {
                    $(this).parent().children().removeClass('selected');
                    api.i18n.localize($(this).html());
                    //   if(cache[".sidebar"]!==undefined)
                    //     cache[".sidebar"]();
                    if(api_client.cache_funtions.cache[".main-content"]!==undefined)
                        api_client.cache_funtions.cache[".main-content"]();

                    //                       display_message_main_content(typeof 
                    //      reload_person_list_sidebar();
                    $(this).addClass('selected');     
                    e.preventDefault();
                }
            });
        },
        localize_form: function(){
            $('#location').val(PersonLocalized.prototype.lang);
            api_client.binding.addDatePicker("#DOB");
        },

        addDatePicker: function(id){
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
    },
    utility:{
        reload_person_list_sidebar:function(){
            api_client.render.function_in_dom_with_view({fn:api.person.list, view:"person_list", dom:".sidebar", on_end:function(){ 
                api_client.binding.languages.call(this); 
                api_client.binding.crud_person_action.call(this);}});
        },
        display_message_main_content:function(message){
            api_client.render.function_in_dom_with_view({fn:partial(api.general.message, message) ,view:"message", dom:".main-content"});
        },
        reload_persons_fn: function(message){
            return function(){
                api_client.utility.reload_person_list_sidebar();
                api_client.utility.display_message_main_content(message);
            }
        }
    },
    action:{
        welcome_app:function(){
            api_client.render.function_in_dom_with_view({fn:api.render.view, view:"welcome_app", dom:".main-content", on_end: api_client.binding.start_person_cms}); 
        },
        start:function(){
            api_client.render.function_in_dom_with_view({fn:api.render.view, view:"intro", dom:".main-content"}); 
            api_client.utility.reload_person_list_sidebar();
        },
        show_person_link:function(_id){
            api_client.render.function_in_dom_with_view({fn:partial(api.person.load, _id) ,view: 'person_show', dom:'.main-content'});
        },
        del_person_link:function (_id){
            var ajax_behavior= partial(api.ajax.form.behavior.remove,  
                                       api_client.utility.reload_persons_fn('PERSON REMOVED'),  
                                       api_client.utility.reload_persons_fn('AN ERROR HAS HAPPENED! :( '))
                .bind({form_id:"#person_edit", id:_id});
            api_client.render.function_in_dom_with_view({fn:partial(api.person.load,_id), view:"person_remove", dom:".main-content", on_end:ajax_behavior}); 
        },
        edit_person_link: function(_id){
            var ajax_behavior= partial(api.ajax.form.behavior.edit,
                                       api_client.utility.reload_persons_fn('PERSON EDITED OK'),  
                                       api_client.utility.reload_persons_fn('AN ERROR HAS HAPPENED! :( '))
                .bind({form_id:"#person_edit", id:_id});
            var on_end_fn=function(){
                ajax_behavior();
                api_client.binding.localize_form();
            };
            api_client.render.function_in_dom_with_view({fn:partial(api.person.load,_id) ,view: 'person_edit', dom:'.main-content', on_end:on_end_fn});
        },
        add_person_link: function(){
            var ajax_behavior=partial(api.ajax.form.behavior.add, 
                                      api_client.utility.reload_persons_fn('PERSON INSERTED OK'),  
                                      api_client.utility.reload_persons_fn('AN ERROR HAS HAPPENED! :( '))
                .bind({form_id:"#person_edit"});
            var on_end_fn=function(){
                ajax_behavior();
                api_client.binding.localize_form();
            };
            api_client.render.function_in_dom_with_view({fn:api.person.new_person,view:'person_new', dom:'.main-content', on_end:on_end_fn});
        }

    },
    cache_funtions:{
        cache:{},
        add: function (the_dom_element, _fn){
            if(api_client.cache_funtions.cache[the_dom_element]===undefined){
                //        console.log("setting prop");
            }else{
                //     console.log("prop exists");
            }
            api_client.cache_funtions.cache[the_dom_element]=_fn;
        }
        
    },
    render:{
        check_dom_element:function(the_element){
            var o=$(the_element);
            if (!o.length){ 
                alert("ERROR FATAL: dom element undefined: "+the_element);
                throw new Error("Something bad happened.");
            }
            return o;
        },
        /**
           f_function_in_dom_with_view apply in the_dom_element the result of the_function, with callback
           on_end_function_displayed 
           the_view is the template 
        **/

        function_in_dom_with_view: function(spec){  
            var the_function=spec.fn;
            var the_view=spec.view;
            var the_dom_element=spec.dom;
            var on_end=spec.on_end;


            var dom_element=api_client.render.check_dom_element(the_dom_element);
            //    console.log(the_dom_element+"\n---"+cache[the_dom_element]);

            var the_render_function=function(){
                api_client.render.smoth_paint(dom_element, Jaml.render(the_view, this.result), on_end);
            };

            // if(the_function.arguments)
            var args=[];

            //  the_function.arguments.push(the_render_function);
            args.push(the_render_function);

            the_function.apply(this, args);
            //final_fn.call(this);

            api_client.cache_funtions.add(the_dom_element, function(){the_function.apply(this, args);});


        },
        smoth_paint:function(e, r, on_end){
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
    }
};

$(document).ready(api_client.action.welcome_app);
