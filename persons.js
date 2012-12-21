var core=require('./core_node.js');
var path_persons_lib='./public/javascripts/persons.js';

var path_core_lib='./public/javascripts/core.js';

var path_i18n_lib='./public/javascripts/i18n.js';

var context={};
core.load_js_client(context, path_core_lib, ['getters', 'init']);


core.load_js_client(context, path_i18n_lib, ['date_printer', 'wage_printer']);

core.load_js_client(exports, path_persons_lib, ['create_person', 'internationalize'], context);


