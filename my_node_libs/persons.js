var core=require('./core_node.js');
var path_persons_lib='./../public/javascripts/domain_libs/persons.js';

var path_core_lib='./../public/javascripts/my_libs/core.js';

var path_i18n_lib='./../public/javascripts/my_libs/i18n.js';



var context={};

core.load_js_client(context, path_core_lib, ['getters', 'init']);
core.load_js_client(context, path_i18n_lib, ['date_printer', 'wage_printer']);
core.load_js_client(exports, path_persons_lib, ['data_person_example', 'set_locale', 'create_person', 'internationalize', 'invoke_i18n_methods'], context);


