var core=require('./core_node.js');
var path_date_format_lib='./public/javascripts/date_format.js';
var path_i18n_lib='./public/javascripts/i18n.js';
var context={};
core.load_js_client(context, path_date_format_lib, []);
core.load_js_client(exports, path_i18n_lib, ['date_printer', 'wage_printer'], context);

