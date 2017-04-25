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

        vm.options = ['Apple', 'Pear', 'Orange'];

        vm.checkeds = ['Apple']

        vm.options2 = [
            { label: 'HTML', value: 'HTML' },
            { label: 'CSS', value: 'CSS' },
            { label: 'JavaScript', value: 'JavaScript' }
        ];

        vm.checkeds2 = ['JavaScript', 'CSS']

        vm.options3 = [
            { label: 'Angular', value: 'Angular' },
            { label: 'Vue', value: 'Vue',disabled: true },
            { label: 'React', value: 'React', disabled: true }
        ];

        vm.checkeds3 = ['React', 'Angular']


        // 全选
        vm.checkAll = false;
        vm.options4 = [
            { label: 'Angular', value: 'Angular' },
            { label: 'Vue', value: 'Vue'},
            { label: 'React', value: 'React'},
            { label: 'Backbone', value: 'Backbone', disabled: true},
            { label: 'Knockout', value: 'Knockout',  disabled: true}
        ];
        vm.checkeds4 = ['React', 'Angular']

        vm.onChange = function(){
            var l = vm.options4.filter(function(item){
                return !item.disabled
            }).length;

            vm.checkAll = (l === vm.checkeds4.length)
        };
    });
