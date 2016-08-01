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
    '<footer id="footer">\n' +
    '<section class="jyt-desc layout">\n' +
    '    <div class="desc-item">\n' +
    '        <dl>\n' +
    '            <dt>Operation <br />guide</dt>\n' +
    '            <dt class="line">操作指南</dt>\n' +
    '            <dd ng-repeat="l in guide" bindonce><a bo-href="l.href" bo-text="l.title"></a></dd>\n' +
    '        </dl>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="desc-item">\n' +
    '        <dl>\n' +
    '            <dt>Logistics <br/> Institute</dt>\n' +
    '            <dt class="line">物流学院</dt>\n' +
    '            <dd ng-repeat="l in logisInst" bindonce><a bo-href="l.href" bo-text="l.title"></a></dd>\n' +
    '        </dl>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="desc-item desc-vip">\n' +
    '      <dl>\n' +
    '        <dt>Free <br/> contact</dt>\n' +
    '        <dt class="line">免费会员咨询热线：</dt>\n' +
    '        <dd>400-6360-888(免长途费)</dd>\n' +
    '        <dd>010-80706099</dd>\n' +
    '        <dd>传真：010-80706099-9</dd>\n' +
    '      </dl>\n' +
    '    </div>\n' +
    '\n' +
    '    <section class="qrCodes">\n' +
    '        <h2>轻松实现<br />一站式服务</h2>\n' +
    '        <div class="code-item">\n' +
    '          <img src="/dist/img/appCode.png" alt="">\n' +
    '          <p>聚运通app二维码</p>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="code-item weixinCode">\n' +
    '          <img src="/dist/img/weixinCode.png" alt="">\n' +
    '          <p>聚运通微信二维码</p>\n' +
    '        </div>\n' +
    '    </section>\n' +
    '</section>\n' +
    '\n' +
    '<div class="footer-b">\n' +
    '    <p>\n' +
    '      <a href="#">聚贸官网</a>|\n' +
    '      <a href="#">聚贸电商总平台</a>|\n' +
    '      <a href="#">聚贸化工(卖塑郎)</a>|\n' +
    '      <a href="#">聚贸有色(卖铜郎)</a>|\n' +
    '      <a href="#">聚贸传媒</a>|\n' +
    '    </p>\n' +
    '    <p>\n' +
    '      <em class="copyright">COPYRIGHT &copy; 聚贸 www.jumore.com </em>\n' +
    '      <span>浙公网安备 33010602003495号</span>\n' +
    '    </p>\n' +
    '</div>\n' +
    '</footer>\n' +
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
    '<header class="siteNav">\n' +
    '  <div class="layout clearFix">\n' +
    '    <div class="pullLeft siteNav-l">\n' +
    '      <span><span class="home-icon"></span>xxxxxxx您好，欢迎来到聚贸物流！</span>\n' +
    '      <a href="#">请登录</a>\n' +
    '      <a href="http://lg-center.jm.com/user/toRegister">注册</a>\n' +
    '    </div>\n' +
    '    <div class="pullRight siteNav-r">\n' +
    '      <a class="guide" href="#">新手指南</a>|\n' +
    '      <a class="person" href="#">个人管理</a>|\n' +
    '      <a class="message" href="#">消息中心</a>|\n' +
    '      <a class="service" href="#">客服中心</a>|\n' +
    '      <span class="phone">400-990-3355</span>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</header>\n' +
    '\n' +
    '<section class="topWrap" head-fixed start="startFixed">\n' +
    '  <div class="layout clearFix">\n' +
    '    <a ui-sref="home">\n' +
    '      <h1 id="mainLogo">\n' +
    '        <img src="/dist/img/LOGO.png" alt="">\n' +
    '      </h1>\n' +
    '    </a>\n' +
    '\n' +
    '    <div class="top-wrap-r">\n' +
    '    <nav class="mainNav">\n' +
    '      <ul>\n' +
    '        <li><a ui-sref-active="active" ui-sref="home">聚贸首页</a></li>\n' +
    '        <li><a ui-sref-active="active" ui-sref="specials">国家馆</a></li>\n' +
    '        <li><a ui-sref-active="active" ui-sref="orders">省馆</a></li>\n' +
    '        <li><a ui-sref-active="active" ui-sref="enquiry">品牌馆</a></li>\n' +
    '        <li><a ui-sref-active="active" ui-sref="bid">聚达通</a></li>\n' +
    '        <li><a ui-sref-active="active" ui-sref="track">聚运通</a></li>\n' +
    '        <li><a ui-sref-active="active" ui-sref="service">聚融通</a></li>\n' +
    '        <li><a ui-sref-active="active" ui-sref="service">行业资讯</a></li>\n' +
    '      </ul>\n' +
    '    </nav>\n' +
    '    <section class="index-search">\n' +
    '        <form class="clearFix">\n' +
    '            <div class="search-input">\n' +
    '              <input type="text" placeholder="只需轻轻输入您的需求 成交物流买卖SO简单！">\n' +
    '            </div>\n' +
    '            <button class="search-btn">我要查询</button>\n' +
    '        </form>\n' +
    '    </section>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</section>\n' +
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
  $templateCache.put('/dist/page/home.html',
    '<div class="bannerWrap">\n' +
    '  <div class="banners">\n' +
    '    <!-- <carousel interval="myInterval">\n' +
    '      <slide ng-repeat="slide in slides" active="slide.active">\n' +
    '        <img ng-src="{{slide.image}}">\n' +
    '      </slide>\n' +
    '    </carousel> -->\n' +
    '    <img src="/dist/img/banner.png" alt="" />\n' +
    '  </div>\n' +
    '\n' +
    '  <section class="layout">\n' +
    '    <div class="sub-nav-wrap"  head-fixed start="startFixed">\n' +
    '      <div class="sub-nav-bg"></div>\n' +
    '      <nav class="subNav">\n' +
    '          <h2>栏目列表</h2>\n' +
    '          <ul>\n' +
    '              <li class="icon-index"><a href="#">聚运通首页</a></li>\n' +
    '              <li class="icon-order"><a href="#">我要下单</a></li>\n' +
    '              <li class="icon-freight"><a ui-sref="specials">运费特惠</a></li>\n' +
    '              <li class="icon-advice"><a href="#">仓储特惠</a></li>\n' +
    '              <li class="icon-logis"><a href="#">物流跟踪</a></li>\n' +
    '              <li class="icon-service"><a href="#">服务中心</a></li>\n' +
    '          </ul>\n' +
    '      </nav>\n' +
    '    </div>\n' +
    '\n' +
    '\n' +
    '    <p class="banner-desc">轻松实现<strong class="hlight">一站式</strong>服务!</p>\n' +
    '    <section class="bannerSearchWrap index-search">\n' +
    '        <form class="clearFix">\n' +
    '            <div class="search-input">\n' +
    '              <input type="text" placeholder="只需轻轻输入您的需求 成交物流买卖SO简单！">\n' +
    '            </div>\n' +
    '            <button class="search-btn">我要查询</button>\n' +
    '        </form>\n' +
    '        <p class="search-hot">\n' +
    '            <span>热门关键词：</span>\n' +
    '            <a href="" ng-repeat="k in keys track by $index" bindonce bo-text="k"></a>\n' +
    '        </p>\n' +
    '    </section>\n' +
    '  </section>\n' +
    '</div>\n' +
    '<!-- 列表信息 -->\n' +
    '<div class="layout clearFix indexLists">\n' +
    '    <!-- 运力信息 -->\n' +
    '    <article class="capacityWrap">\n' +
    '        <header class="listBoxTitle">\n' +
    '            <h2>运力信息</h2>\n' +
    '        </header>\n' +
    '        <div class="boxContent">\n' +
    '            <header class="listTop">\n' +
    '                <span class="span1">始发地</span>\n' +
    '                <span class="span2">目的地</span>\n' +
    '                <span class="span3">物流方式</span>\n' +
    '                <span class="span4">发布时间</span>\n' +
    '            </header>\n' +
    '            <div class="listContent" >\n' +
    '              <div class="jSlideWrap">\n' +
    '                <ul ng-repeat="f in capacity track by $index"  list-slide>\n' +
    '                    <li ng-repeat="s in f track by $index">\n' +
    '                        <a href="">\n' +
    '                          <span class="span1">{{s.departure}}</span>\n' +
    '                          <span class="arrow-right"></span>\n' +
    '                          <span class="span2">{{s.destination}}</span>\n' +
    '                          <span class="span3">{{s.lineType}}</span>\n' +
    '                          <span class="span4">{{s.createTime}}</span>\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </article>\n' +
    '    <article class="storageWrap active">\n' +
    '        <header class="listBoxTitle">\n' +
    '            <h2>仓储出租</h2>\n' +
    '        </header>\n' +
    '        <div class="boxContent">\n' +
    '            <header class="listTop">\n' +
    '                <span>地址</span>\n' +
    '                <span>仓库类型</span>\n' +
    '                <span>可用面积</span>\n' +
    '            </header>\n' +
    '            <div class="listContent">\n' +
    '              <div class="jSlideWrap">\n' +
    '                <ul ng-repeat="f in stroage track by $index" list-slide>\n' +
    '                    <li ng-repeat="s in f track by $index">\n' +
    '                      <a href="">\n' +
    '                        <span>{{s.address}}</span>\n' +
    '                        <span>{{s.stroageType}}</span>\n' +
    '                        <span>{{s.space}}</span>\n' +
    '                      </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </article>\n' +
    '    <article class="auctionWrap">\n' +
    '        <header class="listBoxTitle">\n' +
    '            <h2>竞拍信息</h2>\n' +
    '        </header>\n' +
    '        <div class="boxContent">\n' +
    '            <header class="listTop">\n' +
    '              <span class="span1">产品</span>\n' +
    '              <span class="span2">始发地 </span>\n' +
    '              <span class="span3">目的地</span>\n' +
    '              <span class="span4">运输方式</span>\n' +
    '              <span class="span5">发布时间</span>\n' +
    '            </header>\n' +
    '            <div class="listContent">\n' +
    '              <div class="jSlideWrap">\n' +
    '                <ul ng-repeat="f in auction track by $index" list-slide>\n' +
    '                  <li ng-repeat="s in f track by $index">\n' +
    '                    <a href="">\n' +
    '                      <span class="span1">{{s.product}}</span>\n' +
    '                      <span class="span2">{{s.destination}}</span>\n' +
    '                      <span class="arrow-right"></span>\n' +
    '                      <span class="span3">{{s.departure}}</span>\n' +
    '                      <span class="span4">{{s.transportMode}}</span>\n' +
    '                      <span class="span5">{{s.plushDate}}</span>\n' +
    '                    </a>\n' +
    '                  </li>\n' +
    '                </ul>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <!-- <div class="listContent" list-slide="">\n' +
    '                <ul ng-repeat="f in auction track by $index" ng-class="{\'active\': $index === 0}">\n' +
    '                    <li ng-repeat="s in f track by $index">\n' +
    '                      <a href="">\n' +
    '                        <span class="span1">{{s.product}}</span>\n' +
    '                        <span class="span2">{{s.destination}}</span>\n' +
    '                        <span class="arrow-right"></span>\n' +
    '                        <span class="span3">{{s.departure}}</span>\n' +
    '                        <span class="span4">{{s.transportMode}}</span>\n' +
    '                        <span class="span5">{{s.plushDate}}</span>\n' +
    '                      </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '            </div> -->\n' +
    '\n' +
    '        </div>\n' +
    '    </article>\n' +
    '</div>\n' +
    '\n' +
    '<!-- 我们能为你做什么 -->\n' +
    '<section class="index-desc adv-wrap">\n' +
    '  <article class=" layout">\n' +
    '    <header>\n' +
    '        <h2>我们能为你做什么</h2>\n' +
    '        <p class="desc-info">提供专业优质的B2B物流服务，满足您不同行业运输需求</p>\n' +
    '    </header>\n' +
    '    <ul class="adv-lists">\n' +
    '        <li>\n' +
    '            <div class="icon-bg icon-adv1"></div>\n' +
    '            <p class="icon-desc">大宗商品</p>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '            <div class="icon-bg icon-adv2"></div>\n' +
    '            <p class="icon-desc">供应链资源优化</p>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '            <div class="icon-bg icon-adv3"></div>\n' +
    '            <p class="icon-desc">跨境物流</p>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '            <div class="icon-bg icon-adv4"></div>\n' +
    '            <p class="icon-desc">供应链全程可视化</p>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '            <div class="icon-bg icon-adv5"></div>\n' +
    '            <p class="icon-desc">保险通关，商检，法律专项</p>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '            <div class="icon-bg icon-adv6"></div>\n' +
    '            <p class="icon-desc">万物互联</p>\n' +
    '        </li>\n' +
    '\n' +
    '    </ul>\n' +
    '  </article>\n' +
    '</section>\n' +
    '\n' +
    '<section class="index-desc range-wrap">\n' +
    '  <article class="layout">\n' +
    '    <header>\n' +
    '        <h2>全球全覆盖</h2>\n' +
    '        <p class="desc-info">在综合服务区里我们有物流园区、报税区、供应商、物流企业...等你所需要的一切物流服务，聚运通均能以业界领先的技术的服务为你提供高效，快捷的服务体验</p>\n' +
    '    </header>\n' +
    '    <div class="wordmap-wrap">\n' +
    '      <a href="#" class="region r1">中国大陆</a>\n' +
    '      <a href="#" class="region r2">港澳台</a>\n' +
    '      <a href="#" class="region r3">亚洲</a>\n' +
    '      <a href="#" class="region r4">欧洲</a>\n' +
    '      <a href="#" class="region r5">非洲</a>\n' +
    '      <a href="#" class="region r6">南美洲</a>\n' +
    '      <a href="#" class="region r7">北美洲</a>\n' +
    '      <a href="#" class="region r8">澳洲</a>\n' +
    '    </div>\n' +
    '    <ul class="logis-type">\n' +
    '        <li>\n' +
    '          <a href="#">\n' +
    '            <div class="img-wrap">\n' +
    '              <img src="/dist/img/area-icon1.png" alt="">\n' +
    '            </div>\n' +
    '            <p>海运</p>\n' +
    '          </a>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '          <a href="#">\n' +
    '            <div class="img-wrap">\n' +
    '              <img src="/dist/img/area-icon2.png" alt="">\n' +
    '            </div>\n' +
    '            <p>铁路</p>\n' +
    '          </a>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '          <a href="#">\n' +
    '            <div class="img-wrap">\n' +
    '              <img src="/dist/img/area-icon3.png" alt="">\n' +
    '            </div>\n' +
    '            <p>空运</p>\n' +
    '          </a>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '          <a href="#">\n' +
    '            <div class="img-wrap">\n' +
    '              <img src="/dist/img/area-icon4.png" alt="">\n' +
    '            </div>\n' +
    '            <p>联运</p>\n' +
    '          </a>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '          <a href="#">\n' +
    '            <div class="img-wrap">\n' +
    '              <img src="/dist/img/area-icon5.png" alt="">\n' +
    '            </div>\n' +
    '            <p>仓储</p>\n' +
    '          </a>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '          <a href="#">\n' +
    '            <div class="img-wrap">\n' +
    '              <img src="/dist/img/area-icon6.png" alt="">\n' +
    '            </div>\n' +
    '            <p>内河航运</p>\n' +
    '          </a>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '          <a href="#">\n' +
    '            <div class="img-wrap">\n' +
    '              <img src="/dist/img/area-icon7.png" alt="">\n' +
    '            </div>\n' +
    '            <p>公路</p>\n' +
    '          </a>\n' +
    '        </li>\n' +
    '\n' +
    '        <li>\n' +
    '          <a href="#">\n' +
    '            <div class="img-wrap">\n' +
    '              <img src="/dist/img/area-icon8.png" alt="">\n' +
    '            </div>\n' +
    '            <p>供应链</p>\n' +
    '          </a>\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '  </article>\n' +
    '</section>\n' +
    '\n' +
    '<section class="index-desc artner-warap">\n' +
    '  <article class="layout">\n' +
    '      <header>\n' +
    '          <h2>合作伙伴</h2>\n' +
    '      </header>\n' +
    '      <ul class="artner-lists clearfix">\n' +
    '        <li ng-repeat="l in artner" bindonce>\n' +
    '            <a bo-href="l.href">\n' +
    '                <img bo-src="l.logo" bo-alt="l.name">\n' +
    '            </a>\n' +
    '        </li>\n' +
    '      </ul>\n' +
    '  </article>\n' +
    '</section>\n' +
    '\n' +
    '<div class="shop-wrap">\n' +
    '  <div class="shop-wrap-bg"></div>\n' +
    '  <div class="shop-lists">\n' +
    '    <a href="#" class="shop-item">\n' +
    '      <p class="cn">口岸馆</p>\n' +
    '      <p class="en">Port Museum</p>\n' +
    '    </a>\n' +
    '\n' +
    '    <a href="#" class="shop-item">\n' +
    '      <p class="cn">园区馆</p>\n' +
    '      <p class="en">Park Pavilion</p>\n' +
    '    </a>\n' +
    '\n' +
    '    <a href="#" class="shop-item">\n' +
    '      <p class="cn">物流品牌馆</p>\n' +
    '      <p class="en">Logistics brand Pavilion</p>\n' +
    '    </a>\n' +
    '  </div>\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '<!--\n' +
    '<div class="row">\n' +
    '        <div class="col-md-6">\n' +
    '            <p class="input-group">\n' +
    '              <input type="text"\n' +
    '                class="form-control"\n' +
    '                datepicker-popup="{{format}}"\n' +
    '                ng-model="dt"\n' +
    '                datepicker-mode="year"\n' +
    '                is-open="opened"\n' +
    '                min-date="minDate"\n' +
    '                max-date="\'2016-08-22\'"\n' +
    '                datepicker-options="dateOptions"\n' +
    '                date-disabled="disabled(date, mode)"\n' +
    '                ng-required="true"\n' +
    '                close-text="Close" />\n' +
    '\n' +
    '              <span class="input-group-btn">\n' +
    '                <button type="button" class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button>\n' +
    '              </span>\n' +
    '            </p>\n' +
    '        </div>\n' +
    '    </div> -->\n' +
    '\n' +
    '<!-- <h2>{{ title }}</h2>\n' +
    '\n' +
    '<div select-address></div>\n' +
    '\n' +
    '<div class="demo"></div>\n' +
    '<div class="demo2"></div>\n' +
    '<div class="demo3"></div>\n' +
    '\n' +
    '<div class="row">\n' +
    '        <div class="col-md-6">\n' +
    '            <p class="input-group">\n' +
    '              <input type="text"\n' +
    '                class="form-control"\n' +
    '                datepicker-popup="{{format}}"\n' +
    '                ng-model="dt"\n' +
    '                datepicker-mode="year"\n' +
    '                is-open="opened"\n' +
    '                min-date="minDate"\n' +
    '                max-date="\'2016-08-22\'"\n' +
    '                datepicker-options="dateOptions"\n' +
    '                date-disabled="disabled(date, mode)"\n' +
    '                ng-required="true"\n' +
    '                close-text="Close" />\n' +
    '\n' +
    '              <span class="input-group-btn">\n' +
    '                <button type="button" class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button>\n' +
    '              </span>\n' +
    '            </p>\n' +
    '        </div>\n' +
    '    </div>\n' +
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
    '\n' +
    '<p>\n' +
    '  <input type="text" ng-model="sessionStorage">\n' +
    '  <button type="button" name="button" ng-click="setSessionStroage()">设置sessionStorage</button>\n' +
    '  <button type="button" name="button" ng-click="getsessionStroage()">获取sessionStorage</button>\n' +
    '</p> -->\n' +
    '<!-- <div silder data="datas"></div> -->\n' +
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
    '<div class="layout clearfix">\n' +
    '    <div class="pull-left">\n' +
    '        <section class="ibox enquiry-box">\n' +
    '            <header class="ibox-header clearfix">\n' +
    '                <h2>我要询价</h2>\n' +
    '            </header>\n' +
    '            <div class="ibox-cont">\n' +
    '                <div class="search-group clearfix">\n' +
    '                    <h4 class="search-group-title">物流方式：</h4>\n' +
    '                    <div class="search-group-cont">\n' +
    '                        <div class="jm-radio" ng-class="{\'jm-radio-checked\': type.value === search.lineType}" ng-repeat="type in lineTypes track by $index">\n' +
    '                            <label>\n' +
    '                                <input type="radio" name="t1" ng-value="type.value" ng-model="search.lineType"> {{ type.name }}\n' +
    '                            </label>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="search-group clearfix">\n' +
    '                    <h4 class="search-group-title">输入地点：</h4>\n' +
    '                    <div class="search-group-cont">\n' +
    '                      <input\n' +
    '                        type="text"\n' +
    '                        jm-addr\n' +
    '                        headers="startHeaders"\n' +
    '                        ng-model="startCity"\n' +
    '                        data="data"\n' +
    '                        view-value="startCity"\n' +
    '                        placeholder="始发地"\n' +
    '                      /> -\n' +
    '                      <input\n' +
    '                        type="text"\n' +
    '                        jm-addr\n' +
    '                        headers="endHeaders"\n' +
    '                        ng-model="endCity"\n' +
    '                        data="data"\n' +
    '                        view-value="endCity"\n' +
    '                        placeholder="目的地"\n' +
    '                      />\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="search-group clearfix">\n' +
    '                    <h4 class="search-group-title">输入时间：</h4>\n' +
    '                    <div class="search-group-cont date-pick">\n' +
    '                        <input\n' +
    '                          type="text"\n' +
    '                          placeholder="预计发货时间"\n' +
    '                          datepicker-popup="yyyy/MM/dd"\n' +
    '                          ng-model="search.endDate"\n' +
    '                          datepicker-mode="year"\n' +
    '                          ng-focus="open1()"\n' +
    '                          min-date="search.startDate"\n' +
    '                          is-open="opened1"\n' +
    '                          datepicker-options="startDateOptions"\n' +
    '                          close-text="关闭"\n' +
    '                        /> -\n' +
    '                        <input\n' +
    '                          type="text"\n' +
    '                          placeholder="预计到货时间"\n' +
    '                          datepicker-popup="yyyy/MM/dd"\n' +
    '                          ng-model="search.endDate"\n' +
    '                          datepicker-mode="year"\n' +
    '                          ng-focus="open2()"\n' +
    '                          min-date="search.startDate"\n' +
    '                          is-open="opened2"\n' +
    '                          datepicker-options="endDateOptions"\n' +
    '                          close-text="关闭"\n' +
    '                        />\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="search-group clearfix pull-left">\n' +
    '                    <h4 class="search-group-title">国内通关服务：</h4>\n' +
    '                    <div class="search-group-cont">\n' +
    '                        <div class="jm-radio" ng-class="{\'jm-radio-checked\': search.custService === 1}">\n' +
    '                            <label>\n' +
    '                                <input type="radio" name="t2" ng-model="search.custService" value="1"> 需要\n' +
    '                            </label>\n' +
    '                        </div>\n' +
    '                        <div class="jm-radio" ng-class="{\'jm-radio-checked\': search.custService === 0}">\n' +
    '                            <label>\n' +
    '                                <input type="radio" name="t2" ng-model="search.custService" value="0"> 不需要\n' +
    '                            </label>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="search-group pull-left p-l-30 ">\n' +
    '                    <h4 class="search-group-title">目的港清关服务：</h4>\n' +
    '                    <div class="search-group-cont">\n' +
    '                        <div class="jm-radio" ng-class="{\'jm-radio-checked\': search.custClear === 1}">\n' +
    '                            <label>\n' +
    '                                <input type="radio" name="t3" value="1" ng-model="search.custClear" value="1"> 需要\n' +
    '                            </label>\n' +
    '                        </div>\n' +
    '                        <div class="jm-radio" ng-class="{\'jm-radio-checked\': search.custClear === 0}">\n' +
    '                            <label>\n' +
    '                                <input type="radio" name="t3" value="0" ng-model="search.custClear" value="0"> 不需要\n' +
    '                            </label>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <p class="search-btn">\n' +
    '                    <button class="jm-btn jm-btn-wraing">查询</button>\n' +
    '                </p>\n' +
    '            </div>\n' +
    '        </section>\n' +
    '        <section class="ibox enquiry-box enquiry-box-data">\n' +
    '            <header class="ibox-header clearfix">\n' +
    '                <h2>线路信息 <small>共<i class="hight-color">149</i>条</small></h2>\n' +
    '                <!-- 字段排序 -->\n' +
    '                <div class="sort-items">\n' +
    '                    <button ng-click="sort(\'tonnage\')" class="sort-item" ng-class="{\'active\': sortFiled === \'tonnage\'}">吨位\n' +
    '                    </button>\n' +
    '                    <button ng-click="sort(\'orderNums\')" class="sort-item" ng-class="{\'active\': sortFiled === \'orderNums\'}">订单数\n' +
    '                    </button>\n' +
    '                    <button ng-click="sort(\'level\')" class="sort-item" ng-class="{\'active\': sortFiled === \'level\'}">等级\n' +
    '                    </button>\n' +
    '                </div>\n' +
    '                <!-- 分页 -->\n' +
    '                <div class="lists-heade-page pull-right">\n' +
    '                    <span>1/10</span>\n' +
    '                    <button ng-click="selectPage(currentPage - 1)" ng-disabled="currentPage === 1">&lt;\n' +
    '                    </button>\n' +
    '                    <button ng-click="selectPage(currentPage + 1)" ng-disabled="currentPage === totalPage">&gt;\n' +
    '                    </button>\n' +
    '                </div>\n' +
    '            </header>\n' +
    '            <div class="ibox-cont border-primary no-padding  no-border">\n' +
    '                <div class="data-table-wrap enquiry-data">\n' +
    '                    <header class="data-table-header">\n' +
    '                        <ul>\n' +
    '                            <li class="span1">物流供应商</li>\n' +
    '                            <li class="span2">始发地</li>\n' +
    '                            <li class="span3">目的地</li>\n' +
    '                            <li class="span4">预计开始时间</li>\n' +
    '                            <li class="span5">预计到达时间</li>\n' +
    '                            <li class="span6">装载类型</li>\n' +
    '                            <li class="span7">订单数</li>\n' +
    '                            <li class="span8">报价</li>\n' +
    '                            <li class="span9">操作</li>\n' +
    '                        </ul>\n' +
    '                    </header>\n' +
    '                    <div class="data-table-cont">\n' +
    '                        <ul>\n' +
    '                            <li ng-class="{\'last\':  $last}" ng-repeat="li in lists">\n' +
    '                                <a href="" tr-show-detail item="item">\n' +
    '                                    <!-- 供应商 -->\n' +
    '                                    <span class="span1">双来海运公司</span>\n' +
    '                                    <!-- 始发地 -->\n' +
    '                                    <span class="span2">宁波</span>\n' +
    '                                    <!-- 目的地 -->\n' +
    '                                    <span class="span3">福建</span>\n' +
    '                                    <!-- 预计是否时间 -->\n' +
    '                                    <span class="span4">2016-07-25</span>\n' +
    '                                    <!-- 预计到达时间 -->\n' +
    '                                    <span class="span5">2016-07-25</span>\n' +
    '                                    <!-- 装载类型 -->\n' +
    '                                    <span class="span6">\n' +
    '                    <p>挂车</p>\n' +
    '                    <p>17.6米 8.00吨</p>\n' +
    '                  </span>\n' +
    '                                    <!-- 订单数 -->\n' +
    '                                    <span class="span7">\n' +
    '                    23单\n' +
    '                  </span>\n' +
    '                                    <!-- 报价 -->\n' +
    '                                    <span class="span8">\n' +
    '                    6557.00\n' +
    '                  </span>\n' +
    '                                    <!-- 操作 -->\n' +
    '                                    <span class="last span9">\n' +
    '                    <button ng-click="sendGoods()" class="sendBtn">我要下单</button>\n' +
    '                  </span>\n' +
    '                                </a>\n' +
    '                            </li>\n' +
    '                        </ul>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '        </section>\n' +
    '        <!-- 分页 -->\n' +
    '        <div class="page-list-wrap clearfix">\n' +
    '            <div pagination total-items="totalItems" ng-model="currentPage" previous-text="&lt;" next-text="&gt;" ng-change="pageChanged()" max-size="maxSize" class="page-list pagination-sm" direction-links="true" num-pages="totalPage">\n' +
    '            </div>\n' +
    '            <div class="select-page-wrap">\n' +
    '                第\n' +
    '                <input type="text" ng-model="page" ng-blur="selectPage(page)">页/共{{ totalPage }}页\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        </div>\n' +
    '\n' +
    '\n' +
    '        <div class="pull-right quick-bar">\n' +
    '            <div class="quick-order">\n' +
    '                <button class="jm-btn jm-btn-lg jm-btn-primary">快速下单</button>\n' +
    '                <button class="jm-btn jm-btn-lg">发布竞拍</button>\n' +
    '            </div>\n' +
    '            <section class="ibox quick-auction">\n' +
    '                <header class="ibox-header">\n' +
    '                    <h2>快捷竞拍</h2>\n' +
    '                </header>\n' +
    '                <div class="ibox-cont no-padding">\n' +
    '                    <div class="auction-item">\n' +
    '                        <h3 class="pro-name"><a href="">化工原材料PPLA1205 230吨</a></h3>\n' +
    '                        <p class="client">\n' +
    '                            <label class="label">委托方：</label>杭州化工公司</p>\n' +
    '                        <p class="delivery-tm">\n' +
    '                            <label class="label">发货时间：</label>2016-07-25 13：15:09</p>\n' +
    '                        <p>\n' +
    '                            <label class="label">剩余时间：</label>\n' +
    '                            <time class="count-down" countdown endTm="2016/08/02 16:03:00">00 天00时10分10秒</time>\n' +
    '                        </p>\n' +
    '                        <ul class="summary">\n' +
    '                            <li>\n' +
    '                                <label class="label">始发地：</label>杭州滨江区</li>\n' +
    '                            <li>\n' +
    '                                <label class="label">目的地：</label>上海虹桥</li>\n' +
    '                            <li>\n' +
    '                                <label class="label">城&nbsp;&nbsp;市：</label>杭州</li>\n' +
    '                            <li>\n' +
    '                                <label class="label">仓&nbsp;&nbsp;库：</label>西湖广场</li>\n' +
    '                        </ul>\n' +
    '                        <footer class="ibox-footer">\n' +
    '                            <button class="jm-btn">参与竞拍</button>\n' +
    '                            <p class="pull-right">已有<span class="auction-number">12</span>参加</p>\n' +
    '                        </footer>\n' +
    '                    </div>\n' +
    '                    <div class="auction-item disabled">\n' +
    '                        <h3 class="pro-name"><a href="">化工原材料PPLA1205 230吨</a></h3>\n' +
    '                        <p class="client">\n' +
    '                            <label class="label">委托方：</label>杭州化工公司</p>\n' +
    '                        <p class="delivery-tm">\n' +
    '                            <label class="label">发货时间：</label>2016-07-25 13：15:09</p>\n' +
    '                        <ul class="summary">\n' +
    '                            <li>\n' +
    '                                <label class="label">始发地：</label>杭州滨江区</li>\n' +
    '                            <li>\n' +
    '                                <label class="label">目的地：</label>上海虹桥</li>\n' +
    '                            <li>\n' +
    '                                <label class="label">城&nbsp;&nbsp;市：</label>杭州</li>\n' +
    '                            <li>\n' +
    '                                <label class="label">仓&nbsp;&nbsp;库：</label>西湖广场</li>\n' +
    '                        </ul>\n' +
    '                        <footer class="ibox-footer">\n' +
    '                            <button class="jm-btn jm-btn-disabled">竞拍结束</button>\n' +
    '                            <p class="pull-right">已有<span class="auction-number">12</span>参加</p>\n' +
    '                        </footer>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </section>\n' +
    '        </div>\n' +
    '    </div>\n' +
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
    '<!-- 面包屑 -->\n' +
    '<!-- <div class="layout ">\n' +
    '<div class="crumbs">\n' +
    '<span class="crumbs-item">聚运通栏目列表</span>\n' +
    '<span class="crumbs-item-current">\n' +
    '<a href="" class="current-page">运费特惠</a>\n' +
    '<nav class="subNav" ng-show="checked">\n' +
    '<ul>\n' +
    '    <li class="icon-index"><a href="#">聚运通首页</a></li>\n' +
    '    <li class="icon-order"><a href="#">我要下单</a></li>\n' +
    '    <li class="icon-freight"><a ui-sref="specials">运费特惠</a></li>\n' +
    '    <li class="icon-advice"><a href="#">仓储特惠</a></li>\n' +
    '    <li class="icon-logis"><a href="#">物流跟踪</a></li>\n' +
    '    <li class="icon-service"><a href="#">服务中心</a></li>\n' +
    '</ul>\n' +
    '</nav>\n' +
    '</span>\n' +
    '</div>\n' +
    '</div> -->\n' +
    '<div crumbs></div>\n' +
    '\n' +
    '<!-- 搜索条件选择 -->\n' +
    '<div class="layout select-filter-wrap">\n' +
    '  <div \n' +
    '    select-filter \n' +
    '    title="特惠类型" \n' +
    '    model="search.prefType" \n' +
    '    options="prefTypes" \n' +
    '    on-select="onSelect(list)">\n' +
    '  </div>\n' +
    '  \n' +
    '  <div \n' +
    '    select-filter \n' +
    '    title="装载类型" \n' +
    '    model="search.loadType" \n' +
    '    options="loadTypes" \n' +
    '    on-select="onSelect(list)">\n' +
    '  </div>\n' +
    '  \n' +
    '  <div \n' +
    '    select-filter \n' +
    '    title="区域" \n' +
    '    model="search.area" \n' +
    '    options="areas" \n' +
    '    on-select="onSelect(list)">\n' +
    '  </div>\n' +
    '</div>\n' +
    '\n' +
    '<!-- 输入搜索和表格列表 -->\n' +
    '<div class="layout select-search-main">\n' +
    '  <div class="select-search-warp clearFix">\n' +
    '    <div input-muilts-search class="pull-left">\n' +
    '      <h2>线路信息 <small>共<span class="nums">{{ totalItems }}</span>条</small></h2>\n' +
    '        <div class="inputs">\n' +
    '            <input type="text"> -\n' +
    '            <input type="text">\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="inputs date-pick">\n' +
    '            <input \n' +
    '              type="text" \n' +
    '              datepicker-popup="yyyy/MM/dd" \n' +
    '              ng-model="search.startDate" \n' +
    '              datepicker-mode="year" \n' +
    '              ng-focus="open1()" \n' +
    '              is-open="opened1" \n' +
    '              datepicker-options="startDateOptions" \n' +
    '              close-text="Close" /> -\n' +
    '            <input \n' +
    '              type="text" \n' +
    '              datepicker-popup="yyyy/MM/dd" \n' +
    '              ng-model="search.endDate" \n' +
    '              datepicker-mode="year" \n' +
    '              ng-focus="open2()" \n' +
    '              min-date="search.startDate" \n' +
    '              is-open="opened2" \n' +
    '              datepicker-options="endDateOptions" \n' +
    '              close-text="关闭" />\n' +
    '        </div>\n' +
    '\n' +
    '        <!-- 字段排序 -->\n' +
    '        <div class="sort-items">\n' +
    '            <span \n' +
    '              ng-click="sort(\'level\')" \n' +
    '              class="sort-item" \n' +
    '              ng-class="{\'active\': sortFiled === \'level\'}">级别\n' +
    '            </span>\n' +
    '            \n' +
    '            <span \n' +
    '              ng-click="sort(\'price\')" \n' +
    '              class="sort-item"\n' +
    '              ng-class="{\'active\': sortFiled === \'price\'}">价格\n' +
    '            </span>\n' +
    '        </div>\n' +
    '        <button class="searchBtn" ng-click="getSpecials()">查询</button>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <div class="select-search-data">\n' +
    '    <div class="lists-heade-page">\n' +
    '        <span>{{ currentPage }}/{{totalPage}}</span>\n' +
    '        <button \n' +
    '          ng-click="selectPage(currentPage - 1)" \n' +
    '          ng-disabled="currentPage === 1">&lt;\n' +
    '        </button>\n' +
    '        \n' +
    '        <button \n' +
    '          ng-click="selectPage(currentPage + 1)"\n' +
    '          ng-disabled="currentPage === totalPage">&gt;\n' +
    '\n' +
    '        </button>\n' +
    '    </div>\n' +
    '    <!-- 模拟表格 -->\n' +
    '    <div class="data-table-wrap" style="display:table">\n' +
    '      <header class="data-table-header">\n' +
    '        <ul>\n' +
    '          <li class="span1">供应商</li>\n' +
    '          <li class="span2">区域</li>\n' +
    '          <li class="span12">线路</li>\n' +
    '          <li class="span5">级别</li>\n' +
    '          <li ng-class="{\'span6\': search.prefType === 0, \'span16\': search.prefType === 1}">特惠类型</li>\n' +
    '          <li class="span13" ng-if="search.prefType === 1">特惠时间</li>\n' +
    '          <li class="span15" ng-if="search.prefType === 1">转载类型</li>\n' +
    '          <li class="span7" ng-if="search.prefType === 0">车型+车长</li>\n' +
    '          <li class="span8" ng-if="search.prefType === 0">价格</li>\n' +
    '          <li class="span9" ng-if="search.prefType === 0">有效时间</li>\n' +
    '          <li class="span10" ng-if="search.prefType === 0">数量</li>\n' +
    '          <li ng-class="{\'span11\': search.prefType === 0, \'span17\': search.prefType === 1}">操作</li>\n' +
    '        </ul>\n' +
    '      </header>\n' +
    '\n' +
    '      <div class="data-table-cont">\n' +
    '        <ul>\n' +
    '          <li \n' +
    '            ng-repeat="item in specials" \n' +
    '            bindonce \n' +
    '            ng-class="{\'last\':  $last}">\n' +
    '            <a href="" tr-show-detail item="item">\n' +
    '              <!-- 供应商 -->\n' +
    '              <span class="span1 ">\n' +
    '                <i class="toggle plus"></i>\n' +
    '                <img bo-src="item.supplier">\n' +
    '              </span>\n' +
    '\n' +
    '              <!-- 区域 -->\n' +
    '              <span class="span2" bo-text="item.area"></span>\n' +
    '\n' +
    '\n' +
    '              <!-- 线路折扣线路 -->\n' +
    '              <span class="span12">\n' +
    '                <p><i>始发地：</i><i bo-text="item.departure"></i></p>\n' +
    '                <p><i>目的地：</i><i bo-text="item.destination"></i></p>\n' +
    '                <p bo-text="item.discount"></p>\n' +
    '              </span>\n' +
    '              \n' +
    '              <!-- 级别 -->\n' +
    '              <span class="span5">\n' +
    '                <p bo-text="item.level"></p>\n' +
    '                <p bo-text="item.level"></p>\n' +
    '              </span>\n' +
    '\n' +
    '              <!-- 特惠类型 -->\n' +
    '              <span \n' +
    '                ng-class="{\'span6\': search.prefType === 0, \'span16\': search.prefType === 1}">\n' +
    '                <p bo-text="item.preferenceType"></p>\n' +
    '                <p ng-if="search.prefType === 1" bo-text="item.preferenceTypeRemarker"></p>\n' +
    '              </span>\n' +
    '\n' +
    '              <!-- 回程车车型车长 -->\n' +
    '              <span class="span7" ng-if="search.prefType === 0" bo-text="item.car"></span>\n' +
    '      \n' +
    '              <!-- 回程车价格 -->\n' +
    '              <span \n' +
    '                class="span8 item-price" \n' +
    '                ng-if="search.prefType === 0" \n' +
    '                bo-text="item.price">\n' +
    '              </span>\n' +
    '\n' +
    '              <!-- 回程车有效时间 -->\n' +
    '              <span class="span9" ng-if="search.prefType === 0">\n' +
    '                <i bo-text="item.startDate"></i> - <i bo-text="item.endDate"></i>\n' +
    '              </span>\n' +
    '              \n' +
    '              <!-- 回程车数量 -->\n' +
    '              <span class="span10" ng-if="search.prefType === 0" bo-text="item.carNum"></span>\n' +
    '              \n' +
    '              <!-- 线路折扣特惠时间 -->\n' +
    '              <span class="span13"  ng-if="search.prefType === 1">\n' +
    '                <time bo-text="item.startDate"></time> - \n' +
    '                <time bo-text="item.endDate"></time>\n' +
    '              </span>\n' +
    '              \n' +
    '              \n' +
    '              <!-- 线路折扣转载类型 -->\n' +
    '              <span class="span15" ng-if="search.prefType === 1" bo-text="item.loadType"></span>\n' +
    '              \n' +
    '              <!-- 操作 -->\n' +
    '              <span class="last" ng-class="{\'span11\': search.prefType === 0, \'span17\': search.prefType === 1}">\n' +
    '                <button ng-click="sendGoods()" class="sendBtn">发货 &gt;</button>\n' +
    '                <i href="#" class="icon-qq"></i>\n' +
    '                <i href="#" class="icon-qq"></i>\n' +
    '              </span>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '        </ul>\n' +
    '      </div>\n' +
    '        \n' +
    '\n' +
    '        <!-- 分页 -->\n' +
    '      <div class="page-list-wrap clearfix">\n' +
    '\n' +
    '        <div \n' +
    '          pagination \n' +
    '           total-items="totalItems" \n' +
    '           ng-model="currentPage" \n' +
    '           previous-text="&lt;" \n' +
    '           next-text="&gt;" \n' +
    '           ng-change="pageChanged()"\n' +
    '           max-size="maxSize" \n' +
    '           class="page-list pagination-sm" \n' +
    '           direction-links="true"\n' +
    '           num-pages="totalPage">\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="select-page-wrap">\n' +
    '          第<input type="text" ng-model="page" ng-blur="selectPage(page)">页/共{{ totalPage }}页\n' +
    '        </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n' +
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
  $templateCache.put('/dist/page/specials_detail.html',
    '<crumbs></crumbs>\n' +
    '\n' +
    '<!-- 搜索条件选择 -->\n' +
    '<div class="layout clearFix">\n' +
    '  <div class="detail-info">\n' +
    '    <table>\n' +
    '      <tbody>\n' +
    '        <tr>\n' +
    '          <td width="56" class="title">线路编号</td>\n' +
    '          <td width="312" class="value">GWHY0100010038</td>\n' +
    '          <td width="80" class="title">特惠开始时间</td>\n' +
    '          <td width="218" class="value">2016-06-15</td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '          <td class="title">线路名称</td>\n' +
    '          <td class="value">杭州至广州专线</td>\n' +
    '          <td class="title">特惠结束时间</td>\n' +
    '          <td class="value">2016-07-21</td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '          <td class="title">始发地</td>\n' +
    '          <td class="value">杭州</td>\n' +
    '          <td class="title">转载类型</td>\n' +
    '          <td class="value">散装</td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '          <td class="title">目的地</td>\n' +
    '          <td class="value">广州</td>\n' +
    '          <td class="title">订单数</td>\n' +
    '          <td class="value">121单</td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '          <td class="title">供应商</td>\n' +
    '          <td class="value">宁波海运公司</td>\n' +
    '          <td class="title">供应商级别</td>\n' +
    '          <td class="value">三星 </td>\n' +
    '        </tr>\n' +
    '        <tr class="product-marker">\n' +
    '          <td class="title">产品备注</td>\n' +
    '          <td colspan="3" class="value">\n' +
    '            该路线是有宁波海运公司内河路线运输，\n' +
    '             只供原材料及化工产品的材质运输.<br />改路线的船只钢材材质，内河吞吐量在5000吨-10000吨之间.\n' +
    '          </td>\n' +
    '        </tr>\n' +
    '      </tbody>\n' +
    '    </table>\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="detail-service-wrap">\n' +
    '    <div class="service-help">\n' +
    '      <p>咨询热线</p>\n' +
    '      <p>400-251468-122</p>\n' +
    '      <p>服务时间：周一至周五</p>\n' +
    '      <p>QQ客服：<span class="icon-qq2"></span><span class="icon-qq2"></span></p>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="service-btns">\n' +
    '      <button class="order">我要下单</button>\n' +
    '      <button>呼叫客服</button>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '<div class="layout logi-info">\n' +
    '  <section class="logi-list-info">\n' +
    '    <h2 class="title">物流信息</h2>\n' +
    '    <div class="logi-item-cont">\n' +
    '      <ul>\n' +
    '        <li>\n' +
    '          <span class="title">线路编号：</span>\n' +
    '          <p class="value">0014</p>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '          <span class="title">道路运输许可证经营范围：</span>\n' +
    '          <p class="value">亚洲，港澳，台湾</p>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '          <span class="title">物流覆盖范围/专线：</span>\n' +
    '          <p class="value">全国</p>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '          <span class="title">车辆信息：</span>\n' +
    '          <p class="value">XXXX</p>\n' +
    '        </li>\n' +
    '\n' +
    '        <li>\n' +
    '          <span class="title">车型：</span>\n' +
    '          <p class="value">集装箱，货车，卡车，板车</p>\n' +
    '        </li>\n' +
    '\n' +
    '        <li>\n' +
    '          <span class="title">车长（M）：</span>\n' +
    '          <p class="value">100*200m，	200*300m，50*80m</p>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '          <span class="title">吨位（T）：</span>\n' +
    '          <p class="value">500T</p>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '          <span class="title">车牌号：</span>\n' +
    '          <p class="value">TDX12345</p>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '          <span class="title">联运服务：</span>\n' +
    '          <p class="value">门到门  门到港  门到仓 </p>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '          <span class="title">报价方式1：</span>\n' +
    '          <p class="value">元/公里,元/吨(公斤),元/立方，整车，包车</p>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '          <span class="title">报价方式2：</span>\n' +
    '          <p class="value">仓储费/入库费/出库费/转货权费/免费堆存期    </p>\n' +
    '        </li>\n' +
    '      </ul>\n' +
    '    </div>\n' +
    '  </section>\n' +
    '\n' +
    '  <section class="recent-transac-wrap">\n' +
    '    <h2 class="title">近期交易</h2>\n' +
    '    <div class="logi-item-cont">\n' +
    '      <table>\n' +
    '        <thead>\n' +
    '          <tr>\n' +
    '            <th width="15%">货品</th>\n' +
    '            <th width="10%">体积</th>\n' +
    '            <th width="10%">毛重</th>\n' +
    '            <th width="10%">形态</th>\n' +
    '            <th width="15%">委托方</th>\n' +
    '            <th width="20%">发货时间</th>\n' +
    '            <th>完成交易时间</th>\n' +
    '          </tr>\n' +
    '        </thead>\n' +
    '\n' +
    '        <tbody>\n' +
    '          <tr>\n' +
    '            <td>化工原材料</td>\n' +
    '            <td>1000个立方</td>\n' +
    '            <td>50000吨</td>\n' +
    '            <td>固体</td>\n' +
    '            <td>货运中国网</td>\n' +
    '            <td>2016-06-10 12：12：50</td>\n' +
    '            <td class="success-date">2016-06-10 12：12：50</td>\n' +
    '          </tr>\n' +
    '          <tr>\n' +
    '            <td>化工原材料</td>\n' +
    '            <td>1000个立方</td>\n' +
    '            <td>50000吨</td>\n' +
    '            <td>固体</td>\n' +
    '            <td>货运中国网</td>\n' +
    '            <td>2016-06-10 12：12：50</td>\n' +
    '            <td class="success-date">2016-06-10 12：12：50</td>\n' +
    '          </tr>\n' +
    '          <tr>\n' +
    '            <td>化工原材料</td>\n' +
    '            <td>1000个立方</td>\n' +
    '            <td>50000吨</td>\n' +
    '            <td>固体</td>\n' +
    '            <td>货运中国网</td>\n' +
    '            <td>2016-06-10 12：12：50</td>\n' +
    '            <td class="success-date">2016-06-10 12：12：50</td>\n' +
    '          </tr>\n' +
    '          <tr>\n' +
    '            <td>化工原材料</td>\n' +
    '            <td>1000个立方</td>\n' +
    '            <td>50000吨</td>\n' +
    '            <td>固体</td>\n' +
    '            <td>货运中国网</td>\n' +
    '            <td>2016-06-10 12：12：50</td>\n' +
    '            <td class="success-date">2016-06-10 12：12：50</td>\n' +
    '          </tr>\n' +
    '          <tr>\n' +
    '            <td>化工原材料</td>\n' +
    '            <td>1000个立方</td>\n' +
    '            <td>50000吨</td>\n' +
    '            <td>固体</td>\n' +
    '            <td>货运中国网</td>\n' +
    '            <td>2016-06-10 12：12：50</td>\n' +
    '            <td class="success-date">2016-06-10 12：12：50</td>\n' +
    '          </tr>\n' +
    '          <tr>\n' +
    '            <td>化工原材料</td>\n' +
    '            <td>1000个立方</td>\n' +
    '            <td>50000吨</td>\n' +
    '            <td>固体</td>\n' +
    '            <td>货运中国网</td>\n' +
    '            <td>2016-06-10 12：12：50</td>\n' +
    '            <td class="success-date">2016-06-10 12：12：50</td>\n' +
    '          </tr>\n' +
    '        </tbody>\n' +
    '      </table>\n' +
    '    </div>\n' +
    '  </section>\n' +
    '\n' +
    '  <section class="enterprise-honor-wrap">\n' +
    '    <h2 class="title">企业荣誉</h2>\n' +
    '    <div class="logi-item-cont clearFix">\n' +
    '      <div class="honor-pic"><img width="100%" height="100%" src="http://image1.maisulang.com/upload/PC/2016/06/30/14/43282045090490401.jpg" alt=""></div>\n' +
    '      <div class="honor-cont">\n' +
    '        <p>1、长年获地区纳税大户称号。</p>\n' +
    '        <p>2、成都市物流协会会长单位。</p>\n' +
    '        <p>3、四川省现代物流协会副会长单位。</p>\n' +
    '        <p>4、2007年公司董事长刘显付先生荣获＂全国物流行业劳动模范＂称号；</p>\n' +
    '        <p>5、2007年度获评＂成都市最佳公路物流企业＂、＂十大最具影响力物流企业＂；上海庄臣颁发＂合格供应商＂证书。</p>\n' +
    '        <p>6、2008年被成都物流协会授予物流行业5.12抗震救灾＂先进集体＂称号、百事可乐颁发＂最佳执行力＂奖牌；</p>\n' +
    '        <p>7、2009年被双流县临空服务业委员会、中共双流县委办公室与双流县人民政府办公室、双流县金融工作办公室与双流县信用促进会、四川省政府分别授予＂纳税先进企业＂、＂安全生产先进单位＂、年度服务业＂先进企业＂、＂讲诚信，守信用＂、＂四川服务名牌＂称号；</p>\n' +
    '        <p>8、2009年荣获四川省人民政府颁发＂四川服务名牌＂名牌企业称号持续通过年审；</p>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </section>\n' +
    '</div>\n' +
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
  $templateCache.put('/dist/page/track.html',
    '<h2>{{ title }}</h2>');
}]);
})();
