/**
 * Created by Administrator on 2017/4/19 0019.
 */
var app = require('app');

app.registerController('TreeCtrl', TreeCtrl);

/*@ngInject*/
function TreeCtrl($scope) {
  var vm = $scope;
  vm.node = null;

  var names = ['Homer', 'Marge', 'Bart', 'Lisa', 'Mo'];

  function createSubTree(level, width, prefix) {
    if (level > 0) {
      var res = [];
      for (var i = 1; i <= width; i++)
        res.push({
          "label": "Node " + prefix + i,
          "id": "id" + prefix + i,
          "i": i,
          "children": createSubTree(level - 1, width, prefix + i + "."),
          "name": names[i % names.length]
        });
      return res;
    } else
      return [];
  }

  vm.treedata = createSubTree(3, 4, "")
  vm.showSelected = function(sel) {
    console.log(sel)
    vm.selectedNode = sel;
    vm.node = sel;
  };

  vm.expandedNodes = [$scope.treedata[1],
    $scope.treedata[3],
    $scope.treedata[3].children[2],
    $scope.treedata[3].children[2].children[1]
  ];

  vm.getColor = function(node) {
    return ["#a40", "#04a", "#990", "#0a4"][node.i % 4];
  };
}
