/**
 * AngularJS directive for Fine Uploader UI jQuery (traditional endpoints).
 * Maintained by Widen Enterprises.
 *
 * This example:
 *  - Delegates error messages to the dialog element.
 *  - Generates client-side pre-upload image previews (where supported).
 *  - Allows files to be excluded based on extension and MIME type (where supported).
 *  - Determines the most appropriate upload button and drop zone text based on browser capabilities.
 *  - Renders larger image preview on-demand in a dialog element.
 *  - Keeps an aggregate progress bar up-to-date based on upload status for all files.
 *  - Enables delete file support.
 *  - Ensure newly submitted files are added to the top of the visible list.
 *  - Enables chunking & auto-resume support.
 *
 * Requirements:
 *  - Fine Uploader 5.4 or 5.5
 *  - Dialog element polyfill 0.4.2
 *  - AngularJS 1.5
 */

(function () {
    require("./fine-uploader/fine-uploader-new.scss");
    require("./index.scss");
    var qq = require('./fine-uploader/fine-uploader.js');
    var cropperDialogTemp = require('./cropper-dialog.html')
    require('./cropper/cropper.scss')
    var Cropper = require('./cropper/cropper.js')

    function isTouchDevice() {
        return "ontouchstart" in window || navigator.msMaxTouchPoints > 0;
    }

    function initButtonText($scope) {
        var input = document.createElement("input");

        input.setAttribute("multiple", "true");

        if (input.multiple === true && !qq.android()) {
            $scope.uploadButtonText = "Select Files";
        } else {
            $scope.uploadButtonText = "Select a File";
        }
    }

    function initDropZoneText($scope, $interpolate) {
        if (qq.supportedFeatures.folderDrop && !isTouchDevice()) {
            $scope.dropZoneText = "Drop Files or Folders Here";
        } else if (qq.supportedFeatures.fileDrop && !isTouchDevice()) {
            $scope.dropZoneText = "Drop Files Here";
        } else {
            $scope.dropZoneText = $scope.$eval($interpolate("Press '{{uploadButtonText}}'"));
        }
    }

    function bindToRenderedTemplate($compile, $scope, $interpolate, element) {
        $compile(element.contents())($scope);

        initButtonText($scope);
        initDropZoneText($scope, $interpolate);
    }

    function openLargerPreview($scope, uploader, modal, size, fileId) {
        uploader.drawThumbnail(fileId, new Image(), size).then(function (image) {
            $scope.largePreviewUri = image.src;
            $scope.$apply();
            modal.showModal();
        });
    }

    function closePreview(modal) {
        modal.close();
    }

    angular.module("jmui.fineUploader", [])
        .directive('croppingImageOnload', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    element.on('load', function () {

                        scope.$emit('cropperImageLoaded', this)

                    });
                    element.on('error', function () {
                        console.log('image could not be loaded');
                    });
                }
            };
        })
        .directive("fineUploader", function ($compile, $interpolate, dialogs) {
            return {
                restrict: "A",
                replace: true,
                scope: {},
                link: function ($scope, element, attrs) {

                    $scope.hasPickedFile = false;
                    $scope.cropImgSrc = null;
                    $scope.croppedResult = null;

                    $scope.autoUpload = (attrs.autoUpload === "false") ? false : true;
                    var endpoint = attrs.uploadServer,
                        notAvailablePlaceholderPath = attrs.notAvailablePlaceholder,
                        waitingPlaceholderPath = attrs.waitingPlaceholder,
                        acceptFiles = attrs.allowedMimes,
                        sizeLimit = attrs.maxFileSize,
                        largePreviewSize = parseInt(attrs.largePreviewSize),
                        allowedExtensions = JSON.parse(attrs.allowedExtensions),
                        template = attrs.template,
                        // previewDialog = document.querySelector('.large-preview'),

                        uploader = new qq.FineUploader({
                            autoUpload: $scope.autoUpload,
                            debug: true,
                            element: element[0],
                            template: template,
                            request: {
                                endpoint: endpoint
                            },

                            validation: {
                                acceptFiles: acceptFiles,
                                allowedExtensions: allowedExtensions,
                                sizeLimit: sizeLimit
                            },

                            deleteFile: {
                                endpoint: endpoint,
                                enabled: true
                            },

                            thumbnails: {
                                placeholders: {
                                    notAvailablePath: notAvailablePlaceholderPath,
                                    waitingPath: waitingPlaceholderPath
                                }
                            },

                            display: {
                                prependFiles: true
                            },

                            failedUploadTextDisplay: {
                                mode: "custom"
                            },

                            retry: {
                                enableAuto: true
                            },

                            chunking: {
                                enabled: true
                            },

                            resume: {
                                enabled: true
                            },

                            callbacks: {
                                onSubmitted: function (id, name) {
                                    var fileEl = this.getItemByFileId(id),
                                        thumbnailImg = fileEl.querySelector('.qq-thumbnail-selector');

                                    angular.element(thumbnailImg).on('load', function () {
                                        $scope.hasPickedFile = true;
                                        $scope.cropImgSrc = this.src;
                                        $scope.$apply();
                                        $scope.triggerCrop();
                                    });
                                    // thumbnailEl.addEventListener('click', function () {
                                    //     // openLargerPreview($scope, uploader, previewDialog, largePreviewSize, id);
                                    // });
                                },
                                onUpload: function (id, name) {
                                    if ($scope.croppedResult) {
                                        this.setParams($scope.croppedResult, id)
                                    }

                                    $scope.hasPickedFile = false;
                                    $scope.cropImgSrc = null;
                                    $scope.croppedResult = null;

                                }
                            }
                        });


                    //dialogPolyfill.registerDialog(previewDialog);
                    // $scope.closePreview = closePreview.bind(this, previewDialog);
                    bindToRenderedTemplate($compile, $scope, $interpolate, element);

                    $scope.triggerUpload = function () {

                        if (!$scope.autoUpload) {
                            console.log('croppedResult', $scope.croppedResult)
                            uploader.uploadStoredFiles();
                        }

                    }

                    $scope.triggerCrop = function () {
                        var _parentScope = $scope;
                        var src = $scope.cropImgSrc;

                        dialogs.modal({
                            /*@ngInject*/
                            controller: function cropperDialog($scope, dialogs) {
                                $scope.cropImgSrc = src;

                                $scope.cropper = null;

                                $scope.getData = function () {
                                    console.log('crroped')
                                    var result = $scope.cropper.getData()
                                    console.log(result)
                                    _parentScope.croppedResult = result
                                    dialogs.close()
                                    //_parentScope.hasPickedFile = false
                                }

                                $scope.$on('cropperImageLoaded', function (event, image) {

                                    var options = {
                                        preview: '#crop-preview',
                                        viewMode: 1,
                                        dragMode: 'move',
                                        // aspectRatio: 16 / 9,
                                        // preview: '.img-preview',
                                        build: function () {
                                            console.log('build');
                                        },
                                        built: function () {
                                            console.log('built');
                                        },
                                        cropstart: function (data) {
                                            console.log('cropstart', data.action);
                                        },
                                        cropmove: function (data) {
                                            console.log('cropmove', data.action);
                                        },
                                        cropend: function (data) {
                                            console.log('cropend', data.action);
                                        },
                                        crop: function (data) {
                                            console.log('crop');
                                            // dataX.value = Math.round(data.x);
                                            // dataY.value = Math.round(data.y);
                                            // dataHeight.value = Math.round(data.height);
                                            // dataWidth.value = Math.round(data.width);
                                            // dataRotate.value = !isUndefined(data.rotate) ? data.rotate : '';
                                            // dataScaleX.value = !isUndefined(data.scaleX) ? data.scaleX : '';
                                            // dataScaleY.value = !isUndefined(data.scaleY) ? data.scaleY : '';
                                        },
                                        zoom: function (data) {
                                            console.log('zoom', data.ratio);
                                        }
                                    };
                                    $scope.cropper = new Cropper(image, options);
                                })
                            },
                            templateUrl: cropperDialogTemp
                        })

                    }
                }
            }
        });
})();