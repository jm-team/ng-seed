var tmpPage = require('./pagination.html');

angular.module('jmui.pagination', [])
/**
 * [分页组件]
 * @description
 *
 * 基础的分页组件：
 *  指令属性详细：
 *      1) itemsPerPage:每页最大条数用于计算总页数 默认10
 *      2) totalPage： 总页数
 *      3) currentPage: 当前页
 *      4) maxSize: 最大页码
 *      5) nextText: 下一页的显示文本
 *      6) previousText: 上一页的显示文本
 *      7) firstText: 首页显示文本
 *      8) lastText: 尾页显示文本
 *      9) directionLinks: 是否显示上一页和下一页
 *      11) totalItems: 总条数
 *      12) inputLinks: 是否显示输入跳转
 *
 *  指令方法详细
 *      1) onSelectPage(result): 选择页码的回调
 *          result:{ ev: event, currentPage: page}
 *
 *
 *
 *
 * @example
 *  <jm-pagination
 *      total-page="numPages"
 *      boundary-links="true"
 *      on-select-page="selectPage(page)"
 *      previous-text="Previous"
 *      next-text="Next"
 *      max-size="5"
 *      current-Page="currentPage">
 *  </jm-pagination>
 *
 */
    .directive('jmPagination', function ($parse) {
        return {
            restrict: 'AE',
            templateUrl: tmpPage,
            scope: {
                // 总页数
                totalPage: '=',

                // 当前页
                currentPage: '=',

                // 页码改变回调方法
                onSelectPage: '&'
            },
            controller: function ($scope, $element, $attrs) {
                // 配置屬性
                angular.extend($scope, {
                    pages: [],
                    itemsPerPage: $attrs.itemsPerPage || 10,
                    maxSize: parseInt($attrs.maxSize) || 5,
                    totalItems: $attrs.totalItems,
                    nextText: $attrs.nextText,
                    previousText: $attrs.previousText,
                    firstText: $attrs.firstText,
                    lastText: $attrs.lastText,
                    inputLinks: $attrs.inputLinks || true,
                    directionLinks: $attrs.directionLinks || true,
                    isKeyUp: $attrs.directionLinks || 13
                });


                // 挂载属性
                angular.extend($scope, {
                    // 分页初始化
                    init: function () {
                        var self = this;
                        if ($attrs.itemsPerPage) {
                            $scope.totalPage = this.calculateTotalPage();
                        }

                        // 每页大小改变
                        this.$parent.$watch($parse($attrs.itemsPerPage), function (value) {
                            if (value) {
                                self.itemsPerPage = parseInt(value, 10);
                                $scope.totalPage = self.calculateTotalPage();
                            }
                        });
                    },

                    /**
                     * 计算总页码
                     * @author zhoul
                     * @returns {number} 计算后的总页码
                     */
                    calculateTotalPage: function () {
                        var totalPage = $scope.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
                        return Math.max(totalPage || 0, 1);
                    },

                    /**
                     * 创建分页
                     * @author zhoul
                     * @param {number} currentPage 当前页码
                     * @param {number} totalPages  总页码
                     */
                    makePage: function (currentPage, totalPages) {
                        var maxSize = $scope.maxSize;
                        var start = 2;
                        var end = start + maxSize;
                        $scope.pages = [];

                        // 判斷总页码是否小于最大显示页
                        if (totalPages < maxSize) {
                            end = totalPages - 1;
                        } else {
                            if (currentPage <= maxSize) {
                                start = (start < 2) ? 2 : start;
                            } else if (currentPage > totalPages - maxSize) {
                                start = totalPages - maxSize;
                            } else {
                                start = currentPage - Math.floor(maxSize / 2);
                            }
                        }

                        while (maxSize--) {
                            if (start < totalPages) {
                                $scope.pages.push({
                                    index: start,
                                    isActive: currentPage == start
                                });
                            }
                            start++;
                        }
                    },

                    /**
                     * 选择上一页
                     * @author zhoul
                     * @param {object} $event 事件对象
                     */
                    selectPrevious: function ($event) {
                        var p = $scope.currentPage - 1;
                        $scope.setPage($event, p < 1 ? 1 : p);
                        ($scope.onSelectPrevious || angular.noop)({
                            event: $event
                        });
                    },

                    /**
                     * 选择下一页
                     * @author zhoul
                     * @param {object} $event 事件对象
                     */
                    selectNext: function ($event) {
                        var p = $scope.currentPage + 1;
                        $scope.setPage($event, p > $scope.totalPage ? $scope.totalPage : p);
                        ($scope.onSelectNext || angular.noop)({
                            event: $event
                        });
                    },

                    /**
                     * 设置页码
                     * @author zhoul
                     * @param {object} $event 事件对象
                     * @param {number} p      页码
                     */
                    setPage: function ($event, p) {
                        var ngInput = $element.find('input') || null;
                        $event.preventDefault();

                        if (p !== $scope.currentPage) {

                            if (!+p || p < 1) {
                                p = 1
                            } else if (p > $scope.totalPage) {
                                p = $scope.totalPage
                            }

                            $scope.currentPage = p = parseInt(p, 10);
                            ($scope.onSelectPage || angular.noop)({
                                page: {
                                    event: $event,
                                    currentPage: p
                                }
                            });


                            $scope.makePage(p, $scope.totalPage);
                            $scope.currentPage = p;
                            ngInput.val(p);
                        }
                    },

                    /**
                     * 页码输入框回车事件
                     * @author zhoul
                     * @param {object} $event 事件对象
                     * @param {number} p      输入框中的页码
                     */
                    inputKeyUp: function ($event, p) {
                        var keyCode = $event.keyCode;
                        if (keyCode === 13) {
                            $scope.setPage($event, p);
                        }
                    }
                });

                $scope.init();

                // 监视总页数改变 总页数改变初始化分页
                $scope.$watch('totalPage', function (value) {
                    $scope.makePage($scope.currentPage, $scope.totalPage);
                });
            }
        };
    });