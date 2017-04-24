var app = require('app');

app.registerController('CrumbCtrl', CrumbCtrl);

function CrumbCtrl() {
    var vm = this;

    vm.indexCrumb = {
        displayName:"首页",
        router:"about"
    };
}
