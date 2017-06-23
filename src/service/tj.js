var app = require('app');
// TJ大神，佑我无BUG
app.factory('TJ', function($location, $rootScope, $resource) {
  return {
    formUrl: document.referrer, // $locationChangeStart
    init: function(option) {
      var self = this;

      option = angular.extend({
        url: $location.absUrl(),
      }, option);

      this.pageInit().get(option, function(data) {
        console.log(data, 'success');
      }, function(data) {
        console.log(data, 'error');
      });

      this.formUrl = option.url;

      $rootScope.$on('$locationChangeStart', function() {
        // 统计流向
        self.save({ from: self.formUrl, target: $location.absUrl() });
      });
    },
    save: function(option, isTJPage) {
      var formUrl = this.formUrl;

      option = angular.extend({
        from: formUrl,
        //target: '',
      }, option);

      // 初始化或刷新页面都不需要统计为跳转事件
      if (!option.from || option.from === option.target) {
        return false;
      }

      this.openPage().get(option, function(data) {
        console.log(data, 'success');
      }, function(data) {
        console.log(data, 'error');
      });

      this.formUrl = isTJPage ? option.from : option.target;
    },
    // api pageInit
    pageInit: function() {
      return $resource('/bi/pageInit');
    },
    // api openPage
    openPage: function() {
      return $resource('/bi/openPage');
    },
  };
});

// 指定需要统计的链接 <element><a></a></element>
app.directive('tjPage', function() {
  return {
    restrict: 'AE',
    controller: function() {
      this.isTJPage = true;
    },
  };
}).directive('a', function(TJ) {
  return {
    restrict: 'AE',
    require: '^?tjPage',
    replace: true,
    link: function(scope, element, attrs, tjPageController) {
      tjPageController && tjPageController.isTJPage &&
      element.on('click', function(e) {
        // 统计流向
        TJ.save({ from: TJ.formUrl, target: e.target.getAttribute('href') },
          true);
      });

      scope.$on('$destroy', function() {
        element.off('click');
      });
    },
  };
});

app.run(function(TJ) {
  // 统计初始化页面
  TJ.init();
});
