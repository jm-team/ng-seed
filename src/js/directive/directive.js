var app = require('../app');
var tmpHeader = require('../../page/common/header.html');
var tmpFooter = require('../../page/common/footer.html');
var tmpPage = require('../../page/common/page.html');

app.directive('jmHeader', [function () {
    return {
        restrict: 'AE',
        templateUrl: tmpHeader,
        replace: true,
        controller: ['$modal', '$scope', function ($modal, $scope) {
            $scope.modal = function ($event) {
                $event.preventDefault();
                $modal.open({
                    templateUrl: app.tmps.loginTmp,

                    controller: 'loginCtrl',

                    windowClass: 'login-modal'
                });
            }
        }]
    }
}]);

app.directive('jmFooter', [function () {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: tmpFooter,
        controller: ['$scope', function ($scope) {
        }]
    }
}]);

app.directive('toggle', ['Util', function (Util) {
    return {
        restrict: 'AE',
        link: function (scope, element, attrs) {
            var target = angular.element(Util.getByClassName(attrs.toggle));
            element.on('click', function () {
                target.toggleClass('animate-hidden');
            });
        }
    }
}]);

// 分页
app.directive('jmPage', function(){
    return {
        restrict:'AE',
        templateUrl:tmpPage,
        scope:{
            numPages:'=',
            currentPage:'=',
            onSelectPage:'&'
        },
        link: function(scope, element, attrs){
            
            function createPage(currentPage, totalPages){
                scope.pages = [];
                var start = 1;
                var end = 5;

                // 总页码小于8页  全部显示
                if(totalPages < 8){
                    end = totalPages;
                // 最后的页码
                }else{
                    if(currentPage <= 5){
                        start = currentPage-2;
                        start = (start<1)?1:start;
                        end = currentPage + 2;
                    }else if(currentPage > totalPages - 5){
                        start = currentPage-3;
                        end = totalPages;
                    // 中间的页码
                    }else if(currentPage > 5){
                        start = currentPage - 3;
                        end = currentPage + 2;
                    }
                }

                for(;start <= end; start++){
                    scope.pages.push({index: start, isActive: currentPage == start});
                }
            }

            scope.$watch('numPages', function(value){
                createPage(1,value)

            });


        }
    }
});


