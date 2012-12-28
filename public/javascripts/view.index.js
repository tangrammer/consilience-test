var person_selected, last_action_selected;

function localize_form(){
    $('#location').val(PersonLocalized.prototype.lang);
    addDatePicker("#DOB");
}

//function edit_person(){
 //   alert("edit_persion");
//    action_person({action:'edit', type:'post',url:'/persons', template:'person_edited', form:'#person_edit'});
//}


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
