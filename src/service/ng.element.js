angular.module('ng.element', [])
    .run(function ($window, $document) {
        angular.$ = function (e) {
            return e = angular.isString(e) ? document.querySelectorAll(e) : e,
                angular.element(e)
        };

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

        angular.element.prototype.getStyle = function (e) {
            return "undefined" != typeof getComputedStyle ? window.getComputedStyle(this[0])[e] : this[0].currentStyle[e]
        };

        angular.element.prototype.getOffset = function () {
            var boundingClientRect = this[0].getBoundingClientRect();

            return {
                width: boundingClientRect.width || this.prop('offsetWidth'),
                height: boundingClientRect.height || this.prop('offsetHeight'),
                top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
                left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
            };
        }
    })
