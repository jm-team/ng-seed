require('./accordion');
require('./crumb');
require('./tooltip');
require('./login');
require('./pagination');
require('./tab');
require('./scroll');
require('./imgerror');
require('./search');
<<<<<<< HEAD
require('./backtop');
require('./dialog');
require('./loadScript');
require('./ueditor/angular-ueditor');
=======
require('./ueditor/angular-ueditor');

require('./backtop');
require('./dialog');
require('./switch');
require('./alert');
require('./rate');

>>>>>>> ui-branch

angular.module('jmui', [
    'jmui.accordion',
    'jmui.crumbs',
    'jmui.switch',
    'jmui.alert',
    // 'jmui.login',

    'jmui.tooltip',
    'jmui.login',
    'jmui.pagination',
    'jmui.tab',
    'jmui.scroll',
    'jmui.rate',
    'jmui.imgerror',
    'jmui.search',
    'jmui.AnchorSmoothScroll',
    'jmui.dialog',
    'jmui.loadScript',
    'ng.ueditor'
]).value('version', '0.1');
