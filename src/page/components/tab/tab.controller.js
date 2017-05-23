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

  vm.tabs1 = [
    {title:'Tab1', content:[{'name':'li1-1'}, {'name':'li1-2'},{'name':'li1-3'}]},
    {title:'Tab2', content:[{'name':'li2-1'}, {'name':'li2-2'},{'name':'li2-3'}]},
    {title:'Tab3', content:[{'name':'li3-1'}, {'name':'li3-2'},{'name':'li3-3'}]}
  ]
}
