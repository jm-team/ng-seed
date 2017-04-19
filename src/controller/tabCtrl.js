/**
 * Created by Administrator on 2017/4/19 0019.
 */
var app = require('app');

app.registerController('TabCtrl', TabCtrl);


function TabCtrl(){
  var vm = this;

  vm.tabs = [
    {title:'Tab1', content:'Content of Tab Pane 1'},
    {title:'Tab2', content:'Content of Tab Pane 2'},
    {title:'Tab3', content:'Content of Tab Pane 3'}
  ]
}
