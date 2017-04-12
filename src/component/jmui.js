require('./accordion');
require('./crumb');
require('./login');
require('./pagination');
require('./tab');
require('./scroll');
require('./imgerror');
require('./search');
require('./ueditor/angular-ueditor');

angular.module('jmui', [
    'jmui.accordion',
    'jmui.crumbs',
    'jmui.login',
    'jmui.pagination',
    'jmui.tab',
    'jmui.scroll',
    'jmui.imgerror',
    'jmui.search',
    'ng.ueditor'
]).value('version', '0.1');