/**
 * Created by JinnHo on 2017/4/27.
 */

/**
 * @param {String} src 专题路径(例如：红星美凯龙下的芝华仕沙发  redstar/cheers)
 * @param {String} type1Url 默认音乐图标的地址
 * @param {String} type2Url 关闭音乐图标的地址
 * @param {boolean} isRotate 是否旋转
 * @param {number} top 距离右方的距离（px）
 * @param {number} right 距离上方的距离（px）
 * @param {number} autoPlay 是否默认播放（默认true）
 */
function J_addMusic(src, type1Url, type2Url) {
    var _extends = arguments[3] ? arguments[3] : [];

    if (typeof _extends != "object") {
        console.log("addMusic param error : extends param type(object) ->" + typeof _extends);
        return false;
    }

    //音乐添加
    var audioStr = '<audio src="' + src + '" class="sound" id="play_audio" loop autoplay></audio>';
    var msBtnStr = '<div class="ms"></div>';
    $("body").prepend(audioStr + msBtnStr);

    var isRotate = _extends.isRotate ? _extends.isRotate : false;
    var top = _extends.top ? _extends.top : 22;
    var right = _extends.right ? _extends.right : 19;
    var autoPlay = _extends.autoPlay ? _extends.autoPlay : true;

    function audioAutoPlay(id) {
        var audio = document.getElementById(id),
            play = function () {
                audio.play();
                document.removeEventListener("touchstart", play, false);
            };
        if (autoPlay != "false") {
            audio.play();
            document.addEventListener("WeixinJSBridgeReady", function () {//微信
                play();
            }, false);
            document.addEventListener("touchstart", play, false);
        } else {
            audio.pause();
        }
    }

    audioAutoPlay('play_audio');

    //音乐按钮
    var vn = true;
    var ms = $(".ms");

    var start_time = new Date().getTime();
    var img = new Image();
    img.src = type1Url + "?" + start_time;

    var typeUrl = "";
    if (autoPlay == "false") {
        typeUrl = type2Url;
        vn = false;
    } else {
        typeUrl = type1Url;
    }

    var check = function () {
        if (img.width > 0 || img.height > 0) {
            ms.css({
                position: "fixed",
                top: top,
                right: right,
                zIndex: "9",
                background: "url(" + typeUrl + ")",
                height: img.height,
                width: img.width
            });
            clearInterval(set);
        }
    };

    var set = setInterval(check, 40);

    ms.click(function () {
        ms.css('background', 'url(' + type1Url + ')');
        if (vn == true) {
            $("audio").get(0).pause();
            ms.css('background', 'url(' + type2Url + ')');
            ms.removeClass("wx_rotate360");
            vn = false
        }
        else {
            $("audio").get(0).play();
            ms.css('background', 'url(' + type1Url + ')');
            if (isRotate)
                ms.addClass("wx_rotate360");
            vn = true
        }
    });
    if (isRotate) {
        var str = '<style>.wx_rotate360 { -webkit-animation: wx_rotate360 5s infinite linear; -webkit-transform-origin: center center;}' +
            '@-webkit-keyframes wx_rotate360 {0%{ -webkit-transform: rotate(0deg);}100% { -webkit-transform: rotate(360deg);}}</style>';
        $("head").append(str);
        ms.addClass("wx_rotate360");
    }
}

//判断电话号码是否正确
String.prototype.isPhone = function () {
    return /^1[34578]\d{9}$/.test(this.toString());
};

//获取链接参数值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}

//添加腾讯视频
function addTenVideo(vid, width, height, autoplay, img, divId) {
    $.getScript('http://qzs.qq.com/tencentvideo_v1/js/tvp/tvp.player.js', function () {
        var video = new tvp.VideoInfo();
        video.setVid(vid);
        var player = new tvp.Player(width, height);
        player.setCurVideo(video);
        player.addParam("wmode", "transparent");
        player.addParam('autoplay', autoplay);
        player.addParam('pic', img);
        player.addParam('showend', 0);
        player.addParam("flashskin", "http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf");
        player.write(divId);
    });
}

