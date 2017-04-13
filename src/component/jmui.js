require('./accordion/accordion');
require('./crumb/crumb');
// require('./login/login');
require('./loginV2/login');
require('./pagination/pagination');
require('./tab/tab');
require('./tooltip/');
require('./scroll/scroll');
require('./imgerror/imgerror');
require('./ueditor/angular-ueditor');
require('./backtop/');
require('./dialog/');
require('./switch/');

angular.module('jmui', [
    'jmui.dialog',
    'jmui.accordion',
    'jmui.crumbs',
    'jmui.switch',
    // 'jmui.login',
    'jmui.tooltip',
    'jmui.loginV2',
    'jmui.pagination',
    'jmui.AnchorSmoothScroll',
    'jmui.tab',
    'jmui.scroll',
    'jmui.imgerror',
    'ng.ueditor'
]).value('version', '0.1');