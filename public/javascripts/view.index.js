var _main_content_div=".main-content", _person_detail_anchor=".person_detail",
__welcome_div=".welcome", _person_edit_anchor=".person_edit";
var attr_person_id="person_id";

function prepare_main_div(){
    $(_main_content_div).empty();
}
function include_main_div(html){
   $(_main_content_div).append(html+"<br>");
}

function load_person(id){
$.ajax({
    url: "/persons/"+id,
    cache: false
}).done(function( html ) {
    prepare_main_div();
    include_main_div(html);
});
};

$(_person_detail_anchor).bind({
  click: function(e) {
//      console.dir($(e.target));
      load_person($(e.target).attr(attr_person_id));
      e.preventDefault();
  }
});
$(_person_edit_anchor).bind({
  click: function(e) {
      load_person($(e.target).attr(attr_person_id));
      e.preventDefault();
  }
});

function start(){
    $(".widget").fadeIn("slow", function(){});
    prepare_main_div();
    include_main_div("<h1>Select one option from the side bar</h1>");

}

function print_person(p){
    prepare_main_div();
    include_main_div("FNAME : "+p.get_fname());
    include_main_div("WAGE : "+p.get_wage());
    include_main_div("DOB : "+p.get_DOB());
}

function basic_person(){
    
    this.person=create_person(data_person_example);
    print_person(this.person);
    
}



function i18n_person(){
    
    this.person=internationalize(create_person(data_person_example));
    print_person(this.person);
    
    
}
function localize(lang_){
set_locale(lang_);
    print_person(this.person);
}


