;(function($){
      function detect(ua){
        var os = this.os = {}, browser = this.browser = {},
          webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
          android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
          osx = !!ua.match(/\(Macintosh\; Intel /),
          ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
          ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
          iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
          webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
          wp = ua.match(/Windows Phone ([\d.]+)/),
          touchpad = webos && ua.match(/TouchPad/),
          kindle = ua.match(/Kindle\/([\d.]+)|Silk\/([\d._]+)/),
          silk = ua.match(/Silk\/([\d._]+)/),
          blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
          bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
          rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
          playbook = ua.match(/PlayBook/),
          chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
          firefox = ua.match(/Firefox\/([\d.]+)/),
          ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
          webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
          safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/)
          symbian = ua.match(/SymbianOS\/([\d.]+)/);
        // Todo: clean this up with a better OS/browser seperation:
        // - discern (more) between multiple browsers on android
        // - decide if kindle fire in silk mode is android or not
        // - Firefox on Android doesn't specify the Android version
        // - possibly devide in os, device and browser hashes

        if (browser.webkit = !!webkit) browser.version = webkit[1]

        if (android) os.android = true, os.version = android[2]
        if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
        if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
        if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null
        if (wp) os.wp = true, os.version = wp[1]
        if (webos) os.webos = true, os.version = webos[2]
        if (touchpad) os.touchpad = true
        if (blackberry) os.blackberry = true, os.version = blackberry[2]
        if (bb10) os.bb10 = true, os.version = bb10[2]
        if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2]
        if(symbian) os.symbian = true, os.version = symbian[1]

        if (playbook) browser.playbook = true
        if (kindle) os.kindle = true, os.version = kindle[1] || kindle[2]
        if (silk) browser.silk = true, browser.version = silk[1]
        if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
        if (chrome) browser.chrome = true, browser.version = chrome[1]
        if (firefox) browser.firefox = true, browser.version = firefox[1]
        if (ie) browser.ie = true, browser.version = ie[1]
        if (safari && (osx || os.ios)) {browser.safari = true; if (osx) browser.version = safari[1]}
        if (webview) browser.webview = true
  

        os.tablet = !!(ipad || playbook || kindle || os.symbian || (android && !ua.match(/Mobile/)) ||
          (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)))
        os.phone  = !!(!os.tablet && !os.ipod&& (android || iphone || webos || blackberry || bb10 ||
          (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
          (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))))
      }

      detect.call($, navigator.userAgent)
      // make available to unit tests
      $.__detect = detect

    })(Zepto);
    (function($) {
         /**
             * @name $.support
             * - ***orientation*** 检测是否支持转屏事件，UC中存在orientaion，但转屏不会触发该事件，故UC属于不支持转屏事件(iOS 4上qq, chrome都有这个现象)
        */
        var br  =  $.browser;
        $.support = $.extend($.support || {}, {
            orientation: !(br.uc || (parseFloat($.os.version) < 5 && (br.qq || br.chrome))) && !($.os.android && parseFloat($.os.version) > 3) && "orientation" in window && "onorientationchange" in window
        });
    })(Zepto);
    (function($) {
        /**
        * @name $.support
        * 是否嵌套壳
        */
        function detectShell(ua) {
            var shell = this.shell = {},
                weibo = ua.match(/_weibo_/i),
                weixin = ua.match(/MicroMessenger/i);
            if(weibo) shell.weibo = true;
            if(weixin) shell.weixin = true;
            shell.isShell = !!(weixin || weibo);
        }
        detectShell.call($,  navigator.userAgent);
    })(Zepto);