
angular.$ = function (e) {
    return e = angular.isString(e) ? document.querySelectorAll(e) : e,
        angular.element(e)
};

/**
 * [重写angular find方法]
 * @author zhoul
 * @param   {String}   e CSS 选择器
 * @returns {Array} angular 包装后的Dom对象
 */
angular.element.prototype.find = function (e) {
    if (!e)
        return angular.$();
    var t, n = document.querySelectorAll(e),
        a = [];
    for (t = 0; t < n.length; t++)
        a.push(n[t]);
    var r = this[0].getElementsByTagName("*"),
        i = [];
    for (t = 0; t < r.length; t++)
        i.push(r[t]);
    var o = [];
    for (t = 0; t < a.length; t++)
        - 1 !== i.indexOf(a[t]) && o.push(a[t]);
    return angular.$(o)
};

/**
 * 获取元素的指定样式
 * @author zhoul
 * @param   {String} e 指定元素属性
 * @returns {string} 元素的值
 */
angular.element.prototype.getStyle = function (e) {
    return "undefined" != typeof getComputedStyle ? window.getComputedStyle(this[0])[e] : this[0].currentStyle[e]
};

/**
 * 获取元素的定位位置和大小
 * @author zhoul
 * @returns {object} 元素信息对象
 */
angular.element.prototype.getOffset = function () {
    var boundingClientRect = this[0].getBoundingClientRect();

    return {
        width: boundingClientRect.width || this.prop('offsetWidth'),
        height: boundingClientRect.height || this.prop('offsetHeight'),
        top: boundingClientRect.top + (window.pageYOffset || document.documentElement.scrollTop),
        left: boundingClientRect.left + (window.pageXOffset || document.documentElement.scrollLeft)
    };
};
