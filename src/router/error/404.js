var templateUrl = require('page/error/404.html');

module.exports = {
    url: '/404',
    templateUrl: templateUrl,
    controller: function () {
        setPrerenderStatusCode(404);

        // 解决爬虫爬取404页面 statusCode 200问题 https://prerender.io/documentation/best-practices
        function setPrerenderStatusCode(statusCode) {
            var meta = document.createElement('meta');
            meta.name = "prerender-status-code";
            meta.content = statusCode || "404";
            document.getElementsByTagName('head')[0].appendChild(meta);
        }
    },
    data: {
        displayName: ''
    }
};