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
        $("a.json_person").bind({
            click:function(){ui_actions.json_person_link($(this).attr("person_id"));}

        });
    },
    start_person_cms:function(){
        $("a.start_cms_person").bind({
            click:function(){ui_actions.start();}
        });
    },
    refresh_on_change_location:function(id_div){
              // refresh cache: divs i18n related
                if(ui.cache_funtions.cache[id_div]!==undefined)
                    ui.cache_funtions.cache[id_div]();

    },
    languages:function(){
        $(".languages > a").bind({
            click: function(e) {
                $(this).parent().children().removeClass('selected');
                ui_actions.localize($(this).html());

                
                ui_bindings.refresh_on_change_location(".main-content");  

                $(this).addClass('selected');     
                e.preventDefault();
            }
        });
    },
    localize_form: function(){
        $('#location').val(PersonLocalized.prototype.lang);
        $('#location').change(this.on_change_location);
        this.addDatePicker("#DOB");
        
        
    },
    on_change_location:function(){
        var lang=$('#location').val();
              $( "#dialog" ).dialog();

        ui_actions.localize(lang);        

                ui_bindings.refresh_on_change_location(".main-content");
                ui_bindings.refresh_on_change_location(".sidebar");


    },
    addDatePicker: function(id){
        $(function() {
            var lang=PersonLocalized.prototype.lang;

            $("#DOB").datepicker({ 
            
                dateFormat: ui_date_formats[lang] ,
                onSelect:function(s, o){
                    // alert('ey'+s+"---"+lang);
                    //to change the last value this.value="ja";
                }
            }
                                );
        });
    }
}
