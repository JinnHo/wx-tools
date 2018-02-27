## J_addMusic

J_addMusic是一个自动插入音乐的方法，在微信浏览器上经常使用

> @param {boolean} isRotate 是否旋转
> @param {number} top 距离右方的距离（px）
> @param {number} right 距离上方的距离（px）
> @param {number} autoPlay 是否默认播放（默认true）

* 示例
```javascript
J_addMusic("images/ms1.png","images/ms2.png","sound.mp3",{isRotate:true,top:"20px",right:"40px"});
```

```javascript
"images/ms1.png"//播放时图标
"images/ms2.png"//暂停时图标
"sound.mp3"//音频文件
```

## GetQueryString(name)

GetQueryString(name)是获取链接参数的一个方法

> @param {string} name 参数名

* 示例
```javascript
GetQueryString("name");
```

## addTenVideo(vid, width, height, autoplay, img, divId)

addTenVideo()是腾讯开发的一个播放器，获取腾讯视频上对应vid的视频在移动端上播放（我比较少用）

> @param {string} vid 腾讯视频上对应的vid
> @param {number} width 视频对应的宽度
> @param {number} height 视频对应的高度
> @param {boolean} autoplay 是否自动播放
> @param {string} img 缩略图路径
> @param {string} divId 显示视频的dom

* 示例
```javascript
addTenVideo("e25oibtpsl4yanz",640,360,true,"images/cover.png","videoBox");
```

## showCountDown(year, month, day, interval, divname)

showCountDown是用于页面添加倒计时功能时使用

> @param {number} year 倒计时设计年
> @param {number} month 倒计时设计月
> @param {number} day 倒计时设计日
> @param {number} interval 刷新频率
> @param {string} divname 显示的dom

* 示例
```javascript
showCountDown(2018, 12, 31, 1000, "countDown");
```

## J_getReData.method(servUrl, mData, success)

J_getReData.method主要用于ajax请求数据时用

> @param {string} servUrl 请求路径
> @param {object} mData post数据对象
> @param {function} success 回调函数（data）

* 示例
```javascript
J_getReData.mothod(
    "test.json",
    {"name":name,"phone",phone},
    function(data){
        console.log(data)
    });
```

## J_wxConsole(text)

J_wxConsole用于方便测试移动端看不到控制台数据debug用，在页面顶部生成一个半透明条显示数据

> @param {string} text 显示数据

* 示例
```javascript
J_wxConsole("test"）;
```

## J_getBaiduData(callback)

J_getBaiduData简单调用百度定位功能，获取省份城市数据

> @param {function} callback 回调函数(prov,city)

* 示例
```javascript
J_getBaiduData(function(prov,city){
    console.log(prov+"  "+city);
})
```

## J_initPickerPAndC(domP, domC)
J_initPickerPAndC简单调用picker插件生成省市

picker：[https://github.com/ustbhuangyi/picker](https://github.com/ustbhuangyi/picker)

> @param {string} domP 省份dom
> @param {string} domC 城市dom

* 示例
```javascript
var _prov = $(".prov");
var _city = $(".city");

J_getBaiduData(function (p, c) {
    _prov.html(p);
    _city.html(c);
});

J_initPickerPAndC(_prov, _city);

$(".prov,.city").on("touchstart", function () {
    J_picker.show();
});
```

## J_addLoading(type,{color,background})
J_addLoading添加简单的loading页

> @param {number} type loading类型
> @param {number} color loading颜色
> @param {number} background 背景颜色
* 示例
```javascript
J_addLoading(1，{color:"red",background:"black"});
```

## gd_GetLocalAddress(callback)
使用高德地图api获取详细位置

> @param {function} callback 回调函数返回详细数据

* 示例
```javascript
gd_GetLocalAddress(function(data){
    console.log(data);
});
```
