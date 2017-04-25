var app = require('app');

// 调用Api 服务
app.registerController('CheckboxCtrl',
    /*@ngInject*/
    function ($timeout) {
        var vm = this;

        vm.checked1 = true;
        vm.checked2 = true;

        vm.disabled = true;

        vm.toggle = function(){
            vm.disabled = !vm.disabled;
        };

        vm.checkToggle = function(){
            vm.checked = !vm.checked;
        };

        vm.options = [
            { label: 'Apple', value: 'Apple' },
            { label: 'Pear', value: 'Pear' },
            { label: 'Orange', value: 'Orange' }
        ]
    });
