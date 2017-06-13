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

require('./switch');
require('./alert');
require('./rate');
require('./checkbox');
require('./transfer');
require('./autocomplete');
require('./pdf');
require('./upload');
require('./carousel');
require('./datepicker');

// require('../../node_modules/angular-tree-control/css/tree-control-attribute.css');
require('angular-tree-control');
require('./ueditor');

angular.module('jmui', [
  'jmui.carousel',
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
  'jmui.autoComplete',
  'jmui.pdf',
  'jmui.fineUploader',
  'ng.ueditor',
  'ui.bootstrap.datepicker',
  'treeControl'
]).value('version', '0.1');
