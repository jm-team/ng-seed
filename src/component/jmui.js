require('./accordion/accordion');
require('./crumb/crumb');
require('./login/login');
require('./loginV2/login');
require('./pagination/pagination');
require('./tab/tab');
require('./scroll/scroll');
// require('./ueditor/angular-ueditor');

angular.module('jmui', [
    'jmui.accordion',
    'jmui.crumbs',
    'jmui.login',
    'jmui.loginV2',
    'jmui.pagination',
    'jmui.tab',
    'jmui.scroll'//,
    // 'ng.ueditor'
]).value('version', '0.1');