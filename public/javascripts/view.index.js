var person_selected, last_action_selected;

function fade_info(info, div, on_end){
    $(div)
        .html("<br>Loading")
        .fadeOut("slow", function(){
            $(this).html(info+"<br>")
                .fadeIn("slow", on_end);});

}

function include_main_div(result, ff){
    fade_info(result, names_id._main_content_div, ff);
}
function include_widget_div(result, ff){
    fade_info(result, names_id._widget_div, ff);
}

var action_mapper={
    edit: "person_edit",
    show: "person_show",
    remove: "person_remove",
    new: "person_new"
};

function localize_form(){
    $('#location').val(PersonLocalized.prototype.lang);
    addDatePicker("#DOB");
  
}

function action_person(spec){
    var options = { 
        type: spec.type, url: spec.url,
        beforeSubmit: function(arr, $form, options) { 
            // alert($("#wage").val());
             // return false to cancel submit                  
        },
        success: function(html) { 
            include_main_div(Jaml.render(spec.template,  internationalize(create_person(html))));
            load_ajax_persons(function(h){sidebar_persons_list(h);});
        } 
    }; 
    $(spec.form).ajaxForm(options) ; 


}

function edit_person(){
    action_person({action:'edit', type:'post',url:'/persons', template:'person_edited', form:'#person_edit'});
}

function insert_person(){
    action_person({action:'xxx', type:'post',url:'/persons', template:'person_created', form:'#person_edit'});
}


function new_person(){
    last_action_selected='new';
    person_selected=internationalize(create_person(data_person_example));
    include_main_div(Jaml.render(action_mapper[last_action_selected], person_selected), localize_form);
}

function load_person(id, action){

    $.ajax({
        url: "/persons/"+id,
        cache: false
    }).done(function( html ) {

        person_selected=internationalize(create_person(html));
        last_action_selected=action;
        

        include_main_div(Jaml.render(action_mapper[action], person_selected), localize_form);
        

    });
};

function load_ajax_persons(caller){
    $.ajax({
        url: "/persons",
        cache: false
    }).done(
        caller
);

}

function start_intro(){
    var _caller= function( html ) {
        start_intro_html(html);
    };

    load_ajax_persons(_caller);
};

function apply_binding(){
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

    binding_languages();


}

function binding_languages(){
    $(".languages > a").bind({
        click: function(e) {
            $(this).parent().children().removeClass('selected');
            localize($(this).html());
            $(this).addClass('selected');     
            e.preventDefault();
        }
    });
}

function sidebar_persons_list(persons){
    var ps=[];
    for(var i =0; i<persons.length; i++){
        ps.push(internationalize(create_person(persons[i])));
    }

    include_widget_div(Jaml.render('widget',{persons: ps}), apply_binding);

}

function start_intro_html(persons){
    sidebar_persons_list(persons);
    include_main_div(Jaml.render('intro'));
}

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