//倒计时
function showCountDown(year, month, day, interval, divname) {
    window.setInterval(function () {
        var now = new Date();
        var endDate = new Date(year, month - 1, day);
        var leftTime = endDate.getTime() - now.getTime();
        var leftsecond = parseInt(leftTime / 1000);
        var day1 = Math.floor(leftsecond / (60 * 60 * 24));
        var hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
        var minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
        var second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
        var cc = document.getElementById(divname);
        cc.innerHTML = "<span>" + day1 + "</span>天<span>" + hour + "</span>小时<span>" + minute + "</span>分<span>" + second + "</span>秒";
    }, interval);
}

//ajax请求数据
var J_getReData = {
    method: function (servUrl, mData, success) {
        $.ajax({
            url: servUrl,
            dataType: "json",
            data: mData,
            type: "post",
            success: function (data) {
                success ? success(data) : function () {
                };
            },
            error: function (data) {
                console.log(data);
                alert("网络异常！请刷新重试。");
            }
        });
    }
};

//初始化图片链接
function J_initIMG() {
    var img = $("img[data-img]");
    var bg = $("div[data-bg]");
    for (var i = 0; i < img.length; i++) {
        img.eq(i).attr("src", link + img.eq(i).data("img"));
    }
    for (var j = 0; j < bg.length; j++) {
        bg.eq(j).css("background-image", "url(" + link + bg.eq(j).data('bg') + ")");
    }
}

//简单微信控制台显示窗
function J_wxConsole(text) {
    var txt = text;
    var div = '<div style="position: absolute;width:100%;height:50px;line-height:50px;z-index: 9999;left:0;top:-50px;background: rgba(0,0,0,.3);color:white;padding-left:10px;transition: all .5s;" id="wxConsole"></div>';
    var _wxConsole = $("#wxConsole");
    if (_wxConsole.length > 0) {
        _wxConsole.css({top: "0"});
        _wxConsole.html(txt);
    } else {
        $("body").prepend(div);
        J_wxConsole(txt);
    }
    _wxConsole.on("touchstart", function () {
        _wxConsole.css({top: "-50px"});
    })
}

//获取百度定位
function J_getBaiduData(callback) {
    var prov = "广东";
    var city = "广州";
    var dataStr = "";
    var strArr = [];
    $.ajax({
        async: false,
        url: "http://api.map.baidu.com/location/ip?ak=kbVferfCPUIn3G1HG4nxGPub",
        type: 'GET',
        dataType: 'JSONP',
        success: function (data) {
            dataStr = data.address;
            strArr = dataStr.split("|");
            prov = strArr[1];
            city = strArr[2];
            callback(prov, city);
        },
        error: function (XMLHttpRequest) {
            if (XMLHttpRequest.readyState == '0') {
                alert("网络异常！");
            }
        }
    });
}

//picker简单初始化省市
var J_picker;
function J_initPickerPAndC(domP, domC) {
    var first = [];
    var second = [];
    var selectedIndex = [0, 0];
    var checked = [0, 0];

    function creatList(obj, list) {
        obj.forEach(function (item, index) {
            var temp = new Object();
            temp.text = item.name;
            temp.value = index;
            list.push(temp);
        })
    }

    creatList(city, first);
    if (city[selectedIndex[0]].hasOwnProperty('sub')) {
        creatList(city[selectedIndex[0]].sub, second);
    } else {
        second = [{text: '', value: 0}];
    }
    J_picker = new Picker({
        data: [first, second],
        selectedIndex: selectedIndex,
        title: '地址选择'
    });
    J_picker.on('picker.select', function (selectedVal, selectedIndex) {
        domP.html(first[selectedIndex[0]].text);
        domC.html(second[selectedIndex[1]].text);
    });
    J_picker.on('picker.change', function (index, selectedIndex) {
        if (index === 0) {
            second = [];
            checked[0] = selectedIndex;
            var firstCity = city[selectedIndex];
            if (firstCity.hasOwnProperty('sub')) {
                creatList(firstCity.sub, second);
            } else {
                second = [{text: '', value: 0}];
                checked[1] = 0;
            }
            J_picker.refillColumn(1, second);
            J_picker.scrollColumn(1, 0)
        }
    });
}

