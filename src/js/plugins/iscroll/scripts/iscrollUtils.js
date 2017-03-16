/**
 * 自定义的 Iscroll 工具文件2016年12月15日 戴锦辉
 */
var IScroll = require("./iscroll");
/**
 * 初始化垂直滚动组件
 * @param options 滚动组件的配置项
 *        $wrapper wrapper 的 jquery 对象
 *        scrollerHeight 滚动组件的高度
 *        pullDownHandler 下拉的处理函数
 *        pullUpHandler 上拉的处理函数
 *        pullThreshold 拖动刷新或者加载的阀值，默认 5 像素
 *        hasPullDown 是否显示下拉提示，默认 true
 *        hasPullUp 是否显示上拉提示，默认 true
 *        isAlwaysShowPullUp 是否一直显示上拉提示，true 一直显示上拉加载的提示，false 仅在上拉的时候显示提示，默认 true
 *        oPullDownTips 下拉提示文本内容，JSON 对象，其内容可以是html字符串
 *            still 静止时的文本，默认 下拉刷新
 *            flip 下拉过程中的文本，默认 释放立即刷新
 *            loading 加载中的文本，默认 正在刷新...
 *        oPullUpTips 上拉提示文本内容，JSON 对象，其内容可以是html字符串
 *            still 静止时的文本，默认 上拉加载下一页
 *            flip 上拉过程中的文本，默认 释放加载下一页
 *            loading 加载中的文本，默认 正在加载...
 *        onScrollStart 滚动开始执行的函数
 *        onScrollMove 滚动过程中执行的处理函数
 *        onScrollEnd 滚动结束执行的函数
 */
