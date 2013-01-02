var ui_helper={
    message: function(message, render_function){
        return render_function.call({result:message});  
    },
    simple_view: function(render_function){
            return render_function.call({});
        }
};
var ui_actions={ 
    reload_person_list_sidebar:function(){
        ui.function_in_dom_with_view({fn:person_entity.list, view:"person_list", dom:".sidebar", on_end:function(){ 
            ui_bindings.languages.call(this); 
            ui_bindings.crud_person_action.call(this);}});
    },
    display_message_main_content:function(message){
        ui.function_in_dom_with_view({fn:partial(ui_helper.message, message) ,view:"message", dom:".main-content"});
    },
    reload_persons_fn: function(message){
        return function(){
            ui_actions.reload_person_list_sidebar();
            ui_actions.display_message_main_content(message);
        }
    },
    welcome_app:function(){
        ui.function_in_dom_with_view({fn:ui_helper.simple_view, view:"welcome_app", dom:".main-content", on_end: ui_bindings.start_person_cms}); 
    },
    start:function(){
        ui.function_in_dom_with_view({fn:ui_helper.simple_view, view:"intro", dom:".main-content"}); 
        this.reload_person_list_sidebar();
    },
    show_person_link:function(_id){
        ui.function_in_dom_with_view({fn:partial(person_entity.load, _id) ,view: 'person_show', dom:'.main-content'});
    },
    del_person_link:function (_id){
        var ajax_behavior= partial(ajax.form_restful_behavior.remove,  
                                   this.reload_persons_fn('PERSON REMOVED'),  
                                   this.reload_persons_fn('AN ERROR HAS HAPPENED! :( '))
            .bind({form_id:"#person_edit", id:_id, url:"/persons/"});
        ui.function_in_dom_with_view({fn:partial(person_entity.load,_id), view:"person_remove", dom:".main-content", on_end:ajax_behavior}); 
    },
    edit_person_link: function(_id){
        var ajax_behavior= partial(ajax.form_restful_behavior.edit,
                                   this.reload_persons_fn('PERSON EDITED OK'),  
                                   this.reload_persons_fn('AN ERROR HAS HAPPENED! :( '))
            .bind({form_id:"#person_edit", id:_id, url:"/persons/"});
        var on_end_fn=function(){
            ajax_behavior();
            ui_bindings.localize_form();
        };
        ui.function_in_dom_with_view({fn:partial(person_entity.load,_id) ,view: 'person_edit', dom:'.main-content', on_end:on_end_fn});
    },
    add_person_link: function(){
        var ajax_behavior=partial(ajax.form_restful_behavior.add, 
                                  this.reload_persons_fn('PERSON INSERTED OK'),  
                                  this.reload_persons_fn('AN ERROR HAS HAPPENED! :( '))
            .bind({form_id:"#person_edit", url:"/persons/"});
        var on_end_fn=function(){
            ajax_behavior();
            ui_bindings.localize_form();
        };
        ui.function_in_dom_with_view({fn:person_entity.new_person,view:'person_new', dom:'.main-content', on_end:on_end_fn});
    },
    localize:function(_lang){set_locale(_lang);}
};
