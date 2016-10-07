var app = require('../app');
app.directive('jmHeader', function(){
    var tmp = require('../../page/directive/header.html');
    return {
        restrict:'AE',
        templateUrl: tmp

    }
});
