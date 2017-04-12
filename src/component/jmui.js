require('./accordion/accordion');
require('./crumb/crumb');
// require('./login/login');
require('./loginV2/login');
require('./pagination/pagination');
require('./tab/tab');
require('./scroll/scroll');
require('./imgerror/imgerror');
require('./search');
require('./ueditor/angular-ueditor');

angular.module('jmui', [
    'jmui.accordion',
    'jmui.crumbs',
    // 'jmui.login',
    'jmui.loginV2',
    'jmui.pagination',
    'jmui.tab',
    'jmui.scroll',
    'jmui.imgerror',
    'jmui.search',
    'ng.ueditor'
]).value('version', '0.1');