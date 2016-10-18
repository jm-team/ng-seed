var app = require('../app')
app.filter('cdn',  function($sce) {
    return function(input, url, cdnAddr) {
        if (url) {
            return $sce.trustAsResourceUrl(url + input);
        } else {
            if (cdnAddr) {
                return $sce.trustAsResourceUrl(cdnAddr + input);
            } else {
                return $sce.trustAsResourceUrl('http://static.jumoreyun.com' + input);
            }
        }
    }
});

app.filter('to_trusted', function($sce) {
    return function(text) {
        return $sce.trustAsHtml(text);
    }
});