function vScroller(options) {
    var defaultOptions = {
        probeType: 2, // 指定滚动事件的精度、频率，一般为 2，可取值 1/2/3 ，值越大，精度越高，不指定 scroll 事件不触发
        preventDefaultException: {
            tagName: /[INPUT|TEXTAREA|SELECT]/
        }, // 对默认行为的处理
        click: true,
        scrollbars: true, // 显示滚动条
        fadeScrollbars: true, // 不活动时，隐藏滚动条
        tap: false // 禁用 Iscroll 的tap事件，此时由于 zepto 的缘故，绑定 tap 事件仍然有效
    };

    if (!options) {
        throw new Error('配置参数不能为空');
    }
    if (!options.$wrapper || options.$wrapper.length != 1) {
        throw new Error("wrapper 元素错误");
    }
    if (options.$wrapper && options.$wrapper.find("[data-is-content='true']").length != 1) {
        throw new Error('滚动内容元素错误，请设置  data-is-content="true" 属性');
    }
    options.hasPullDown = typeof(options.hasPullDown) === "undefined" ? true : options.hasPullDown; // 是否显示下拉提示，默认 true
    options.hasPullUp = typeof(options.hasPullUp) === "undefined" ? true : options.hasPullUp; // 是否显示上拉提示，默认 true
    options.isAlwaysShowPullUp = typeof(options.isAlwaysShowPullUp) === "undefined" ? true : options.isAlwaysShowPullUp; // 是否显示下拉提示，默认 true
    options.pullThreshold = typeof(options.pullThreshold) === "undefined" ? 5 : options.pullThreshold; // 拖动刷新或者加载的阀值，默认 5 像素
    options.oPullDownTips = $.extend({still: "下拉刷新", flip: "释放立即刷新", loading: "正在刷新..."}, options.oPullDownTips);
    options.oPullUpTips = $.extend({still: "上拉加载下一页", flip: "释放加载下一页", loading: "正在加载..."}, options.oPullUpTips);
    options = $.extend(defaultOptions, options);
    var $pullDown = options.$wrapper.find(".iscroll_pullDown");
    var $pullUp = options.$wrapper.find(".iscroll_pullUp");
    var pullDownOffsetHeight = ($pullDown[0] && $pullDown[0].offsetHeight) || 0; // 下拉提示的高度
    var pullUpOffsetHeight = ($pullUp[0] && $pullUp[0].offsetHeight) || 0; // 上拉提示的高度
    // 设置 wrapper 和 scroller 的 css
    options.$wrapper.css("height", options.scrollerHeight + "px").css("overflow", "hidden"); // 需指定 wrapper 的高度
    var setWrapperAndScrollCss = function () {
        if (options.$wrapper.find("[data-is-content='true']").height() <= options.scrollerHeight) {
            options.$wrapper.children().css("height", options.scrollerHeight + 1 + "px"); // 需指定 scroller 的高度
        }
        else {
            options.$wrapper.children().css("height", "initial"); // 不需要指定 scroller 的高度
        }
    };
    setWrapperAndScrollCss();
    // 根据配置显示/隐藏上拉提示
    if ((!options.isAlwaysShowPullUp || !options.hasPullUp) && $pullUp.length > 0) {
        $pullUp.css("display", "none");
    }
    else if ($pullUp.length > 0) {
        $pullUp.css("display", "block");
    }
    // 隐藏上拉提示，防止Iscroll初始化的时候因包含上拉提示，而导致的高度计算错误
    if ($pullDown.length > 0) {
        $pullDown.css("display", "none");
    }
    var myScroller = new IScroll(options.$wrapper[0], options);
    // 显示上拉提示
    if ($pullDown.length > 0) {
        $pullDown.css("display", "block");
    }
    myScroller.on("scrollStart", function () {
        pullDownOffsetHeight = ($pullDown[0] && $pullDown[0].offsetHeight) || 0;
        options.onScrollStart && options.onScrollStart();
    });
    myScroller.on("scroll", function () {
        if ($pullDown.length > 0) {
            if (myScroller.y > pullDownOffsetHeight + options.pullThreshold && !$pullDown.hasClass('flip')) {
                $pullDown.addClass('flip').removeClass("scrolledUp").find('.pullDownLabel').html(options.oPullDownTips.flip);
                myScroller.scrollBy(0, -pullDownOffsetHeight, 0);
            }
            // 取消下拉时
            else if (myScroller.y < 0 && $pullDown.hasClass('flip')) {
                $pullDown.removeClass("flip").addClass("scrolledUp").find(".pullDownLabel").html(options.oPullDownTips.still);
                myScroller.scrollBy(0, pullDownOffsetHeight, 0);
            }
        }
        if ($pullUp.length > 0) {
            if (myScroller.y < myScroller.maxScrollY) {
                if (options.hasPullUp && $pullUp.length > 0 && $pullUp.css("display") === "none") {
                    $pullUp.css("display", "block");
                }
                pullUpOffsetHeight = ($pullUp[0] && $pullUp[0].offsetHeight) || 0; // 上拉提示的高度
            }
            // 上拉时
            else if (myScroller.y > myScroller.maxScrollY) {
                // 如果不是一直显示上拉提示，将上拉提示隐藏
                if (!options.isAlwaysShowPullUp && options.hasPullUp && $pullUp.length > 0 && $pullUp.css("display") !== "none") {
                    $pullUp.css("display", "none");
                }
            }

            // 当是一直显示上拉提示，或者当滚动的内容比容器小时
            if (options.isAlwaysShowPullUp || options.$wrapper.children().height() === options.scrollerHeight + 10) {
                if (myScroller.y < (myScroller.maxScrollY - options.pullThreshold) && !$pullUp.hasClass('flip')) {
                    $pullUp.addClass("flip").find('.pullUpLabel').html(options.oPullUpTips.flip);
                }
                else if (myScroller.y > (myScroller.maxScrollY + options.pullThreshold) && $pullUp.hasClass('flip')) {
                    $pullUp.removeClass("flip").find('.pullUpLabel').html(options.oPullUpTips.still);
                }
            }
            // 当不是一直显示上拉提示，并且滚动的内容比容器大时，设置 maxScrollY ，在滚动终止时，显示正在加载的提示
            else {
                if (myScroller.y < (myScroller.maxScrollY - pullUpOffsetHeight) && !$pullUp.hasClass('flip')) {
                    $pullUp.addClass("flip").find('.pullUpLabel').html(options.oPullUpTips.flip);
                    // 设置 maxScrollY ，在滚动终止时，显示正在加载的提示
                    if (options.$wrapper.find("[data-is-content='true']").height() + pullUpOffsetHeight > options.scrollerHeight) {
                        myScroller.maxScrollY -= pullUpOffsetHeight;
                    }
                }
                else if (myScroller.y > (myScroller.maxScrollY + options.pullThreshold) && $pullUp.hasClass('flip')) {
                    $pullUp.removeClass("flip").find('.pullUpLabel').html(options.oPullUpTips.still);
                }
            }
        }
        options.onScrollMove && options.onScrollMove();
    });
    var scrollEndRestorClass = function () {
        var result = "";
        if ($pullDown.length > 0 && $pullDown.hasClass('flip')) {
            $pullDown.removeClass("flip").addClass('loading').find('.pullDownLabel').html(options.oPullDownTips.loading);
            result = "pullDown";
        }
        // 根据配置隐藏上拉提示
        if (!options.isAlwaysShowPullUp && !$pullUp.hasClass('flip') && $pullUp.length > 0 && $pullUp.css("display") !== "none") {
            $pullUp.css("display", "none");
        }
        else if ($pullUp.length > 0 && $pullUp.hasClass('flip')) {
            $pullUp.removeClass("flip").addClass('loading').find('.pullUpLabel').html(options.oPullUpTips.loading);
            result = "pullUp";
        }
        return result;
    }; // 滚动结束恢复样式
    myScroller.on("scrollEnd", function () {
        var scrollDirection = scrollEndRestorClass(); // 滚动结束恢复样式
        if (scrollDirection == "pullDown") {
            options.pullDownHandler && options.pullDownHandler();
        }
        else if (scrollDirection == "pullUp") {
            options.pullUpHandler && options.pullUpHandler();
        }
        options.onScrollEnd && options.onScrollEnd();
    });
    myScroller.on("refresh", function () {
        scrollEndRestorClass(); // 滚动结束恢复样式
        if ($pullDown.length > 0 && $pullDown.hasClass("loading")) {
            $pullDown.removeClass("loading").addClass("scrolledUp").find(".pullDownLabel").html(options.oPullDownTips.still);
        }
        else if ($pullUp.length > 0 && $pullUp.hasClass("loading")) {
            $pullUp.removeClass("loading").find(".pullUpLabel").html(options.oPullUpTips.still);
        }
    });
    // 防止外部直接调用执行 refresh 出错
    var originalRefresh = myScroller.refresh;
    myScroller.refresh = function () {
        // 隐藏上拉提示，防止Iscroll重计算时的时候因包含上拉提示，而导致的高度计算错误
        if ($pullDown.length > 0) {
            $pullDown.css("display", "none");
        }
        // 根据配置隐藏上拉提示
        if (!options.isAlwaysShowPullUp && $pullUp.length > 0) {
            $pullUp.css("display", "none");
        }
        setWrapperAndScrollCss();
        setTimeout(function () {
            originalRefresh.call(myScroller);
            // 显示上拉提示
            if ($pullDown.length > 0) {
                $pullDown.css("display", "block");
            }
        }, 20); // 确保正确刷新
    };
    // 保存原始的 destroy 函数
    var originalDestroy = myScroller.destroy;
    myScroller.destroy = function () {
        if ($pullDown.length > 0) {
            $pullDown.css("display", "none").removeClass("loading").addClass("scrolledUp").find(".pullDownLabel").html(options.oPullDownTips.still);
        }
        if ($pullUp.length > 0) {
            $pullUp.css("display", "none").removeClass("loading").find(".pullUpLabel").html(options.oPullUpTips.still);
        }
        originalDestroy.call(this);
        myScroller = null;
    };
    return myScroller;
}

