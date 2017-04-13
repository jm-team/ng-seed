require('./accordion');
require('./crumb');
require('./tooltip');
require('./login');
require('./pagination');
require('./tab');
require('./scroll');
require('./imgerror');
require('./search');
require('./backtop');
require('./dialog');
require('./loadScript');
require('./ueditor/angular-ueditor');

angular.module('jmui', [
    'jmui.accordion',
    'jmui.crumbs',
    'jmui.tooltip',
    'jmui.login',
    'jmui.pagination',
    'jmui.tab',
    'jmui.scroll',
    'jmui.imgerror',
    'jmui.search',
    'jmui.AnchorSmoothScroll',
    'jmui.dialog',
    'jmui.loadScript',
    'ng.ueditor'
]).value('version', '0.1');