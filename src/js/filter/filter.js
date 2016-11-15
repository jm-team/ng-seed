var app = require('../app');
// 资源CDN路径
app.filter('cdn',  function($sce, CDN_ADDRESS) {
    return function(input, url, cdnAddr) {
        if (url) {
            return $sce.trustAsResourceUrl(url + input);
        } else {
            if (cdnAddr) {
                return $sce.trustAsResourceUrl(cdnAddr + input);
            } else {
                return $sce.trustAsResourceUrl(CDN_ADDRESS + input);
            }
        }
    };
});

app.filter('to_trusted', function($sce) {
    return function(text) {
        return $sce.trustAsHtml(text);
    };
});
