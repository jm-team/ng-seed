/**
 * Created by Administrator on 2017/4/19 0019.
 */
var app = require('app');

app.registerController('TabCtrl', TabCtrl);

/*@ngInject*/
function TabCtrl($document){
  var vm = this;

  console.log($document.find('body'))

  vm.tabs = [
    {title:'Tab1', content:'Content of Tab Pane 1'},
    {title:'Tab2', content:'Content of Tab Pane 2'},
    {title:'Tab3', content:'Content of Tab Pane 3'}
  ]
}
