console.log('hola');
function load_person(id){
$.ajax({
  url: "/persons/"+id,
  cache: false
}).done(function( html ) {
  $(".main-content").empty();
$(".main-content").append(html);
});
};
$('.person_detail').bind({
  click: function(e) {
      console.dir($(e.target));
  load_person($(e.target).attr('person_id'));
      e.preventDefault();
  }
});
