/**
 * Created by Administrator on 2017/4/19 0019.
 */

var app = require('app');

app.registerController('AutoComponentCtrl', AutoComponentCtrl);

/*@ngInject*/
function AutoComponentCtrl($q) {
    var vm = this;

    vm.results = [];
    vm.value = null;

    vm.handleChange = function () {
        return searchResult(vm.keyword);
    };

    vm.select = function (arg) {
        console.log(arg);
        vm.value = arg.item;
    }

    function getRandomInt(max, min) {
        min = min || 0;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function searchResult(query) {
        return $q.when((new Array(getRandomInt(5))).join('.').split('.')
            .map(function (item, idx) {
                return {
                    query: query,
                    category: query + idx,
                    count: getRandomInt(200, 100),
                }
            }))

    }
}
