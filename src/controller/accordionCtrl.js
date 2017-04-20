
/**
 * Created by Administrator on 2017/4/19 0019.
 */

var app = require('app');

app.registerController('AccordionCtrl', AccordionCtrl);

function AccordionCtrl() {
  var vm = this;

  vm.accordions = [{
    title: "手风琴标题1",
    content: "手风琴内容1"
  }, {
    title: "手风琴标题2",
    content: "手风琴内容2"
  }, {
    title: "手风琴标题3",
    content: "手风琴内容3"
  }];
}
