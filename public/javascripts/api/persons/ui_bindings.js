var ui_bindings={ 
    crud_person_action:function(){
        $("a.show_person").bind({
            click:function(){ui_actions.show_person_link($(this).attr("person_id"));}
        });
        $("a.edit_person").bind({
            click:function(){ui_actions.edit_person_link($(this).attr("person_id"));}
        });
        $("a.del_person").bind({
            click:function(){ui_actions.del_person_link($(this).attr("person_id"));}
        });
        $("a.add_person").bind({
            click:function(){ui_actions.add_person_link();}
        });
    },
    start_person_cms:function(){
        $("a.start_cms_person").bind({
            click:function(){ui_actions.start();}
        });
    },
    languages:function(){
        $(".languages > a").bind({
            click: function(e) {
                $(this).parent().children().removeClass('selected');
                ui_actions.localize($(this).html());

                

                // refresh cache: divs i18n related
                if(ui.cache_funtions.cache[".main-content"]!==undefined)
                    ui.cache_funtions.cache[".main-content"]();

                //                       display_message_main_content(typeof 
                //      reload_person_list_sidebar();
                $(this).addClass('selected');     
                e.preventDefault();
            }
        });
    },
    localize_form: function(){
        $('#location').val(PersonLocalized.prototype.lang);
        this.addDatePicker("#DOB");
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
}
