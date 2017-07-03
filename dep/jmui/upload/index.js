var qq = require("./fine-uploader/fine-uploader.core.js");

angular
  .module("jmui.fineUploader", [])

  .factory('uploadService', function ($http, $log) {
    return {
      // 获取上传参数
      getParams: function (conf) {
        var config = conf || {};
        return $http({
          method: config.method || "get",
          url: config.url || "/getUploadToken",
          params: config.params || {}
        }).then(function (data) {
          return data.data || {};
        }, function () {
          $log.log("获取上传参数失败");
        });
      },

      getUploadFileUrl: function (config) {
        return $http({
          url: config.url || "/getFile",
          params: config.params || {}
        }).then(function (data) {
          return angular.fromJson(eval("(" + data.data + ")"));
        });
      },

      // 获取上传成功后获取图片路径
      /*通过fileExt可以直接指定允许的后缀，通过fileType则可以批量指定允许的后缀，但需要注意指定fileType的时候不会提示允许上传的文件类型，请在placeholder中说明下*/
      UPLOAD_FILE_TYPE_INFO: {
        // 图片
        'image': ['.jpeg', '.jpg', '.bmp', '.gif', '.png', '.tif', '.rgb', '.dib', '.eps', '.jpe', '.pcx', '.bmp', '.gif', '.pdf'],
        // 只允许图片（有此属性时不会再判断其它属性，哪怕逗号分隔定义了多个也不行）
        'only-image': ['.jpeg', '.jpg', '.bmp', '.gif', '.png', '.tif', '.rgb', '.dib', '.eps', '.jpe', '.pcx', '.bmp', '.gif', '.pdf'],
        // 文档
        'doc': ['.doc', '.docx', '.pdf'],
        // 只允许文档（有此属性时不会再判断其它属性，哪怕逗号分隔定义了多个也不行）
        'only-doc': ['.doc', '.docx', '.pdf'],
        // excel
        'excel': ['.xls', '.xlsx', '.pdf']
      }
    }
  })

  .directive('upload', function ($q, uploadService) {
    return {
      restrict: 'AE',
      required: '?ngModel',
      scope: {
        // 文件列表
        files: '=',

        // 上传成功之后的回调
        onComplete: '&'
      },
      link: function (scope, element, attrs, ngModel) {
        var elem = element.find('.jm-upload')[0];

        var isFileList = true;
        var fileQueueAuto = true;

        if (scope.$eval(attrs.isFileList) === false) {
          isFileList = false;
        }

        if (scope.$eval(attrs.fileQueueAuto) === false) {
          fileQueueAuto = false;
        }

        // 上传地址 (String) => "/upload"
        var endpoint = attrs.uploadServer || "/upload.do?action=upload";

        // input file accept属性值 (String) => "image/jpeg, image/gif"
        var acceptFiles = attrs.acceptFiles || "image/*";

        // 每一个文件上传的最大尺寸 (integer) => 512000 (单位： 字节)
        var sizeLimit = attrs.sizeLimit;

        // 服务端验证限制上传文件类型 (Array) => ["image/jpeg", "image/gif"]
        var allowedExtensionsServer = uploadService.UPLOAD_FILE_TYPE_INFO[attrs.fileType || 'image'];

        // 控件验证
        var allowedExtensions = allowedExtensionsServer.map(function (item) { return item.substr(1) });

        // input title (String) => "图片上传"
        var fileInputTitle = attrs.fileInputTitle || "图片上传";

        // input name (String) => "filename"
        var fileInputName = attrs.fileInputName || "file";

        // 文件上传的其他参数
        var params = scope.params || {};

        // 文件上传需要获取参数的地址
        var paramsUrl = attrs.paramsUrl || '';

        var upload = new qq.FineUploaderBasic({
          debug: true,
          button: elem,
          autoUpload: fileQueueAuto,
          request: {
            customHeaders: {},
            endpoint: endpoint,
            uuidName: 'uuid',
            inputName: "file"
          },
          validation: {
            allowedExtensions: allowedExtensions,
            // sizeLimit: sizeLimit,
            acceptFiles: acceptFiles || null
          },

          // multiple: fileMulti,
          text: {
            fileInputTitle: fileInputTitle
          },
          callbacks: {
            onSubmit: function (id, name) {
              var _this = this;

              return uploadService.getParams().then(function (data) {
                _this.setParams(angular.extend({
                  token: data.uploadToken || '',
                  fileType: allowedExtensionsServer,
                  fileSize: sizeLimit,
                  maxImageSize: 200,
                  addScript: (elem.style.transition === undefined ? 'true' : '')
                }, params, data));
                return data;
              });
            },
            onSubmitted: function (id, name) { },
            onComplete: function (id, name, responseJSON, maybeXhr) {
              var _this = this;
              uploadService.getUploadFileUrl({
                params: {
                  uuid: responseJSON.fileUUIDs[0]
                }
              }).then(function (data) {

                var file = {
                  path: data.filePaths[0],
                  id: id,
                  name: name,
                }

                if (isFileList) {
                  var _file = scope.files.filter(function(item){
                    return item.id === id;
                  })[0];
                  debugger;
                  scope.files.push(file);
                } else {
                  scope.files[0] = file;
                }

                scope.onComplete({
                  arg: {
                    file: file,
                    context: _this
                  }
                });
              });
            },
            onAllComplete: function (successful, failed) { },
            onCancel: function (id, name) { },
            onUpload: function (id, name) {
              console.log('upload')
              console.log(name)
            },
            onUploadChunk: function (id, name, chunkData) { },
            onUploadChunkSuccess: function (id, chunkData, responseJSON, xhr) { },
            onResume: function (id, fileName, chunkData) { },
            onProgress: function (id, name, loaded, total) { },
            onTotalProgress: function (loaded, total) { },
            onError: function (id, name, reason, maybeXhrOrXdr) {
              console.log(reason)
            },
            onAutoRetry: function (id, name, attemptNumber) { },
            onManualRetry: function (id, name) { },
            onValidateBatch: function (fileOrBlobData) { },
            onValidate: function (fileOrBlobData) { },
            onSubmitDelete: function (id) { },
            onDelete: function (id) { },
            onDeleteComplete: function (id, xhrOrXdr, isError) { },
            onPasteReceived: function (blob) { },
            onStatusChange: function (id, oldStatus, newStatus) { },
            onSessionRequestComplete: function (response, success, xhrOrXdr) { }
          },
          // messages: {
          //   typeError: "{file} has an invalid extension. Valid extension(s): {extensions}.",
          //   sizeError: "{file} is too large, maximum file size is {sizeLimit}.",
          //   minSizeError: "{file} is too small, minimum file size is {minSizeLimit}.",
          //   emptyError: "{file} is empty, please select files again without it.",
          //   noFilesError: "No files to upload.",
          //   tooManyItemsError: "Too many items ({netItems}) would be uploaded.  Item limit is {itemLimit}.",
          //   maxHeightImageError: "Image is too tall.",
          //   maxWidthImageError: "Image is too wide.",
          //   minHeightImageError: "Image is not tall enough.",
          //   minWidthImageError: "Image is not wide enough.",
          //   retryFailTooManyItems: "Retry failed - you have reached your file limit.",
          //   onLeave: "The files are being uploaded, if you leave now the upload will be canceled.",
          //   unsupportedBrowserIos8Safari: "Unrecoverable error - this browser does not permit file uploading of any kind due to serious bugs in iOS8 Safari.  Please use iOS8 Chrome until Apple fixes these issues."
          // },
          display: {
            prependFiles: true
          },
          classes: {
            buttonHover: "qq-upload-button-hover",
            buttonFocus: "qq-upload-button-focus"
          },
          retry: {
            enableAuto: false
          },
          resume: {
            enabled: false
          },
          cors: {
            expected: true,
            allowXdr: true
          }
        });

        // upload.uploadStoredFiles();
      }
    }
  })
