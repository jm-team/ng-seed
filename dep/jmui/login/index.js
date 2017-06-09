angular.module('jmui.login', [])
  .factory('Login', function($q, $resource, Address, USERCENTER_ADDRESS) {
    return {
      /**
       * check user is login
       * @param obj   {Object} {path:'/hasLogin', params:{serviceContext:'/webapi',...}}
       * @returns {*|promise|{then, catch, finally}|jQuery.promise}
       * reference: https://www.html5rocks.com/zh/tutorials/speed/script-loading/
       */
      checkHasLogin: function(obj) {
        var obj = angular.extend({
          params: {
            serviceContext: '/webapi'
          },
          path: '/hasLogin'
        }, obj);
        var params = '?';

        angular.forEach(obj.params, function(value, key) {
          params += key + '=' + value + '&';
        });

        var defer = $q.defer();
        var script,
          head = document.head || document.documentElement,
          src = (USERCENTER_ADDRESS + obj.path + params);
        // 用户未登录
        window.userNotLoginCallback = userNotLoginCallback;

        // 用户已登录
        window.userLoginSuccessCallback = userLoginSuccessCallback;

        /**
         * load has login script dynamically
         * @param token
         */
        loadScript(src);


        return defer.promise;

        /**
         * load has login script dynamically
         */
        function loadScript(src) {

          var firstScript = document.scripts[0];

          // 监视 IE 中的脚本加载
          function stateChange(_, isAbort) {

            if (script && (isAbort || !script.readyState || /loaded|complete/.test(script.readyState))) {
              // 避免该脚本的加载事件再次触发(比如修改了 src 属性)
              script.onload = script.onreadystatechange = null;

              // Remove the script
              if (script.parentNode) {
                script.parentNode.removeChild(script);
              }

              // Dereference the script
              script = null;

            }
          }

          if ('async' in firstScript) { // 现代浏览器
            script = document.createElement('script');
            script.async = true;
            script.onload = script.onreadystatechange = stateChange;
            script.src = src;
            head.appendChild(script);
          } else if (firstScript.readyState) { // IE<10
            // 创建一个脚本并添加进待执行队列中
            script = document.createElement('script');
            // 监听状态改变
            script.onload = script.onreadystatechange = stateChange;
            // 必须在添加 onreadystatechange 监听后设置 src
            // 否则会错过缓存脚本的加载事件
            script.src = src;

            // 不能使用 appendChild，在低版本 IE 中如果元素没有闭合会有 bug
            head.insertBefore(script, head.firstChild);
          } else { // 退化使用延迟加载
            document.write('<script src="' + src + '" defer></' + 'script>');
          }

        }

        function abort() {
          if (script) {
            script.onload(undefined, true);
          }
        }

        /**
         * 用户未登录
         * @param token
         */
        function userNotLoginCallback(token) {
          console.log('userNotLoginCallback');
          // console.log(token);
          defer.reject(token)

        }

        /**
         * 用户已登录
         * @param token
         */
        function userLoginSuccessCallback(token) {
          console.log('userLoginSuccessCallback');
          // console.log(token);
          defer.resolve(token)

        }

      }
    };
  });
