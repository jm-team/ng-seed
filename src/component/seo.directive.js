var app = require('app');

app.directive('seoMeta', function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            element.remove();
            var name = attrs.name;
            var watcher = "SEO['" + name + "']";
            var meta = document.createElement("meta");

            meta.setAttribute("name", name);
            scope.$watch(watcher, function(newVal, oldVal, scope) {
                if(meta.insert) {
                    meta.setAttribute("content", newVal)
                } else {
                    meta.setAttribute("content", newVal);
                    document.querySelector("head").appendChild(meta);
                    meta.insert = true;
                }
            })
        }
    };
});
