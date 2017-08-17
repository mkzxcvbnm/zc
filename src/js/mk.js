window.path = 'http://api.qstubu.com';
import store from '../vuex/store'
const resource = require('vue-resource')
module.exports = {
    rem(size = 750){
        let html = document.getElementsByTagName('html')[0];
        let setSize = () => {
            let _w = document.documentElement.clientWidth;
            _w = _w > size ? size: _w;
            html.style.fontSize = _w/size * 100 + 'px';
        };
        setSize();
        window.onresize = setSize;
        return this;
    },
    wx(){
        this.http('/name/Wxsdk',{
            url: window.location.href.replace(window.location.protocol + '//', '')
        },(response) => {
            wx.config({
                //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: response.data.appId, // 必填，公众号的唯一标识
                timestamp: response.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
                signature: response.data.signature,// 必填，签名，见附录1
                jsApiList: [
                    'hideMenuItems',
                    'showMenuItems',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.error(function(res){
                wx.iserror = true
            });
        });
        return this;
    },
    hideMenuItems(){
        wx.ready(() => {
            if (!wx.iserror) {
                wx.hideMenuItems({
                    menuList: [
                        'menuItem:share:appMessage',
                        'menuItem:share:timeline',
                        'menuItem:share:qq',
                        'menuItem:share:weiboApp',
                        'menuItem:favorite',
                        'menuItem:share:facebook',
                        'menuItem:share:QZone',
                        'menuItem:openWithSafari',
                        'menuItem:share:email'
                    ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                });
            }
        });
    },
    showMenuItems(config = {}){
        wx.ready(() => {
            config.link = path + '/?url=' + encodeURIComponent(window.location.href);
            wx.onMenuShareAppMessage({
                title: config.title,
                desc: config.desc,
                link: config.link,
                imgUrl: config.imgUrl
            });
            wx.onMenuShareTimeline({
                title: config.title,
                link: config.link,
                imgUrl: config.imgUrl
            });
            if (!wx.iserror) {
                wx.showMenuItems({
                    menuList: [
                        'menuItem:share:appMessage',
                        'menuItem:share:timeline',
                    ], // 要显示的菜单项，所有menu项见附录3
                    fail: (res) => {
                        if (!wx.iserror) {
                            location.reload()
                        }
                    },
                });
            }
        });
    },
    http(url, params={}, success=()=>{}, error=()=>{}){
        //store.commit('MASK', true);
        resource.Http.jsonp(path + '/index.php/api/index' + url,{
            params: params
        })
        .then((response) => {
            //store.commit('MASK', false);
            success(response)
        })
        .catch((response) => {
            //store.commit('MASK', false);
            error(response)
            console.log(response)
        });
        return this;
    },
    get(t, type){
        this.http('/name/' + type,{
        },(response) => {
            switch (type) {
                case 'Userinfo':
                    t.$store.commit('SETUSERINFO', response.data)
                    break;
            }
        })
        return this;
    },
    callpay(v, jsApiCall){
        if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
            }
        }else{
            jsApiCall(v);
        }
        return this;
    },
    //获取缓存中的数据
    getDbJson(key){
        return JSON.parse(localStorage.getItem(key));
    },
    //写入缓存数据
    setDbJson(key, val){
        //记录数据存储的时间
        //val.datatime = Math.round(new Date().getTime()/1000);
        localStorage.setItem(key, JSON.stringify(val));
    },
    //测试随机数
    random(){
        if (Math.random()<.5) {
            return 0;
        }else{
            return 1;
        }
    }
}