/**
 * @param {number} type loading样式
 * @param {String} color loading样式颜色
 * @param {String} background loading背景颜色
 */
//添加默认loading页
function J_addLoading(type) {
    var _extends = arguments[1] ? arguments[1] : [];
    if (typeof _extends != "object") {
        console.log("param error : extends param type(object) ->" + typeof _extends);
        return false;
    }
    var color = _extends.color ? _extends.color : "#67CF22";
    var background = _extends.background ? _extends.background : "black";

    var loadingBox = '.J_preLoading{position:absolute;width:100%;height:100%;z-index:999;top:0;left:0;background-color:' + background + '}';
    var loading = [
        '._loading1{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:60px;height:100px;text-align:center;font-size:10px}._loading1>div{background-color:' + color + ';height:100%;width:8px;margin:0 1px;display:inline-block;-webkit-animation:_loading1 1.2s infinite ease-in-out;animation:_loading1 1.2s infinite ease-in-out}._loading1>div:nth-last-child(4){-webkit-animation-delay:-1.1s;animation-delay:-1.1s}._loading1>div:nth-last-child(3){-webkit-animation-delay:-1s;animation-delay:-1s}._loading1>div:nth-last-child(2){-webkit-animation-delay:-.9s;animation-delay:-.9s}._loading1>div:nth-last-child(1){-webkit-animation-delay:-.8s;animation-delay:-.8s}@-webkit-keyframes _loading1{0%,100%,40%{-webkit-transform:scaleY(.4)}20%{-webkit-transform:scaleY(1)}}@keyframes _loading1{0%,100%,40%{transform:scaleY(.4);-webkit-transform:scaleY(.4)}20%{transform:scaleY(1);-webkit-transform:scaleY(1)}}',
        '._loading2{position:relative;width:100px;height:100px;top:50%;margin:0 auto;margin-top:-50px;animation:_loading2 3s linear infinite}._loading2>div{position:absolute;top:0;width:55px;height:55px;border-radius:100%;background-color:#e50015;animation:_loading2_2 3s ease-in-out infinite}._loading2>div:nth-last-child(1){top:auto;bottom:0;background-color:#25ab3a;animation-delay:-1s}._loading2>div:nth-last-child(2){top:23%;right:0;background-color:#fdd900;animation-delay:-2s}@-webkit-keyframes _loading2{100%{transform:rotate(-360deg)}}@keyframes _loading2{100%{transform:rotate(-360deg)}}@-webkit-keyframes _loading2_2{0%,100%{transform:scale(0)}50%{transform:scale(1)}}@keyframes _loading2_2{0%,100%{transform:scale(0)}50%{transform:scale(1)}}',
        '._loading3{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);text-align:center;margin:0 auto}._loading3>div{display:inline-block;width:30px;height:30px;margin:0 2px;border-radius:15px;background-color:' + color + '}._loading3>div:nth-last-child(1){animation:_loading3 2s .5s ease-in-out infinite}._loading3>div:nth-last-child(2){animation:_loading3 2s .4s ease-in-out infinite}._loading3>div:nth-last-child(3){animation:_loading3 2s .3s ease-in-out infinite}._loading3>div:nth-last-child(4){animation:_loading3 2s .2s ease-in-out infinite}._loading3>div:nth-last-child(5){animation:_loading3 2s .1s ease-in-out infinite}@-webkit-keyframes _loading3{0%,100%,50%{transform:translate(0,0);opacity:1}13%{transform:translate(0,15px);opacity:.6}36%{transform:translate(0,-15px);opacity:.6}}@keyframes _loading3{0%,100%,50%{transform:translate(0,0);opacity:1}13%{transform:translate(0,15px);opacity:.6}36%{transform:translate(0,-15px);opacity:.6}}',
        '._loading4{position:absolute;left:50%;top:50%;margin-top:-30px;margin-left:-30px;width:60px;height:60px;background-color:' + color + ';-webkit-animation:_loading4 1.2s infinite ease-in-out;animation:_loading4 1.2s infinite ease-in-out}@-webkit-keyframes _loading4{0%{-webkit-transform:perspective(120px)}50%{-webkit-transform:perspective(120px) rotateY(180deg)}100%{-webkit-transform:perspective(120px) rotateY(180deg) rotateX(180deg)}}@keyframes _loading4{0%{-webkit-transform:perspective(120px)}50%{-webkit-transform:perspective(120px) rotateY(180deg)}100%{-webkit-transform:perspective(120px) rotateY(180deg) rotateX(180deg)}}',
        '._loading5{position:absolute;left:50%;top:50%;margin-top:-20px;margin-left:-110px;width:220px;height:40px;text-align:center}._loading5>div{width:30px;height:30px;background-color:' + color + ';border-radius:100%;margin:auto 5px;display:inline-block;-webkit-animation:_loading5 1.4s infinite ease-in-out;animation:_loading5 1.4s infinite ease-in-out;-webkit-animation-fill-mode:both;animation-fill-mode:both}._loading5>div:nth-last-child(1){-webkit-animation-delay:-.16s;animation-delay:-.16s}._loading5>div:nth-last-child(2){-webkit-animation-delay:-.32s;animation-delay:-.32s}._loading5>div:nth-last-child(3){-webkit-animation-delay:-.48s;animation-delay:-.48s}@-webkit-keyframes _loading5{0%,100%,80%{-webkit-transform:scale(0)}40%{-webkit-transform:scale(1)}}@keyframes _loading5{0%,100%,80%{-webkit-transform:scale(0)}40%{-webkit-transform:scale(1)}}',
        '._loading6{position:absolute;left:50%;top:50%;margin-left:-110px;margin-top:-20px;width:220px;height:40px;text-align:center}._loading6>div{width:30px;height:30px;background-color:' + color + ';border-radius:100%;margin:auto 5px;display:inline-block;-webkit-animation:_loading6 2s infinite ease-in-out;animation:_loading6 2s infinite ease-in-out;-webkit-animation-fill-mode:both;animation-fill-mode:both}@-webkit-keyframes _loading6{0%,40%{transform:translate(0,0) scale(1);opacity:1}20%{transform:translate(0,-15px) scale(1.3);opacity:0}25%{transform:translate(0,5px) scale(.8);opacity:0}}@keyframes _loading6{0%,40%{transform:translate(0,0) scale(1);opacity:1}20%{transform:translate(0,-15px) scale(1.3);opacity:0}25%{transform:translate(0,5px) scale(.8);opacity:0}}._loading6>div:nth-last-child(1){-webkit-animation-delay:-.16s;animation-delay:-.16s}._loading6>div:nth-last-child(2){-webkit-animation-delay:-.32s;animation-delay:-.32s}._loading6>div:nth-last-child(3){-webkit-animation-delay:-.48s;animation-delay:-.48s}'];

    $("head").append('<style>' + loadingBox + loading[type - 1] + '</style>');
    var htmlCount = [5, 3, 5, 0, 3, 3];
    var htmlTxt = "";
    for (var i = 0; i < htmlCount[type - 1]; i++) {
        htmlTxt += "<div></div>";
    }
    $("body").prepend('<div class="J_preLoading"><div class="_loading' + type + '">' + htmlTxt + '</div></div>');
}


