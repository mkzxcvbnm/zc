webpackJsonp([5],{160:function(t,n,e){e(290);var r=e(196)(e(390),e(367),"data-v-bff1357c",null);t.exports=r.exports},188:function(t,n){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},189:function(t,n,e){t.exports=!e(191)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},190:function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},191:function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},192:function(t,n){var e=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=e)},193:function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},194:function(t,n){var e=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:e)(t)}},195:function(t,n,e){var r=e(197),i=e(193);t.exports=function(t){return r(i(t))}},196:function(t,n){t.exports=function(t,n,e,r){var i,o=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(i=t,o=t.default);var c="function"==typeof o?o.options:o;if(n&&(c.render=n.render,c.staticRenderFns=n.staticRenderFns),e&&(c._scopeId=e),r){var s=Object.create(c.computed||null);Object.keys(r).forEach(function(t){var n=r[t];s[t]=function(){return n}}),c.computed=s}return{esModule:i,exports:o,options:c}}},197:function(t,n,e){var r=e(203);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},198:function(t,n,e){var r=e(201),i=e(206);t.exports=e(189)?function(t,n,e){return r.f(t,n,i(1,e))}:function(t,n,e){return t[n]=e,t}},199:function(t,n,e){var r=e(190);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},200:function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},201:function(t,n,e){var r=e(199),i=e(216),o=e(220),a=Object.defineProperty;n.f=e(189)?Object.defineProperty:function(t,n,e){if(r(t),n=o(n,!0),r(e),i)try{return a(t,n,e)}catch(t){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},202:function(t,n,e){var r=e(207)("keys"),i=e(208);t.exports=function(t){return r[t]||(r[t]=i(t))}},203:function(t,n){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},204:function(t,n,e){var r=e(190),i=e(188).document,o=r(i)&&r(i.createElement);t.exports=function(t){return o?i.createElement(t):{}}},205:function(t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},206:function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},207:function(t,n,e){var r=e(188),i="__core-js_shared__",o=r[i]||(r[i]={});t.exports=function(t){return o[t]||(o[t]={})}},208:function(t,n){var e=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+r).toString(36))}},209:function(t,n,e){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}n.__esModule=!0;var i=e(226),o=r(i);n.default=o.default||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t}},210:function(t,n,e){var r=e(188),i=e(192),o=e(215),a=e(198),c="prototype",s=function(t,n,e){var u,f,l,d=t&s.F,p=t&s.G,v=t&s.S,_=t&s.P,m=t&s.B,b=t&s.W,h=p?i:i[n]||(i[n]={}),w=h[c],y=p?r:v?r[n]:(r[n]||{})[c];p&&(e=n);for(u in e)(f=!d&&y&&void 0!==y[u])&&u in h||(l=f?y[u]:e[u],h[u]=p&&"function"!=typeof y[u]?e[u]:m&&f?o(l,r):b&&y[u]==l?function(t){var n=function(n,e,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(n);case 2:return new t(n,e)}return new t(n,e,r)}return t.apply(this,arguments)};return n[c]=t[c],n}(l):_&&"function"==typeof l?o(Function.call,l):l,_&&((h.virtual||(h.virtual={}))[u]=l,t&s.R&&w&&!w[u]&&a(w,u,l)))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s},211:function(t,n,e){var r=e(217),i=e(205);t.exports=Object.keys||function(t){return r(t,i)}},212:function(t,n,e){var r=e(193);t.exports=function(t){return Object(r(t))}},213:function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},214:function(t,n,e){var r=e(195),i=e(219),o=e(218);t.exports=function(t){return function(n,e,a){var c,s=r(n),u=i(s.length),f=o(a,u);if(t&&e!=e){for(;u>f;)if((c=s[f++])!=c)return!0}else for(;u>f;f++)if((t||f in s)&&s[f]===e)return t||f||0;return!t&&-1}}},215:function(t,n,e){var r=e(213);t.exports=function(t,n,e){if(r(t),void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,r){return t.call(n,e,r)};case 3:return function(e,r,i){return t.call(n,e,r,i)}}return function(){return t.apply(n,arguments)}}},216:function(t,n,e){t.exports=!e(189)&&!e(191)(function(){return 7!=Object.defineProperty(e(204)("div"),"a",{get:function(){return 7}}).a})},217:function(t,n,e){var r=e(200),i=e(195),o=e(214)(!1),a=e(202)("IE_PROTO");t.exports=function(t,n){var e,c=i(t),s=0,u=[];for(e in c)e!=a&&r(c,e)&&u.push(e);for(;n.length>s;)r(c,e=n[s++])&&(~o(u,e)||u.push(e));return u}},218:function(t,n,e){var r=e(194),i=Math.max,o=Math.min;t.exports=function(t,n){return t=r(t),t<0?i(t+n,0):o(t,n)}},219:function(t,n,e){var r=e(194),i=Math.min;t.exports=function(t){return t>0?i(r(t),9007199254740991):0}},220:function(t,n,e){var r=e(190);t.exports=function(t,n){if(!r(t))return t;var e,i;if(n&&"function"==typeof(e=t.toString)&&!r(i=e.call(t)))return i;if("function"==typeof(e=t.valueOf)&&!r(i=e.call(t)))return i;if(!n&&"function"==typeof(e=t.toString)&&!r(i=e.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},221:function(t,n,e){e(225),t.exports=e(192).Object.assign},222:function(t,n,e){"use strict";var r=e(211),i=e(223),o=e(224),a=e(212),c=e(197),s=Object.assign;t.exports=!s||e(191)(function(){var t={},n={},e=Symbol(),r="abcdefghijklmnopqrst";return t[e]=7,r.split("").forEach(function(t){n[t]=t}),7!=s({},t)[e]||Object.keys(s({},n)).join("")!=r})?function(t,n){for(var e=a(t),s=arguments.length,u=1,f=i.f,l=o.f;s>u;)for(var d,p=c(arguments[u++]),v=f?r(p).concat(f(p)):r(p),_=v.length,m=0;_>m;)l.call(p,d=v[m++])&&(e[d]=p[d]);return e}:s},223:function(t,n){n.f=Object.getOwnPropertySymbols},224:function(t,n){n.f={}.propertyIsEnumerable},225:function(t,n,e){var r=e(210);r(r.S+r.F,"Object",{assign:e(222)})},226:function(t,n,e){t.exports={default:e(221),__esModule:!0}},249:function(t,n,e){var r=e(252);"string"==typeof r&&(r=[[t.i,r,""]]),e(131)(r,{}),r.locals&&(t.exports=r.locals)},252:function(t,n,e){n=t.exports=e(132)(void 0),n.push([t.i,".ck_box[data-v-22c4fc5a]{max-height:8rem;overflow:hidden;position:relative}.ck_btn[data-v-22c4fc5a]{position:absolute;left:0;bottom:0;width:100%;text-align:center;height:1rem;line-height:1rem;z-index:2;color:#000;background:#fff}.tab_top[data-v-22c4fc5a]{position:fixed;top:.78rem;left:0;width:100%;border-top:1px solid #ccc;z-index:999;display:none}",""])},257:function(t,n,e){e(249);var r=e(196)(e(263),e(258),"data-v-22c4fc5a",null);t.exports=r.exports},258:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"project_content"},[e("div",{ref:"tab",staticClass:"weui-tab f"},[e("div",{staticClass:"weui-navbar"},[e("div",{staticClass:"weui-navbar__item",class:{"weui-bar__item_on":1==t.currentView},on:{click:function(n){t.currentView=1}}},[t._v("\n                详情描述\n            ")]),t._v(" "),e("div",{staticClass:"weui-navbar__item",class:{"weui-bar__item_on":2==t.currentView},on:{click:function(n){t.currentView=2}}},[t._v("\n                报名相关\n            ")]),t._v(" "),e("div",{staticClass:"weui-navbar__item",class:{"weui-bar__item_on":3==t.currentView},on:{click:function(n){t.currentView=3}}},[t._v("\n                参赛标准\n            ")])])]),t._v(" "),e("div",{ref:"tab_copy",staticClass:"weui-tab tab_top f",style:{display:t.tab_top?"block":"none"}},[e("div",{staticClass:"weui-navbar"},[e("div",{staticClass:"weui-navbar__item",class:{"weui-bar__item_on":1==t.currentView},on:{click:function(n){t.currentView=1}}},[t._v("\n                详情描述\n            ")]),t._v(" "),e("div",{staticClass:"weui-navbar__item",class:{"weui-bar__item_on":2==t.currentView},on:{click:function(n){t.currentView=2}}},[t._v("\n                报名相关\n            ")]),t._v(" "),e("div",{staticClass:"weui-navbar__item",class:{"weui-bar__item_on":3==t.currentView},on:{click:function(n){t.currentView=3}}},[t._v("\n                参赛标准\n            ")])])]),t._v(" "),e("div",{staticClass:"content"},[e("transition",{attrs:{name:"fade",mode:"out-in"}},[1==t.currentView?e("div",{key:"1",staticClass:"ck_box"},[e("div",{domProps:{innerHTML:t._s(t.pro_data.content)}}),t._v(" "),e("div",{staticClass:"ck_btn",on:{click:t.more}},[t._v("查看更多")])]):t._e(),t._v(" "),2==t.currentView?e("div",{key:"2",staticClass:"ck_box"},[e("div",{domProps:{innerHTML:t._s(t.pro_data.content2)}}),t._v(" "),e("div",{staticClass:"ck_btn",on:{click:t.more}},[t._v("查看更多")])]):t._e(),t._v(" "),3==t.currentView?e("div",{key:"3",staticClass:"ck_box"},[e("div",{domProps:{innerHTML:t._s(t.pro_data.content3)}}),t._v(" "),e("div",{staticClass:"ck_btn",on:{click:t.more}},[t._v("查看更多")])]):t._e()])],1)])},staticRenderFns:[]}},263:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"project_content",props:["pid","prefs"],data:function(){return{pro_data:{},currentView:1,tab_top:!1}},computed:{dom_head:function(){return this.prefs.header.$refs.header},head_h:function(){var t=document.defaultView.getComputedStyle(this.dom_head,null);return parseInt(t.height)}},created:function(){var n=this;t.http("/name/Projectshow/",{id:this.pid},function(t){n.$set(n,"pro_data",t.data)})},methods:{more:function(t){var n=t.currentTarget;n.style.display=n.parentNode.style.maxHeight="none"}},mounted:function(){var t=this;this.$nextTick(function(){var n=t.$refs;window.addEventListener("scroll",function(){document.body.scrollTop>=n.tab.offsetTop-t.head_h?t.$set(t,"tab_top",!0):t.$set(t,"tab_top",!1)})})}}}).call(n,e(7))},290:function(t,n,e){var r=e(317);"string"==typeof r&&(r=[[t.i,r,""]]),e(131)(r,{}),r.locals&&(t.exports=r.locals)},317:function(t,n,e){n=t.exports=e(132)(void 0),n.push([t.i,".project_img[data-v-bff1357c]{position:relative}.project_img img[data-v-bff1357c]{width:100%;display:block}.project_img p[data-v-bff1357c]{position:absolute;left:0;bottom:0;z-index:2;width:100%;height:.64rem;background:rgba(0,0,0,.5);color:#fff;font-size:.28rem;padding:0 .3rem;line-height:.64rem}.project_money[data-v-bff1357c]{height:.96rem;line-height:.96rem;border-bottom:1px solid #f1f1f1;margin-left:.3rem;font-size:.36rem}",""])},367:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"project upper_spacing upper_lower"},[e("header-view",{ref:"header",attrs:{title:t.data.title}}),t._v(" "),e("div",{staticClass:"project_top f"},[e("div",{staticClass:"project_img"},[e("img",{attrs:{src:t.data.litpic}}),t._v(" "),e("p",{staticClass:"ellipsis"},[t._v(t._s(t.data.describe))])]),t._v(" "),e("div",{staticClass:"project_money"},[e("i",{staticClass:"yen"},[t._v("¥")]),t._v(t._s(t.data.money)+"\n        ")])]),t._v(" "),t.data.id?e("project-content-view",{attrs:{pid:t.data.id,prefs:t.$refs}}):t._e(),t._v(" "),e("div",{staticClass:"bbtn translate-hidden"},[1==t.data.status?e("a",{staticClass:"weui-btn weui-btn_warn",attrs:{href:"javascript:;"}},[t._v("活动未开始")]):t._e(),t._v(" "),2==t.data.status?[t.data.Partake?e("router-link",{staticClass:"weui-btn weui-btn_primary",attrs:{to:{name:"partake",params:{id:t.data.Partake}}}},[t._v("我的众筹")]):e("a",{staticClass:"weui-btn weui-btn_primary",attrs:{href:"javascript:;"},on:{click:t.sign}},[t._v("我要报名")])]:t._e(),t._v(" "),3==t.data.status?[t.data.Partake?e("router-link",{staticClass:"weui-btn weui-btn_primary",attrs:{to:{name:"partake",params:{id:t.data.Partake}}}},[t._v("报名成功")]):e("router-link",{staticClass:"weui-btn weui-btn_primary",attrs:{to:{name:"project_order",params:{id:t.data.id}}}},[t._v("立即支付")])]:t._e(),t._v(" "),4==t.data.status?e("a",{staticClass:"weui-btn weui-btn_warn",attrs:{href:"javascript:;"}},[t._v("活动结束")]):t._e()],2)],1)},staticRenderFns:[]}},390:function(t,n,e){"use strict";(function(t,r){function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(n,"__esModule",{value:!0});var o=e(209),a=i(o),c=e(257),s=i(c);n.default={name:"project",data:function(){return{data:{},currentView:1}},computed:{},components:{"project-content-view":s.default},created:function(){var n=this;t.http("/name/Projectshow/",{id:this.$route.params.id},function(t){n.$set(n,"data",t.data)})},methods:(0,a.default)({},r.mapActions(["mask","toast","loadingToast"]),{sign:function(){var n=this;this.loadingToast([!0]),t.http("/name/Partakeadd/",{id:this.$route.params.id},function(t){n.loadingToast([!1]),0===t.data[0].status?n.toast([!0,,t.data[0].mess,function(){n.$router.push({name:"partake",params:{id:t.data[0].id}})}]):n.toast([!1,,t.data[0].mess])},function(t){n.loadingToast([!1]),n.toast([!1,,t])})}})}}).call(n,e(7),e(3))}});