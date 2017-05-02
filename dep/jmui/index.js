require('./index.scss');
require('./accordion');
require('./crumb');
require('./tooltip');
require('./login');
require('./pagination');
require('./tab');
require('./scroll');
require('./imgerror');
require('./search');
require('./anchor');
require('./dialog');
require('./loadScript');
require('./ueditor/angular-ueditor');

require('./switch');
require('./alert');
require('./rate');
require('./checkbox');
require('./transfer');
require('./autocomponent');
require('./upload');

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
    'jmui.switch',
    'jmui.alert',
    'jmui.rate',
    'jmui.checkbox',
    'jmui.transfer',
    'jmui.autoComponent',
    'ng.ueditor',
    'jmui.fineUploader'
]).value('version', '0.1');