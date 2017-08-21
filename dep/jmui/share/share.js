/***********************************************
  needShareButton
  - Version 1.0.0
  - Copyright 2015 Dzmitry Vasileuski
	- Licensed under MIT (http://opensource.org/licenses/MIT)
***********************************************/

(function() {

  // 设置 data-* 数据
  function dataSet(el, obj){
    for(var option in obj){
      if(obj.hasOwnProperty(option)){
        el.setAttribute('data-'+option, obj[option]);
      }
    }
  }

  // 获取 data-* 的属性
  function dataGet(el, attr){
    var attrs = el.attributes;
    var expense = {}, i, j;
    for (i = 0, j = attrs.length; i < j; i++) {
      if(attrs[i].name.substring(0, 5) == 'data-') {
        expense[toCamelCase(attrs[i].name)] = attrs[i].value;
      }
    }
    if(attr){
      return expense[attr];
    }
    return expense;
  }

  function toCamelCase(oldStr){
    //attrs[i].name
    var strArray = oldStr.substring(5).split('-');
    var newStr = strArray[0];
    var length = strArray.length;

    for(var i = 1; i < length; i++){
      var str = strArray[i];
      newStr += str.charAt(0).toUpperCase() + (str.substr(1));
    }
    return newStr;
  }

	// find closest
	function closest(elem, parent) {
		if (typeof(parent) == 'string') {
			var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;

			if (!!matchesSelector) {
				while (elem) {
					if (matchesSelector.bind(elem)(parent)) {
						return elem;
					} else {
						elem = elem.parentElement;
					}
				}
			}
			return false;
		} else {
			while (elem) {
				if (elem == parent) {
					return elem;
				} else {
					elem = elem.parentElement;
				}
			}
			return false;
		}
	}

	// share button class
	window.needShareButton = function(elem, options) {
		// create element reference

    var init = options.init || false;
		var root = this;
		root.elem = elem || 'need-share-button';


		/* Helpers
		 ***********************************************/

		// get title from html
		root.getTitle = function() {
			var content;
			// check querySelector existance for old browsers
			if (document.querySelector) {
				if (content = document.querySelector('title')) {
					return content.innerText;
				}
			}
			return document.title;
		};

		// get image from html
		root.getImage = function() {
			var content;
			// check querySelector existance for old browsers
			if (document.querySelector) {
				if (content = document.querySelector('meta[property="og:image"]') || document.querySelector('meta[name="twitter:image"]')) {
					return content.getAttribute('content');
				} else
					return '';
			} else
				return '';
		};

		// get description from html
		root.getDescription = function() {
			var content;
			// check querySelector existance for old browsers
			if (document.querySelector) {
				if (content = document.querySelector('meta[property="og:description"]') || document.querySelector('meta[name="twitter:description"]') || document.querySelector('meta[name="description"]')) {
					return content.getAttribute('content');
				} else
					return '';
			} else {
				if (content = document.getElementsByTagName('meta').namedItem('description'))
					return content.getAttribute('content');
				else
					return '';
			}
		};

		// share urls for all networks
		root.share = {
			'weibo': function(el) {
				var myoptions = getOptions(el);
				var url = 'http://v.t.sina.com.cn/share/share.php?title=' + encodeURIComponent(myoptions.title) + "&url=" + encodeURIComponent(myoptions.url) + "&pic=" + encodeURIComponent(myoptions.image);
				root.popup(url);
			},
			'wechat': function(el) {
				var myoptions = getOptions(el);
				var imgSrc = 'https://api.qinco.me/api/qr?size=400&content=' + encodeURIComponent(myoptions.url);
				var dropdownEl = el.querySelector('.need-share-button_dropdown');
				var img = dropdownEl.getElementsByClassName('need-share-wechat-code-image')[0];
				if (img) {
					img.remove();
				} else {
					img = document.createElement('img');
					img.src = imgSrc;
					img.alt = 'loading wechat image...';
					img.setAttribute("class", 'need-share-wechat-code-image');
					dropdownEl.appendChild(img);
				}
			},
			'douban': function(el) {
				var myoptions = getOptions(el);
				var url = 'https://www.douban.com/share/service?name=' + encodeURIComponent(myoptions.title) + "&href=" + encodeURIComponent(myoptions.url) + "&image=" + encodeURIComponent(myoptions.image);
				root.popup(url);
			},
			'qzone': function(el) {
				var myoptions = getOptions(el);
				var url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=' + encodeURIComponent(myoptions.title) + "&url=" + encodeURIComponent(myoptions.url) + "&pics=" + encodeURIComponent(myoptions.image) + "&desc=" + encodeURIComponent(myoptions.description);
				root.popup(url);
			},
			'qq': function(el) {
				var myoptions = getOptions(el);
				var url = 'http://connect.qq.com/widget/shareqq/index.html?title=' + encodeURIComponent(myoptions.title) + "&url=" + encodeURIComponent(myoptions.url) + "&pics=" + encodeURIComponent(myoptions.image) + "&desc=" + encodeURIComponent(myoptions.description);;
				root.popup(url);
			},
			'renren': function(el) {
				var myoptions = getOptions(el);
				var url = 'http://widget.renren.com/dialog/share?title=' + encodeURIComponent(myoptions.title) + "&resourceUrl=" + encodeURIComponent(myoptions.url) + "&pic=" + encodeURIComponent(myoptions.image) + "&description=" + encodeURIComponent(myoptions.description);
				root.popup(url);
			},

			'mailto': function(el) {
				var myoptions = getOptions(el);
				var url = 'mailto:?subject=' + encodeURIComponent(myoptions.title) + '&body=Thought you might enjoy reading this: ' + encodeURIComponent(myoptions.url) + ' - ' + encodeURIComponent(myoptions.description);

				window.location.href = url;
			},
			'twitter': function(el) {
				var myoptions = getOptions(el);
				var url = myoptions.protocol + 'twitter.com/intent/tweet?text=';
				url += encodeURIComponent(myoptions.title) + "&url=" + encodeURIComponent(myoptions.url);

				root.popup(url);
			},
			'pinterest': function(el) {
				var myoptions = getOptions(el);
				var url = myoptions.protocol + 'pinterest.com/pin/create/bookmarklet/?is_video=false';
				url += '&media=' + encodeURIComponent(myoptions.image);
				url += '&url=' + encodeURIComponent(myoptions.url);
				url += '&description=' + encodeURIComponent(myoptions.title);

				root.popup(url);
			},
			'facebook': function(el) {
				var myoptions = getOptions(el);
				var url = myoptions.protocol + 'www.facebook.com/share.php?';
				url += 'u=' + encodeURIComponent(myoptions.url);
				url += '&title=' + encodeURIComponent(myoptions.title);

				root.popup(url);
			},
			'googleplus': function(el) {
				var myoptions = getOptions(el);
				var url = myoptions.protocol + 'plus.google.com/share?';
				url += 'url=' + encodeURIComponent(myoptions.url);

				root.popup(url);
			},
			'reddit': function(el) {
				var myoptions = getOptions(el);
				var url = myoptions.protocol + 'www.reddit.com/submit?';
				url += 'url=' + encodeURIComponent(myoptions.url);
				url += '&title=' + encodeURIComponent(myoptions.title);

				root.popup(url);
			},
			'delicious': function(el) {
				var myoptions = getOptions(el);
				var url = myoptions.protocol + 'del.icio.us/post?';
				url += 'url=' + encodeURIComponent(myoptions.url);
				url += '&title=' + encodeURIComponent(myoptions.title);
				url += '&notes=' + encodeURIComponent(myoptions.description);

				root.popup(url);
			},
			'tapiture': function(el) {
				var myoptions = getOptions(el);
				var url = myoptions.protocol + 'tapiture.com/bookmarklet/image?';
				url += 'img_src=' + encodeURIComponent(myoptions.image);
				url += '&page_url=' + encodeURIComponent(myoptions.url);
				url += '&page_title=' + encodeURIComponent(myoptions.title);

				root.popup(url);
			},
			'stumbleupon': function(el) {
				var myoptions = getOptions(el);
				var url = myoptions.protocol + 'www.stumbleupon.com/submit?';
				url += 'url=' + encodeURIComponent(myoptions.url);
				url += '&title=' + encodeURIComponent(myoptions.title);

				root.popup(url);
			},
			'linkedin': function(el) {
				var myoptions = getOptions(el);
				var url = myoptions.protocol + 'www.linkedin.com/shareArticle?mini=true';
				url += '&url=' + encodeURIComponent(myoptions.url);
				url += '&title=' + encodeURIComponent(myoptions.title);
				url += '&source=' + encodeURIComponent(myoptions.source);

				root.popup(url);
			},
			'slashdot': function(el) {
				var myoptions = getOptions(el);
				var url = myoptions.protocol + 'slashdot.org/bookmark.pl?';
				url += 'url=' + encodeURIComponent(myoptions.url);
				url += '&title=' + encodeURIComponent(myoptions.title);

				root.popup(url);
			},
			'technorati': function(el) {
				var myoptions = getOptions(el);
				var url = myoptions.protocol + 'technorati.com/faves?';
				url += 'add=' + encodeURIComponent(myoptions.url);
				url += '&title=' + encodeURIComponent(myoptions.title);

				root.popup(url);
			},
			'posterous': function(el) {
				var myoptions = getOptions(el);
				var url = myoptions.protocol + 'posterous.com/share?';
				url += 'linkto=' + encodeURIComponent(myoptions.url);

				root.popup(url);
			},
			'tumblr': function(el) {
				var myoptions = getOptions(el);
				var url = myoptions.protocol + 'www.tumblr.com/share?v=3';
				url += '&u=' + encodeURIComponent(myoptions.url);
				url += '&t=' + encodeURIComponent(myoptions.title);

				root.popup(url);
			},
			'googlebookmarks': function(el) {
				var myoptions = getOptions(el);
				var url = myoptions.protocol + 'www.google.com/bookmarks/mark?op=edit';
				url += '&bkmk=' + encodeURIComponent(myoptions.url);
				url += '&title=' + encodeURIComponent(myoptions.title);
				url += '&annotation=' + encodeURIComponent(myoptions.description);

				root.popup(url);
			},
			'newsvine': function(el) {
				var myoptions = getOptions(el);
				var url = myoptions.protocol + 'www.newsvine.com/_tools/seed&save?';
				url += 'u=' + encodeURIComponent(myoptions.url);
				url += '&h=' + encodeURIComponent(myoptions.title);

				root.popup(url);
			},
			'pingfm': function(el) {
				var myoptions = getOptions(el);
				var url = myoptions.protocol + 'ping.fm/ref/?';
				url += 'link=' + encodeURIComponent(myoptions.url);
				url += '&title=' + encodeURIComponent(myoptions.title);
				url += '&body=' + encodeURIComponent(myoptions.description);

				root.popup(url);
			},
			'evernote': function(el) {
				var myoptions = getOptions(el);
				var url = myoptions.protocol + 'www.evernote.com/clip.action?';
				url += 'url=' + encodeURIComponent(myoptions.url);
				url += '&title=' + encodeURIComponent(myoptions.title);

				root.popup(url);
			},
			'friendfeed': function(el) {
				var myoptions = getOptions(el);
				var url = myoptions.protocol + 'www.friendfeed.com/share?';
				url += 'url=' + encodeURIComponent(myoptions.url);
				url += '&title=' + encodeURIComponent(myoptions.title);

				root.popup(url);
			},
			'vkontakte': function(el) {
				var myoptions = getOptions(el);
				var url = myoptions.protocol + 'vkontakte.ru/share.php?';
				url += 'url=' + encodeURIComponent(myoptions.url);
				url += '&title=' + encodeURIComponent(myoptions.title);
				url += '&description=' + encodeURIComponent(myoptions.description);
				url += '&image=' + encodeURIComponent(myoptions.image);
				url += '&noparse=true';

				root.popup(url);
			},
			'odnoklassniki': function(el) {
				var myoptions = getOptions(el);
				var url = myoptions.protocol + 'www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
				url += '&st.comments=' + encodeURIComponent(myoptions.description);
				url += '&st._surl=' + encodeURIComponent(myoptions.url);

				root.popup(url);
			},
			'mailru': function(el) {
				var myoptions = getOptions(el);
				var url = myoptions.protocol + 'connect.mail.ru/share?';
				url += 'url=' + encodeURIComponent(myoptions.url);
				url += '&title=' + encodeURIComponent(myoptions.title);
				url += '&description=' + encodeURIComponent(myoptions.description);
				url += '&imageurl=' + encodeURIComponent(myoptions.image);

				root.popup(url);
			}

		}

		// open share link in a popup
		root.popup = function(url) {
			// set left and top position
			var popupWidth = 600,
				popupHeight = 500,
				// fix dual screen mode
				dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left,
				dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top,
				width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
				height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
				// calculate top and left position
				left = ((width / 2) - (popupWidth / 2)) + dualScreenLeft,
				top = ((height / 2) - (popupHeight / 2)) + dualScreenTop,

				// show popup
				shareWindow = window.open(url, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=' + popupWidth + ', height=' + popupHeight + ', top=' + top + ', left=' + left);

			// Puts focus on the newWindow
			if (window.focus) {
				shareWindow.focus();
			}
		}

		/* Set options
		 ***********************************************/

		// create default options
		root.options = {
			iconStyle: 'default', // default or box
			boxForm: 'horizontal', // horizontal or vertical
			position: 'bottomCenter', // top / middle / bottom + Left / Center / Right
			protocol: ['http', 'https'].indexOf(window.location.href.split(':')[0]) === -1 ? 'https://' : '//',
			networks: 'qq,Weibo,Wechat,Douban,QQZone,Twitter,Pinterest,Facebook,GooglePlus,Reddit,Linkedin,Tumblr,Evernote'
		};

		// integrate custom options
		for (var i in options) {
			root.options[i] = options[i];
		}
		// convert networks string into array
		root.options.networks = root.options.networks.toLowerCase().split(',');

		function getOptions(el) {
			// integrate data attribute options
			var ret = {};
			for (var i in root.options) {
				ret[i] = root.options[i];
			}

			// these attrs must get dynamically.
			ret.url = window.location.href;
			ret.title = root.getTitle();
			ret.image = root.getImage();
			ret.description = root.getDescription();
      var options = dataGet(el)
			for (var option in options) {
				// replace only 'share-' prefixed data-attributes
				if (option.match(/share/)) {
					var new_option = option.replace(/share/, '');
					if (!new_option.length) {
						continue;
					}
					new_option = new_option.charAt(0).toLowerCase() + new_option.slice(1);
					var val = options[option];
					if (new_option === 'networks') {
						val = val.toLowerCase().split(',');
					} else if (new_option === 'url' && val && val[0] === '/') {
						// fix relative url problem.
						val = location.origin + val;
					}
					ret[new_option] = val;
				}
			}
			return ret;
		}

		function createDropdown(el) {
			// create dropdown
			var dropdownEl = document.createElement('span');
			dropdownEl.className = 'need-share-button_dropdown';
			if (el.querySelector('.need-share-button_dropdown')) {
				return;
			}
			var myoptions = getOptions(el);

			// set dropdown row length
			if (myoptions.iconStyle == 'box' && myoptions.boxForm == 'horizontal')
				dropdownEl.className += ' need-share-button_dropdown-box-horizontal';
			else if (myoptions.iconStyle == 'box' && myoptions.boxForm == 'vertical')
				dropdownEl.className += ' need-share-button_dropdown-box-vertical';

			// set dropdown position
      if(!init){
        setTimeout(function() {
          switch (myoptions.position) {
            case 'topLeft':
              dropdownEl.className += ' need-share-button_dropdown-top-left';
              break
            case 'topRight':
              dropdownEl.className += ' need-share-button_dropdown-top-right';
              break
            case 'topCenter':
              dropdownEl.className += ' need-share-button_dropdown-top-center';
              dropdownEl.style.marginLeft = -dropdownEl.offsetWidth / 2 + 'px';
              break
            case 'middleLeft':
              dropdownEl.className += ' need-share-button_dropdown-middle-left';
              dropdownEl.style.marginTop = -dropdownEl.offsetHeight / 2 + 'px';
              break
            case 'middleRight':
              dropdownEl.className += ' need-share-button_dropdown-middle-right';
              dropdownEl.style.marginTop = -dropdownEl.offsetHeight / 2 + 'px';
              break
            case 'bottomLeft':
              dropdownEl.className += ' need-share-button_dropdown-bottom-left';
              break
            case 'bottomRight':
              dropdownEl.className += ' need-share-button_dropdown-bottom-right';
              break
            case 'bottomCenter':
              dropdownEl.className += ' need-share-button_dropdown-bottom-center';
              dropdownEl.style.marginLeft = -dropdownEl.offsetWidth / 2 + 'px';
              break
            default:
              dropdownEl.className += ' need-share-button_dropdown-bottom-center';
              dropdownEl.style.marginLeft = -dropdownEl.offsetWidth / 2 + 'px';
              break
          }
        }, 1);
      }



			// fill fropdown with buttons
			var iconClass = myoptions.iconStyle == 'default' ? 'need-share-button_link need-share-button_' : 'need-share-button_link-' + myoptions.iconStyle + ' need-share-button_link need-share-button_';
			for (var network in myoptions.networks) {
				var link = document.createElement('span');
				network = myoptions.networks[network];
				link.className = iconClass + network;
				link.className += ' icon-' + network;
        dataSet(link, {network: network})
				link.title = network;
				dropdownEl.appendChild(link);
			}

      function initShare(event) {
        var event = event || window.event;
        if (closest(event.target, '.need-share-button_link')) {
          event.preventDefault();
          event.stopPropagation();

          root.share[dataGet(event.target, 'network')](el);
          return false;
        }
      }

      if(dropdownEl.addEventListener){
        dropdownEl.addEventListener('click', initShare);
      }else{
        dropdownEl.attachEvent('click', initShare);
      }

			el.appendChild(dropdownEl);
		}

		// close on click outside
    function closeShare(event) {
      var event = event || window.event;
      var openedEl = document.querySelector('.need-share-button-opened');
      if (!closest(event.target, '.need-share-button-opened')) {
        if (openedEl) {
          if(openedEl.classList){
            openedEl.classList.remove('need-share-button-opened');
          }else{
            angular.element(openedEl).removeClass('need-share-button-opened');
          }


          // hide wechat code image when close the dropdown.
          if (openedEl.querySelector('.need-share-wechat-code-image')) {
            openedEl.querySelector('.need-share-wechat-code-image').remove();
          }
        } else {
          var el = closest(event.target, root.elem);
          if (el) {
            if(el.classList){
              if (!el.classList.contains('need-share-button-opened')) {
                createDropdown(el);
                setTimeout(function() {
                  el.classList.add('need-share-button-opened');
                }, 1);

              }
            }else{
              if (!angular.element(el).hasClass('need-share-button-opened')) {
                createDropdown(el);
                setTimeout(function() {
                  angular.element(el).addClass('need-share-button-opened');
                }, 1);

              }
            }
          }
        }
      }
    }


    if(init){
      setTimeout(function(){
        createDropdown(elem);
      }, 100)
    }else{
      if(document.addEventListener){
        document.addEventListener('click', closeShare);
      } else {
        document.attachEvent('click', closeShare);
      }
    }

	};

	// new needShareButton('.need-share-button');
})();