/**
 * 高德地图获取移动端实际定位坐标转化为真实地理位置
 * @author JinnHo 309126288@qq.com
 * @exampleURL http://webapi.amap.com/maps?v=1.3&key=48b1e4ad7ab97442d478b04b97aa1c05
 * @version 1.0  2017/8/9
 * @param callback(data) 自定义回调函数，返回地理位置对象
 * @callback {String} data.province  所在省（省编码在城市编码表中可查询到）
 * @callback {String} data.city      所在城市
 * @callback {String} data.citycode  所在城市编码
 * @callback {String} data.district  所在区
 * @callback {String} data.adcode    所在区域编码
 * @callback {String} data.township  所在乡镇
 * @callback {String} data.street    所在街道
 * @callback {String} data.streetNumber   门牌号
 * @constructor
 */
function gd_GetLocalAddress(callback) {
    /**
     * 高德地图api文件
     **/
    if(!window.EXFLAG){
        console.log("ex file unload!");
        return false;
    }
    console.log(123);
    var Lng, Lat;
    var map, geolocation;
    var lnglatXY = [];
    var Map_reAddress;
    map = new AMap.Map('container');
    map.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true
        });
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', function (data) {
            Lng = parseFloat(data.position.getLng());
            Lat = parseFloat(data.position.getLat());
            lnglatXY = [Lng, Lat];
            map.plugin('AMap.Geocoder', function () {
                var geocoder = new AMap.Geocoder({
                    radius: 1000,
                    extensions: "all"
                });
                geocoder.getAddress(lnglatXY, function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        var data = result.regeocode.addressComponent;
                        Map_reAddress = jQuery.extend(true, {}, data);
                        callback(Map_reAddress);
                    }
                });
            })
        });
        AMap.event.addListener(geolocation, 'error', function () {
            alert("获取定位出错！");
        });
    });
}
/**
 * 获取移动端touch事件方向与距离
 * @author JinnHo 309126288@qq.com
 * @version 1.0  2018/1/26
 * @param callback(data) 自定义回调函数，返回touchend结果
 * @param isOffset 自定义参数 是否获取相对位置（默认false）
 * @param moveFn 自定义参数 是否获取touchmove移动的位置（默认false）
 * @param swipeDis 自定义参数 滑动距离（默认100）
 * @constructor
 */
