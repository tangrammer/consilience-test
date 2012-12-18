var _main_content_div=".main-content", _person_detail_anchor=".person_detail",
__welcome_div=".welcome", _person_edit_anchor=".person_edit";
var attr_person_id="person_id";

function prepare_main_div(){
    $(_main_content_div).empty();
}
function include_main_div(html){
   $(_main_content_div).append(html);
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
