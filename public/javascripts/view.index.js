var person_selected, last_action_selected;

function fade_info(info, div, on_end){
   $(div)
        .html("<br>Loading")
        .fadeOut("slow", function(){
        $(this).html(info+"<br>")
        .fadeIn("slow", on_end );});

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


function load_person(id, action){

  $.ajax({
        url: "/persons/"+id,
        cache: false
    }).done(function( html ) {

        person_selected=internationalize(create_person(html));
        last_action_selected=action;
        include_main_div(Jaml.render(action_mapper[action], person_selected));
        addDatePicker("#DOB");
    });
};

function start_intro(){
    $.ajax({
        url: "/persons",
        cache: false
    }).done(function( html ) {
        start_intro_html(html);

    });
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

}


function start_intro_html(persons){

    var ps=[];
   for(var i =0; i<persons.length; i++){
    ps.push(internationalize(create_person(persons[i])));
}
    include_main_div(Jaml.render('intro'));
    include_widget_div(Jaml.render('widget',{persons: ps}), apply_binding);
}

function localize(lang_){
    set_locale(lang_);
    start_intro();
    if(person_selected!=='undefined') load_person(person_selected.get_id(), last_action_selected);
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
