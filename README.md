## J_addMusic(src,type1,type2)

J_addMusic是一个自动插入音乐的方法，在微信浏览器上经常使用~~

> @param {string} src 音频路径<br>
> @param {string} type1 默认音乐按钮（开）<br>
> @param {string} type2 音乐按钮（关）<br>
> @param {boolean} isRotate 是否旋转<br>
> @param {number} top 距离右方的距离（px）<br>
> @param {number} right 距离上方的距离（px）<br>
> @param {number} autoPlay 是否默认播放（默认true）

* 示例
```javascript
J_addMusic("sound.mp3","images/ms1.png","images/ms2.png",{isRotate:true,top:"20px",right:"40px"});
```

```javascript
"sound.mp3"//音频文件
"images/ms1.png"//播放时图标
"images/ms2.png"//暂停时图标
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

> @param {string} vid 腾讯视频上对应的vid<br>
> @param {number} width 视频对应的宽度<br>
> @param {number} height 视频对应的高度<br>
> @param {boolean} autoplay 是否自动播放<br>
> @param {string} img 缩略图路径<br>
> @param {string} divId 显示视频的dom

* 示例
```javascript
addTenVideo("e25oibtpsl4yanz",640,360,true,"images/cover.png","videoBox");
```

## showCountDown(year, month, day, interval, divname)

showCountDown是用于页面添加倒计时功能时使用

> @param {number} year 倒计时设计年<br>
> @param {number} month 倒计时设计月<br>
> @param {number} day 倒计时设计日<br>
> @param {number} interval 刷新频率<br>
> @param {string} divname 显示的dom

* 示例
```javascript
showCountDown(2018, 12, 31, 1000, "countDown");
```

## J_getReData.method(servUrl, mData, success)

J_getReData.method主要用于ajax请求数据时用

> @param {string} servUrl 请求路径<br>
> @param {object} mData post数据对象<br>
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
`需要引入J-base-ex.js`

picker：[https://github.com/ustbhuangyi/picker](https://github.com/ustbhuangyi/picker)

> @param {string} domP 省份dom<br>
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

> @param {number} type loading类型<br>
> @param {number} color loading颜色<br>
> @param {number} background 背景颜色
* 示例
```javascript
J_addLoading(1，{color:"red",background:"black"});
```
| type   | example  | 
| :----: | :----:   | 
|1| ![loading](https://github.com/JinnHo/wx-tools/blob/master/images/1.gif)   | 
|2| ![loading](https://github.com/JinnHo/wx-tools/blob/master/images/2.gif)   | 
|3| ![loading](https://github.com/JinnHo/wx-tools/blob/master/images/3.gif)   | 
|4| ![loading](https://github.com/JinnHo/wx-tools/blob/master/images/4.gif)   | 
|5| ![loading](https://github.com/JinnHo/wx-tools/blob/master/images/5.gif)   | 
|6| ![loading](https://github.com/JinnHo/wx-tools/blob/master/images/6.gif)   | 

## gd_GetLocalAddress(callback)
使用高德地图api获取详细位置
`需要引入J-base-ex.js`

> @param {function} callback 回调函数返回详细数据

* 示例
```javascript
gd_GetLocalAddress(function(data){
    console.log(data);
});
```
