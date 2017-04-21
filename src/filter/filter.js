var app = require('app');

// 资源CDN路径
app.filter('cdn', function ($sce, CDN_ADDRESS) {
    /**
     * cdn 过滤器处理
     * @author zhoul
     * @param   {string} input   需要处理的url
     * @param   {string} url     普通地址
     * @param   {string} cdnAddr 自定义cdn地址
     * @returns {string} 处理后的url
     */
    function fn(input, url, cdnAddr) {
        if (url) {
            return $sce.trustAsResourceUrl(url + input);
        } else {
            if (cdnAddr) {
                return $sce.trustAsResourceUrl(cdnAddr + input);
            } else {
                return $sce.trustAsResourceUrl(CDN_ADDRESS + input);
            }
        }
    }

    return fn;
});

// 图片服务器地址
app.filter('imgOrigin', function ($sce, IMG_ADDRESS) {
    return function (input, url, imgAddr) {
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

// HTML 代码检测
app.filter('to_trusted', function ($sce) {
    /**
     * 对html代码安全检测
     * @author zhoul
     * @param   {string} text 需要处理的html
     * @returns {string} 处理后的html
     */
    function fn(text) {
        return $sce.trustAsHtml(text);
    }

    return fn;
});

// 字符串截取
app.filter('cut_str', function () {
    /**
     * 字符串截取
     * @author zhoul
     * @param   {string} str 需要截取的字符串
     * @param   {number} L   需要截取的长度字符 一个中文是2个字符
     * @returns {string}     截取后的字符串
     */
    function fn(str, L) {
        if (!angular.isString(str)) {
            return str;
        }
        var result = '',
            strlen = str.length, // 字符串长度
            chrlen = str.replace(/[^\x00-\xff]/g, '**').length; // 字节长度

        if (chrlen <= L) {
            return str;
        }

        for (var i = 0, j = 0; i < strlen; i++) {
            var chr = str.charAt(i);
            if (/[\x00-\xff]/.test(chr)) {
                j++; // ascii码为0-255，一个字符就是一个字节的长度
            } else {
                j += 2; // ascii码为0-255 以外，一个字符就是两个字节的长度
            }
            if (j <= L) { // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
                result += chr;
            } else { // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
                return result + '...';
            }
        }
    }

    return fn;
});


// 搜索匹配高亮
app.filter('light', function () {

    /**
     * 字符串匹配后高亮
     * @author zhoul
     * @param   {string} value 需要匹配的字符串
     * @param   {string} str   匹配的字符串
     * @returns {string}    处理后的字符串
     */
    function fn(value, str) {
        // 没有关键字就直接返回之前的字符
        if (!str) {
            return value;
        }

        var reg = new RegExp(str, 'gi');
        return value.replace(reg, function (word) {
            return "<span class='text-light'>" + word + "</span>";
        });
    }

    return fn;
});

app.filter('trendUp', [function() {
    return function(value) {
        if (value) {
            value = +value.replace('%', '');

            return value > 0;
        }
         
        return false;
    }
}]);

app.filter('trendDown', [function() {
    return function(value) {
        if (value) {
            value = +value.replace('%', '');

            return value < 0;
        }
         
        return false;
    }
}]);
