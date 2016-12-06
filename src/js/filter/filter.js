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

// 图片服务器地址
app.filter('imgOrigin',  function($sce, IMG_ADDRESS) {
    return function(input, url, imgAddr) {
        if (url) {
            return $sce.trustAsResourceUrl(url + input);
        } else {
            if (imgAddr) {
                return $sce.trustAsResourceUrl(imgAddr + input);
            } else {
                return $sce.trustAsResourceUrl(IMG_ADDRESS + input);
            }
        }
    };
});

app.filter('to_trusted', function($sce) {
    return function(text) {
        return $sce.trustAsHtml(text);
    };
});
