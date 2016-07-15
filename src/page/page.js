(function(module) {
try {
  module = angular.module('jytApp');
} catch (e) {
  module = angular.module('jytApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/dist/page/bid.html',
    '<h2>{{ title }}</h2>');
}]);
})();

(function(module) {
try {
  module = angular.module('jytApp');
} catch (e) {
  module = angular.module('jytApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/dist/page/enquiry.html',
    '<h2>{{ title }}</h2>');
}]);
})();

(function(module) {
try {
  module = angular.module('jytApp');
} catch (e) {
  module = angular.module('jytApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/dist/page/enterprises.html',
    '<h2>{{ title }}</h2>');
}]);
})();

(function(module) {
try {
  module = angular.module('jytApp');
} catch (e) {
  module = angular.module('jytApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/dist/page/footer.html',
    '<section class="jyt-desc">\n' +
    '    <div>\n' +
    '        <dl>\n' +
    '            <dt>线路/运单查询</dt>\n' +
    '            <dd><a href="#">如何在线查询线路？</a></dd>\n' +
    '            <dd><a href="#">如何在物流平台下单？</a></dd>\n' +
    '            <dd><a href="#">首次下单 如何注册？</a></dd>\n' +
    '            <dd><a href="#">如何委托交易</a></dd>\n' +
    '            <dd><a href="#">如何自己找货</a></dd>\n' +
    '        </dl>\n' +
    '    </div>\n' +
    '\n' +
    '    <div>\n' +
    '        <dl>\n' +
    '            <dt>物流常识</dt>\n' +
    '            <dd><a href="#">什么是重货？什么是轻货？</a></dd>\n' +
    '            <dd><a href="#">什么是最低一票？</a></dd>\n' +
    '            <dd><a href="#">什么是是签单返还？</a></dd>\n' +
    '            <dd><a href="#">供应商合作洽谈</a></dd>\n' +
    '            <dd><a href="#">合作热线</a></dd>\n' +
    '        </dl>\n' +
    '    </div>\n' +
    '\n' +
    '    <div>\n' +
    '        <dl>\n' +
    '            <dt>在线帮助</dt>\n' +
    '            <dd><a href="#">注册流程</a></dd>\n' +
    '            <dd><a href="#">无法登录/忘记密码</a></dd>\n' +
    '            <dd><a href="#">修改账户信息</a></dd>\n' +
    '        </dl>\n' +
    '    </div>\n' +
    '\n' +
    '    <div>\n' +
    '        <h3>免费会员咨询热线：</h3>\n' +
    '        <p>400-6360-888(免长途费)</p>\n' +
    '        <p>010-80706099</p>\n' +
    '        <p>传真：010-80706099-9</p>\n' +
    '        <p>QQ</p>\n' +
    '    </div>\n' +
    '\n' +
    '    <div>\n' +
    '        <p><img src="" alt=""/></p>\n' +
    '        <p>扫描聚贸物流平台二维码</p>\n' +
    '    </div>\n' +
    '</section>\n' +
    '\n' +
    '<div class="footer-b"></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('jytApp');
} catch (e) {
  module = angular.module('jytApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/dist/page/ganders.html',
    '<h2>{{ title }}</h2>');
}]);
})();

(function(module) {
try {
  module = angular.module('jytApp');
} catch (e) {
  module = angular.module('jytApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/dist/page/header.html',
    '<header>头部</header>\n' +
    '\n' +
    '<section>\n' +
    '\n' +
    '    <h1>LOGO</h1>\n' +
    '\n' +
    '    <nav>\n' +
    '        <ul>\n' +
    '            <li><a ui-sref-active="active" ui-sref="home">首页</a></li>\n' +
    '            <li><a ui-sref-active="active" ui-sref="specials">运费特惠</a></li>\n' +
    '            <li><a ui-sref-active="active" ui-sref="orders">我要下单</a></li>\n' +
    '            <li><a ui-sref-active="active" ui-sref="enquiry">我要询价</a></li>\n' +
    '            <li><a ui-sref-active="active" ui-sref="bid">物流竞价</a></li>\n' +
    '            <li><a ui-sref-active="active" ui-sref="track">物流跟踪</a></li>\n' +
    '            <li><a ui-sref-active="active" ui-sref="service">服务介绍</a></li>\n' +
    '        </ul>\n' +
    '    </nav>\n' +
    '</section>');
}]);
})();

(function(module) {
try {
  module = angular.module('jytApp');
} catch (e) {
  module = angular.module('jytApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/dist/page/home.html',
    '<h2>{{ title }}</h2>\n' +
    '\n' +
    '<div class="demo"></div>\n' +
    '<div class="demo2"></div>\n' +
    '<div class="demo3"></div>\n' +
    '\n' +
    '<button ng-click="get()">GET</button>\n' +
    '<button ng-click="post()">POST</button>\n' +
    '<button ng-click="batch()">batch</button>\n' +
    '\n' +
    '<button ng-click="getBase()">获取基础数据</button>\n' +
    '\n' +
    '<button ng-click="getBaseOther()">获取其他基础数据</button>\n' +
    '\n' +
    '\n' +
    '<input type="text" ng-model="date"/>\n' +
    '<button ng-click="getDate()">获取时间</button>\n' +
    '\n' +
    '<p>\n' +
    '  <input type="text" ng-model="sessionStorage">\n' +
    '  <button type="button" name="button" ng-click="setSessionStroage()">设置sessionStorage</button>\n' +
    '  <button type="button" name="button" ng-click="getsessionStroage()">获取sessionStorage</button>\n' +
    '</p>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('jytApp');
} catch (e) {
  module = angular.module('jytApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/dist/page/orders.html',
    '<h2>{{ title }}</h2>');
}]);
})();

(function(module) {
try {
  module = angular.module('jytApp');
} catch (e) {
  module = angular.module('jytApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/dist/page/service.html',
    '<h2>{{ title }}</h2>');
}]);
})();

(function(module) {
try {
  module = angular.module('jytApp');
} catch (e) {
  module = angular.module('jytApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/dist/page/specials.html',
    '<h2>{{ title }}</h2>');
}]);
})();

(function(module) {
try {
  module = angular.module('jytApp');
} catch (e) {
  module = angular.module('jytApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/dist/page/track.html',
    '<h2>{{ title }}</h2>');
}]);
})();
