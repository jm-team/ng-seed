var app = require('app');

// 调用Api 服务
app.registerController('CheckboxCtrl',
  /*@ngInject*/
  function() {
    var vm = this;

    vm.checked1 = true;
    vm.checked2 = true;

    vm.disabled = true;

    vm.toggle = function() {
      vm.disabled = !vm.disabled;
    };

    vm.checkToggle = function() {
      vm.checked = !vm.checked;
    };

    vm.options = ['Apple', 'Pear', 'Orange'];

    vm.checkeds = ['Apple'];

    vm.options2 = [{
        title: 'HTML',
        value: 'HTML'
      },
      {
        title: 'CSS',
        value: 'CSS'
      },
      {
        title: 'JavaScript',
        value: 'JavaScript'
      }
    ];

    vm.checkeds2 = ['JavaScript', 'CSS'];

    vm.options3 = [{
        title: 'Angular',
        value: 'Angular'
      },
      {
        title: 'Vue',
        value: 'Vue',
        disabled: true
      },
      {
        title: 'React',
        value: 'React',
        disabled: true
      }
    ];

    vm.checkeds3 = ['React', 'Angular'];


    // 全选
    vm.checkAll = false;
    vm.options4 = [{
        title: 'Angular',
        value: 'Angular'
      },
      {
        title: 'Vue',
        value: 'Vue'
      },
      {
        title: 'React',
        value: 'React'
      },
      {
        title: 'Backbone',
        value: 'Backbone',
        disabled: true
      },
      {
        title: 'Knockout',
        value: 'Knockout',
        disabled: true
      }
    ];
    vm.checkeds4 = ['React', 'Angular'];

    vm.onChange = function() {
      var l = vm.options4.filter(function(item) {
        return !item.disabled
      }).length;

      vm.checkAll = (l === vm.checkeds4.length)
    };

    vm.selectAll = function(arg) {
      var selecteds = [];
      if (arg.checked) {
        vm.options4.forEach(function(item) {
          if (!item.disabled) {
            item.checked = true;
            selecteds.push(item.value);
          }
        });

        vm.checkeds4 = selecteds;

      } else {
        vm.options4.forEach(function(item) {
          if (!item.disabled) {
            item.checked = false;
            selecteds.push(item.value);
          }
        });
        vm.checkeds4 = [];
      }
    }
  });
