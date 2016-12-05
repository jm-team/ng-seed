var app = require('../app');

// 调用Api 服务
app.registerController('HomeCtrl',
    /*@ngInject*/
    function ($scope, Api, $modal, $state) {
        angular.extend($scope, {
            title: 'HOME Page',
            desc: '这是主页',
            data: [1, 2, 3, 4, 5],

            modal: function ($event) {
                $event.preventDefault();
                $modal.open({
                    templateUrl: app.tmps.loginTmp,

                    controller: 'loginCtrl',

                    windowClass: 'login-modal'
                });
            }
        });

        // lazy img
        var changeImageUrl = function() {
            var color = Math.floor(Math.random()*16777215).toString(16);
            return '//placehold.it/768x599/' + color + '/ffffff';
        };
        angular.extend($scope, {
            collection: [],
            searchText: 1
        });

        /* build random item list */
        for (var i = 0; i < 20; i++) {
            $scope.collection.push({
                type: Math.floor(Math.random() * 2) + 1,
                number: i + 1,
                srcset: changeImageUrl()
            });
        }

        $scope.changeImage = function () {
            $scope.runtimeImageSrc = changeImageUrl();
        };

        $scope.changeImage();
    });
