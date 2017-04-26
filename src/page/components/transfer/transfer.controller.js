/**
 * Created by Administrator on 2017/4/19 0019.
 */
var app = require('app');

app.registerController('TransferCtrl', TransferCtrl);

/*@ngInject*/
function TransferCtrl(){
    var vm = this;
    var dataSource = [];
    var targetKeys = [];

    for (let i = 0; i < 8; i++) {
        dataSource.push({
            key: i.toString(),
            title: `content${i + 1}`,
            description: `description of content${i + 1}`,
            disabled: i % 3 < 1,
        });
    }

    for (let i = 0; i < 5; i++) {
        targetKeys.push({
            key: i.toString(),
            title: `content${i + 1}`,
            description: `description of content${i + 1}`,
            disabled: i % 3 < 1,
        });
    }

    vm.dataSource = dataSource;
    vm.targetKeys = targetKeys;
    vm.titles = ["Source", "Target"];
}
