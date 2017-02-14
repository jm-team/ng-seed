var app = require('app');

// 调用Api 服务
app.registerController('SearchCtrl',
    /*@ngInject*/
    function($scope, $http, $q, $location) {
        var deferred = $q.defer();
        var categoryId = '', industryId = '';
        var categoryArr = [], industryArr = [];
        $scope.lists = [];
       
        // 分类列表
        $http.get('/dist/mock/idsData.json').success(function(result) {
            deferred.resolve(result);
            $scope.data = result;
        }).error(function(result) {
            deferred.reject(result);
        });

        // 搜索分类
        $scope.searchCategory = function(obj) {
        	categoryArr = [];
            $http.get('/dist/mock/search.json').success(function(result) {          	
            	if(!obj.categoryId){ //判断全部
            		categoryArr = result;
					categoryId = '';
            	}else{
            		angular.forEach(result, function (item) {
            			if(item.categoryId == obj.categoryId){
            				categoryArr.push(item);
            				categoryId = obj.categoryId;
            			}
            		})
            	}
            	$scope.getList(result);
            }).error(function(result) {
                deferred.reject(result);
            });
        }

        // 搜索行业
        $scope.searchIndustry = function (obj) {
        	industryArr = [];
        	$http.get('/dist/mock/search.json').success(function(result) {
        		if(!obj.industryId){ //判断全部
            		industryArr = result;
					industryId = '';
            	}else{
            		angular.forEach(result, function (item) {
            			// var reg = new RegExp(obj.industryId, 'g');
            			if(item.industryIds.indexOf(obj.industryId) !== -1){
            				industryArr.push(item);
            				industryId = obj.industryId;
            			}
            		})
            	}
        		$scope.getList(result);
        	}).error(function(result) {
        	    deferred.reject(result);
        	});
        }

        $scope.getList = function (result) {
        	var search = angular.extend({
        		categoryId: categoryId,
        		industryId: industryId 
        	});

        	var arr = [];

        	if(!categoryArr.length && !industryArr.length){
        		$scope.lists = result;
        		return false;
        	}

			$location.search(search);

        	for(var i=0;i<categoryArr.length;i++){
        		for(var j=0;j<industryArr.length;j++){
        			if(categoryArr[i].categoryId == industryArr[j].categoryId){
        				arr.push(categoryArr[i]);
        			}
        		}
        	}

    		$scope.lists = arr;   	
        }

        $scope.searchCategory($location.search());
        $scope.searchIndustry($location.search());

       return deferred.promise;
    });