(function ($) {
    $.fn.extend({
        J_swipe: function (callback,obj) {
            var _extends = arguments[1] ? arguments[1] : [];
            if (typeof _extends != "object") {
                console.log("param error : extends param type(object) ->" + typeof _extends);
                return;
            }
            var isOffset = _extends.offset == true ? 1 : 0;
            var moveFn = _extends.fn ? _extends.fn : false;
            var swipeDis = _extends.swipeDis ? _extends.swipeDis : 100;

            var _this = this;
            var offset = {x: _this.offset().left, y: _this.offset().top};
            var touchesStart = {x: 0, y: 0};
            var touchesMove = {x: 0, y: 0};
            var touchesEnd = {x: 0, y: 0};
            var moveDis = {x: 0, y: 0};

            this.on("touchstart", function (e) {
                touchesStart = {
                    x: e.changedTouches[0].pageX - ((offset.x) * isOffset),
                    y: e.changedTouches[0].pageY - ((offset.y) * isOffset)
                };
                offset = {x: _this.offset().left, y: _this.offset().top};
            });
            this.on("touchend", function (e) {
                touchesEnd = {
                    x: e.changedTouches[0].pageX - ((offset.x) * isOffset),
                    y: e.changedTouches[0].pageY - ((offset.y) * isOffset)
                };
                var flag = "tap";
                var dis = {x: touchesEnd.x - touchesStart.x, y: touchesEnd.y - touchesStart.y};
                if (dis.x > swipeDis && Math.abs(dis.x) > Math.abs(dis.y)) {
                    flag = "right";
                } else if (dis.x < -swipeDis && Math.abs(dis.x) > Math.abs(dis.y)) {
                    flag = "left";
                } else if (dis.y > swipeDis && Math.abs(dis.y) > Math.abs(dis.x)) {
                    flag = "down";
                } else if (dis.y < -swipeDis && Math.abs(dis.y) > Math.abs(dis.x)) {
                    flag = "up";
                }
                callback(flag,this);
            });
            this.on("touchmove", function (e) {
                e.preventDefault();
                touchesMove = {
                    x: e.changedTouches[0].pageX - ((offset.x) * isOffset),
                    y: e.changedTouches[0].pageY - ((offset.y) * isOffset)
                };
                if (typeof(moveFn) === 'function') {
                    moveDis = {
                        x: touchesMove.x - touchesStart.x,
                        y: touchesMove.y - touchesStart.y,
                        offx: offset.x,
                        offy: offset.y
                    };
                    moveFn(moveDis, this);
                }
            });
        }
    });
})(jQuery);