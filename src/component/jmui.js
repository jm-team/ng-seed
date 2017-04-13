require('./accordion');
require('./crumb');
require('./tooltip');
require('./login');
require('./pagination');
require('./tab');
require('./scroll');
require('./imgerror');
require('./search');
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
    'jmui.login',
    'jmui.pagination',
    'jmui.AnchorSmoothScroll',
    'jmui.tab',
    'jmui.scroll',
    'jmui.imgerror',
    'jmui.search',
    'ng.ueditor'
]).value('version', '0.1');