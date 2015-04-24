$(function() {

    $('#deviceInfo').text($.os.phone ? '手持设备' : ($.os.tablet ? '平板': 'pc'));
    var osInfo = '未知';
    if($.os.phone || $.os.tablet) {
        if($.os.ios) {
            if($.os.ipad) {
                osInfo = 'ios系统(ipad) 版本:' + $.os.version;
            } else if($.os.iphone) {
                osInfo = 'ios系统(iphone) 版本:' + $.os.version;
            } else {
                osInfo = 'ios系统(ipod) 版本:' + $.os.version;
            }
        } else if($.os.blackberry) {
            osInfo = '黑莓智能系统(BlackBerry) ,版本:' + $.os.version;
        }  else if ($.os.rimtabletos) {
            osInfo = 'BlackBerry Tablet OS系统(PlayBook) ,版本:' + $.os.version;
        } else if($.os.bb10){
            osInfo = '黑莓智能系统(bb10) ,版本:' + $.os.version +'<a href="http://baike.baidu.com/view/8500602.htm?fr=aladdin">详情</a>';
        } else if($.os.android) {
            osInfo = 'android ,版本:' + ($.os.version ? $.os.version : '未知');
        } else if($.os.wp) {
            osInfo = 'wp系统 ,版本:' + $.os.version;
        } else if($.os.symbian) {
            osInfo = 'symbian系统 ,版本:' + $.os.version;
        } else if($.os.webos && $.os.touchpad){
            osInfo = 'webos系统(touchpad),版本:' + $.os.version;
        } else if($.os.webos) {
            osInfo = 'webos系统,版本:' + $.os.version;
        } else if($.os.kindle) {
            osInfo = 'kindle,版本:' + $.os.version;
        }
    }
    $('#osInfo').html(osInfo);
    var browserInfo = '未知';
    if($.browser.webkit) {
        if($.browser.uc){
            browserInfo = 'U3内核(uc浏览器),版本:' + $.browser.version;
        } else if($.browser.qq) {
            browserInfo = 'webkit内核(qq),版本:' + $.browser.version;
        } else if($.browser.safari) {
            browserInfo = 'webkit内核(safari),版本:' + $.browser.version;
        } else if($.browser.chrome) {
            browserInfo = 'webkit内核(chrome),版本:' + $.browser.version;
        } else {
            browserInfo = 'webkit内核,版本:' + $.browser.version;
        }
    } else if($.browser.ie){
        browserInfo = 'Trident内核(ie),版本:' + $.browser.version;
    } else if($.browser.firefox) {
        browserInfo = 'Firefox,版本:' + $.browser.version;
    }
    $('#browserInfo').html(browserInfo);

    var shellInfo = '否';
    if($.shell.isShell) {
        if($.shell.weibo) {
            shellInfo = '是(微博)';
        } else if($.shell.weixin) {
            shellInfo = '是(微信)';
        } else if($.shell.qq) {
            shellInfo = '是(QQ)';
        }
    }
    $('#shellInfo').text(shellInfo);

    $('#orientationSupport').text($.support.orientation ? '支持' : '不支持');
    $('#defaultInnerHeight').text(window.innerHeight + '(innerHeight);' + $(window).height() +'(docheight)');
    $('#defaultInnerWidth').text(window.innerWidth + '(innerWidth);' + $(window).width() +'(docWidth)');
    $('#defaultOrientationAngle').text(window.orientation);

    var portrait_map = {0: true, 180:true};
    var isPortrait = true, elem = document.documentElement;
    if($.support.orientation) {
        isPortrait = portrait_map[ window.orientation ];
    } else {
        isPortrait = elem && elem.clientWidth / elem.clientHeight < 1.1;
    }
    $('#defaultorientationStatus').text(isPortrait ? '竖屏': '横屏');


    var test = {
        init: function() {
            $('#orientationAngle').text(window.orientation);
            if($.support.orientation) {
                isPortrait = portrait_map[ window.orientation ];
            } else {
                isPortrait = elem && elem.clientWidth / elem.clientHeight < 1.1;
            }
            $('#orientationStatus').text(isPortrait ? '竖屏': '横屏');

            $('#innerHeight').text(window.innerHeight + '(innerHeight);' + $(window).height() +'(docheight)');
            $('#innerWidth').text(window.innerWidth + '(innerWidth);' + $(window).width() +'(docWidth)');
        }
    }
    if(window.orientation !== undefined) {
        $(window).on('orientationchange', function(event) {
            test.init(event);                
        });     
    } else if(screen.orientation !== undefined){
        $(screen).on('orientationchange', function(event) {
            test.init(event);                
        })
    } else {
        $(window).on('resize', function(event) {
            test.init(event);                
        });     
    }
});