/**
 * 初始化水平滚动组件
 * @param options 滚动组件的配置项
 *        $wrapper wrapper 的 jquery 对象
 *        autoTime 自动滚动的间隔时间，单位毫秒，默认 2000
 *        $tabNav 导航点 jquery 对象
 *        autoScroll 是否是自动滚动，默认 false
 *        scrollEndHandler 滚动结束时的处理函数
 */
function hScroller(options) {
    var defaultOptions = {
        snap: true,
        momentum: false,
        scrollX: true,
        probeType: 2, // 指定滚动事件的精度、频率，一般为 2，可取值 1/2/3 ，值越大，精度越高，不指定 scroll 事件不触发
        click: true,
        tap: false // 禁用 Iscroll 的tap事件，此时由于 zepto 的缘故，绑定 tap 事件仍然有效
    };

    if (!options) {
        throw new Error('配置参数不能为空');
    }
    if (!options.$wrapper || options.$wrapper.length != 1) {
        throw new Error("wrapper 元素错误");
    }
    // 自动播放的时间
    options.autoTime = (options.autoScroll && options.autoTime) || 2000; // 自动滚动的间隔时间，单位毫秒，默认 2000
    options = $.extend(defaultOptions, options);
    var scrollDirection = 0; // 滚动方向，1 从左到右滚动，-1 从右到左滚动，0 静止
    var $scroller = options.$wrapper.children();
    var myScroller = new IScroll(options.$wrapper[0], options);
    if (options.autoScroll) {
        scrollDirection = 1;
        hScrollerTimer = setInterval(function () {
            if (scrollDirection == 1) {
                myScroller.next();
            }
            else {
                myScroller.prev();
            }
        }, options.autoTime);

        myScroller.on("scrollEnd", function () {
            if ((myScroller.currentPage.pageX == myScroller.pages.length - 1 && scrollDirection == 1)
                || (myScroller.currentPage.pageX == 0 && scrollDirection != 1)) {
                scrollDirection = scrollDirection * -1;
            }
            if (options.$tabNav && options.$tabNav.length > 0 && options.$tabNav.children().length) {
                options.$tabNav.children().eq(myScroller.currentPage.pageX).addClass("current").siblings().removeClass("current");
            }
            options.scrollEndHandler && options.scrollEndHandler();
        });
    }
    // 获取当前页面的索引，从 0 开始
    myScroller.getCurPageIdx = function () {
        return myScroller.currentPage.pageX;
    };
    // 获取当前滚动方向，1 从左到右滚动，-1 从右到左滚动，0 静止
    myScroller.getCurScrollDirection = function () {
        return scrollDirection;
    };
    // 保存原始的 destroy 函数
    var originalDestroy = myScroller.destroy;
    myScroller.destroy = function () {
        if (myScroller.pages) {
            myScroller.goToPage(0, 0);
        }
        if (options.$tabNav && options.$tabNav.length > 0 && options.$tabNav.children().length) {
            options.$tabNav.children().eq(0).addClass("current").siblings().removeClass("current");
        }
        if (hScrollerTimer) {
            clearInterval(hScrollerTimer);
            hScrollerTimer = null;
        }
        originalDestroy.call(this);
        myScroller = null;
    };
    return myScroller;
}

module.exports = {
    vScroller: vScroller,
    hScroller: hScroller
};