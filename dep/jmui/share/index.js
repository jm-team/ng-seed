require("./index.scss");
require("./share.js");

document.createElement('jm-share');

// share 分享
angular.module('jmui.share', [])
	.directive('jmShare', function() {
	var tmp = '<div class="need-share-button-default {{ className }}"'+
							'data-share-icon-style="{{ iconStyle }}"'+
							'data-share-position="{{position}}"'+
							'data-share-url="{{url}}"'+
							'data-share-box-form="{{boxForm}}"'+
							'data-share-title="{{title}}"'+
							'data-share-image="{{image}}"'+
							'data-share-description="{{description}}"'+
							'data-share-networks="{{networks}}"'+
							'>{{ text || "Share" }}</div>';

	return {
		restrict: 'AE',

		replace: true,

		template: tmp,

		scope: {
			text:'@',

			// 分享插件的class
			className: '@',

			// 分享的URL
			url: '@',

			// 分享的title 标题
			title: '@',

			// 分享的图片
			image: '@',

			// 分享的描述
			description: '@'
		},

		link: function(scope, element, attrs) {
			// 初始化分享指令
			function initShare() {
				new needShareButton(element[0]);

				// 初始化后移除事件
				if (scope.trigger) {
					element.off(scope.trigger, initShare);
				}
			}

			// 触发事件初始化分享指令(可选)
			scope.trigger = attrs.trigger || false;

			// 分享的应用
			scope.networks = attrs.networks || 'QQ,Wechat,Weibo,QZone,Douban,Linkedin';
			
			// 分享插件的位置 默认下居中
			scope.position = attrs.position || 'middle';

			// 分享到应用 应用icon
			scope.iconStyle = attrs.iconStyle || 'default';

			// 分享插件方向 默认水平排列
			scope.boxForm = attrs.boxForm || 'horizontal';

			// 判断是否有触发事件触发 没有就直接初始化
			if (scope.trigger) {
				element.on(scope.trigger, initShare);
			} else {
				initShare();
			}
		}
	}
});