var names_id={
    _main_content_div:".main-content",
    _person_detail_anchor:".person_detail",
    __welcome_div:".welcome", 
    _person_edit_anchor:".person_edit",
    attr_person_id:"person_id"
};

var person_selected;
function prepare_main_div(){
    $(names_id._main_content_div).empty();
}

function include_main_div(html){
    $(names_id._main_content_div).append(html+"<br>");
}
function load_person(id){
    $.ajax({
        url: "/persons/"+id,
        cache: false
    }).done(function( html ) {
        prepare_main_div();
        person_selected=internationalize(create_person(html));
        include_main_div(Jaml.render('person', person_selected));
    addDatePicker("#DOB");
//        print_person(person_selected);

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

$(names_id._person_detail_anchor).bind({
    click: function(e) {
        //      console.dir($(e.target));
        load_person($(e.target).attr(names_id.attr_person_id));
        e.preventDefault();
    }
});
$(names_id._person_edit_anchor).bind({
    click: function(e) {
        load_person($(e.target).attr(names_id.attr_person_id));
        e.preventDefault();
    }
});
}




function start_intro_html(persons){
    var ps=[];
   for(var i =0; i<persons.length; i++){
    ps.push(internationalize(create_person(persons[i])));
}
    $(".main-content").html(Jaml.render('intro'));
    $(".widget").html(Jaml.render('widget', {persons: ps}));
       apply_binding();
//    $(".widget").fadeIn("slow", function(){});
    $('.widget').show();
}

function print_person(p){
    prepare_main_div();
    include_main_div("FNAME: "+p.get_fname());
    include_main_div("WAGE : "+p.get_wage());
    include_main_div("DOB : "+p.get_DOB());
}

function basic_person(){
    
    person_selected=create_person(data_person_example);
    print_person(person_selected);
    
}



function i18n_person(){
    
    person_selected=internationalize(create_person(data_person_example));
    print_person(person_selected);
    
    
}
function localize(lang_){
    console.log(person_selected);
    set_locale(lang_);
    //print_person(person_selected);
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
