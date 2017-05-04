/*global require, angular*/
require('./index.scss');
var tpl = require('./index.html');

// 文字提示
angular.module('jmui.transfer', [])
  .directive('jmTransfer', function () {

    return {
      restrict: 'AE',
      templateUrl: tpl,
      scope: {
        source: '=',
        targetKeys: '='
      },
      controller: function ($scope, $element, $attrs) {
        console.log($attrs);

        $scope.sourceCheckeds = [];
        $scope.targetCheckeds = [];

        console.log($scope.dataSource)
        $scope.titles = ["Source", "Target"];

        function transfer(sourceArr, arrChecks, targetArr) {
          var arr = [];
          var newArr = $scope[sourceArr].filter(function (item) {
            return !item.checked;
          });

          angular.forEach($scope[sourceArr], function (item, index) {
            if (item.checked) {
              item.checked = false;
              arr.push(item);
              $scope[arrChecks].splice($scope[arrChecks].indexOf(item.title), 1);
            }
          });
          $scope[sourceArr] = newArr;
          $scope[targetArr] = $scope[targetArr].concat(arr)
        }

        $scope.lessTarget = function () {
          $scope.targetAll = false;
          transfer('targetKeys', 'targetCheckeds', 'source');
        };

        $scope.addTarget = function () {
          $scope.sourceAll = false;
          transfer('source', 'sourceCheckeds', 'targetKeys');
        };

        $scope.onChange = function (source) {
          var sourceData = $scope.source;
          var checkedSource = $scope.sourceCheckeds;

          if (source === 'target') {
            sourceData = $scope.targetKeys;
            checkedSource = $scope.targetCheckeds;
          }

          var l = sourceData.filter(function (item) {
            return !item.disabled
          }).length;
          $scope[source === 'target' ? 'targetAll' : 'sourceAll'] = (l === checkedSource.length);
        }

        $scope.changeAll = function (arg, source) {
          var sourceData = $scope.source;
          var arr = $scope.sourceCheckeds;

          if (source === 'target') {
            sourceData = $scope.targetKeys;
            arr = $scope.targetCheckeds;
          }

          if (arg.checked) {
            sourceData.map(function (item) {
              if (!item.disabled) {
                item.checked = true;
                if (arr.indexOf(item.title) === -1) {
                  arr.push(item.title)
                }
              }
            });
          } else {
            sourceData.map(function (item) {
              if (!item.disabled) {
                item.checked = false;
              }
            });
            arr = [];
          }

          if (source === 'target') {
            $scope.targetCheckeds = arr
          } else {
            $scope.sourceCheckeds = arr;
          }

        }

      }
    };
  });
