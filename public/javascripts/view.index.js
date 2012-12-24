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
Jaml.register('person', function(person) {
  div({cls: 'person'},
    h1(person.fname),
    form(
      label({for: 'fname'}, "Quantity"),
      input({type: 'text', name: 'fname', id: 'fname', value: person.get_id()}),
      br(),
      label({for: 'DOB'}, "DOB"),
      input({type: 'text', name: 'DOB', id: 'DOB', value: person.get_DOB()}),
      br(),
      input({type: 'submit', value: 'Edit'})
    )
  );

});

Jaml.register('simple', function() {
  div(
    h2("Static List"),
          a({cls: 'person_detail', href: '#', person_id:1}, 'Load person 1'),

    p("Some exciting paragraph text"),
    br(),

    ul(
      li("First item"),
      li("Second item"),
      li("Third item")
    )
  );
});

function start(){
    $(".widget").prepend(Jaml.render('simple'));
        apply_binding();
    $(".widget").prepend("<h1>TEST START</h1>");
    $(".widget").fadeIn("slow", function(){});


//    basic_person();


 prepare_main_div();
    include_main_div("<h1>Select one option from the side bar</h1>");

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
    print_person(person_selected);
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
