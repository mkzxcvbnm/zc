webpackJsonp([8],{227:function(A,t,e){var i=e(228);"string"==typeof i&&(i=[[A.i,i,""]]);var c={};c.transform=void 0,e(9)(i,c),i.locals&&(A.exports=i.locals)},228:function(A,t,e){t=A.exports=e(8)(void 0),t.push([A.i,".tel[data-v-186f0f23],.vcode[data-v-186f0f23]{width:.26rem;height:.41rem;display:block;margin-right:.3rem}",""])},229:function(A,t,e){"use strict";(function(A,e){Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(A){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(A[i]=e[i])}return A};t.default={name:"bind_phone",data:function(){return{tel:"",vcode_time:"",vcode:""}},computed:A.mapState(i({},A.mapState(["userinfo"]),{btn_class:function(){return""!=this.tel&&""!=this.vcode}})),created:function(){document.title="手机绑定"},methods:i({},A.mapMutations(["ISBACK"]),A.mapActions(["mask","toast","loadingToast","dialog"]),{vfc_tel:function(){return this.tel.match(/^1(3|4|5|7|8)\d{9}$/)},getvcode:function(){var A=this;if(!this.vfc_tel())return void this.dialog([!0,"请输入正确手机号"]);if(this.tel==this.userinfo.tel)return void this.dialog([!0,"输入的号码与原号码相同，请输入新号码"]);this.vcode_time=60;var t=setInterval(function(){0==--A.vcode_time&&clearInterval(t)},1e3);e.http("/name/Sms/",{tel:this.tel},function(t){0!==t.data.status&&(A.dialog([!0,t.data.mess]),A.vcode_time=3)})},bind:function(){var A=this;if(this.vfc_tel())return this.vcode?void e.http("/name/Sms/",{tel:this.tel,vcode:this.vcode},function(t){0===t.data.status?A.toast([!0,3e3,t.data.mess,function(){e.get(A,"Userinfo"),A.ISBACK(!0),A.$route.params.type?A.$router.go(-1):A.$router.replace({path:"/person"})}]):A.dialog([!0,"请输入正确的验证码"])},function(t){A.dialog([!0,t])}):void this.dialog([!0,"请输入正确的验证码"])}})}}).call(t,e(2),e(3))},230:function(A,t,e){A.exports={render:function(){var A=this,t=A.$createElement,e=A._self._c||t;return e("div",{staticClass:"bind_phone upper_lower_spacing"},[e("div",{staticClass:"weui-cells"},[e("div",{staticClass:"weui-cell weui-cell_access"},[A._m(0),A._v(" "),e("div",{staticClass:"weui-cell__bd"},[e("input",{directives:[{name:"model",rawName:"v-model",value:A.tel,expression:"tel"}],staticClass:"weui-input",attrs:{type:"number",pattern:"/\\D/g",placeholder:"请输入您的手机号"},domProps:{value:A.tel},on:{input:function(t){t.target.composing||(A.tel=t.target.value)}}})])]),A._v(" "),e("div",{staticClass:"weui-cell weui-cell_vcode"},[A._m(1),A._v(" "),e("div",{staticClass:"weui-cell__bd"},[e("input",{directives:[{name:"model",rawName:"v-model",value:A.vcode,expression:"vcode"}],staticClass:"weui-input",attrs:{type:"text",placeholder:"请输入您收到的验证码"},domProps:{value:A.vcode},on:{input:function(t){t.target.composing||(A.vcode=t.target.value)}}})]),A._v(" "),e("div",{staticClass:"weui-cell__ft"},[A.vcode_time?e("span",{staticClass:"weui-vcode-btn"},[A._v("重新发送 "+A._s(A.vcode_time)+"s")]):e("button",{staticClass:"weui-vcode-btn",on:{click:A.getvcode}},[A._v("获取验证码")])])])]),A._v(" "),e("div",{staticClass:"weui-btn-area"},[e("a",{staticClass:"weui-btn",class:[A.btn_class?"weui-btn_primary":"weui-btn_disabled"],attrs:{href:"javascript:",id:"showTooltips"},on:{click:A.bind}},[A._v("提交")])]),A._v(" "),e("footer-view")],1)},staticRenderFns:[function(){var A=this,t=A.$createElement,i=A._self._c||t;return i("div",{staticClass:"weui-cell__hd"},[i("img",{staticClass:"tel",attrs:{src:e(231)}})])},function(){var A=this,t=A.$createElement,i=A._self._c||t;return i("div",{staticClass:"weui-cell__hd"},[i("img",{staticClass:"vcode",attrs:{src:e(232)}})])}]}},231:function(A,t){A.exports="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxQTUwMDgwQzEyQkExMUU3QkQ4MkFGNkM2ODAzRDYwOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxQTUwMDgwRDEyQkExMUU3QkQ4MkFGNkM2ODAzRDYwOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFBNTAwODBBMTJCQTExRTdCRDgyQUY2QzY4MDNENjA5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFBNTAwODBCMTJCQTExRTdCRDgyQUY2QzY4MDNENjA5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAKQAaAwERAAIRAQMRAf/EAHQAAQADAQEAAAAAAAAAAAAAAAcEBQYBAwEBAAAAAAAAAAAAAAAAAAAAABAAAAQEAQULDQAAAAAAAAAAAQIDBAARBQYhMVESUhRBcbEiMhMzNVV1FmHRQqJzk7PTVBXVNgcRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AGK0rSpNdpRqlUjLHdKLHA5wUlOUs4DngPR5ZNPRcnSQozpyiUeIuV2gQDYapsQgJ7v+dW2kwXXICwKJpGOACoAyEpRHGQQBx95qv1SvRbPyh6LU3oDW260bvKNQ2zkgKoK1BcFExyDJIR3IDZ+CrV7OS9bzwEF3azJg6O8p6KbdArJyRchRHSMYxQ0RABngEAQQG/tLq+3+8V/gjAJMBmbi69Q7ue8BYAdgEez+YTtpi8O0dO1GrxU6RGhQOICYmjM4CJeLIYDSeKlOxKp7gnzICteOnVSqe1BT3bRBuwdkOdymBAExyhKUjGzQBNAJdhXDRadQdmfOyN1wWUEUzzmADLyQE2o1+luKyxeN7hI3Zt57Q0DSkpjPGWAzyY5NyAnVG77ZUp7pMlQSMc6RylKE8REogAZIAc5pXUHk6eT0c+9AWN0fsNQ9ufhgKuA6GWATvwcB/9k="},232:function(A,t){A.exports="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyRDJDNUVEMTEyQkExMUU3ODRFMTg4NkRBNDZBMjZCQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyRDJDNUVEMjEyQkExMUU3ODRFMTg4NkRBNDZBMjZCQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjJEMkM1RUNGMTJCQTExRTc4NEUxODg2REE0NkEyNkJBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJEMkM1RUQwMTJCQTExRTc4NEUxODg2REE0NkEyNkJBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAKgAbAwERAAIRAQMRAf/EAHcAAAMBAQEBAAAAAAAAAAAAAAUGBwEDBAgBAQAAAAAAAAAAAAAAAAAAAAAQAAECAwQGBQgLAAAAAAAAAAECAwAEBRESEwYhMUFRMxRxIjJCNPCRUmIVNRYHgaGS0mODk0RUVRcRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APofNdcnpVcrS6UkKqtQJS0o6Q2ga1ny3wHjR8uZF9Idqc9NTc6rSt+/YAfVBCj5zAZJtV7LtXlZJTrtTos6vCbcUCpxhZ1Xj6P1WboBvgEypT0lKfMRl+deQyy3IWIW4QAFFSt/SYA78W5Z/spf7YgBmYs8U6VpTj1KnJeYnApIQ0Te0FQvGwEHVAMHNK9EcHF+ndATjLslUswPzlTMnLTLrjpCpmfK1NJFgIbbbRZaQNp2QB34Sqv8Ch/oPfegOlUykz7EF2kyb08LTMJl7zNqdPBUbTe1drRAT34hqeDh4rlvLcjf024WLiWa9dnV6ICi/LPq5dW0e21MuIcG42JMAXrFaFPnqZLXmgJ14tuYhsIRdJBTpHesEAVgIfjN3b3d5zmbfwr123zwD3MrmMpVyYncJTtBqS775QLSw8TpNm4k+VkBtbp2VMyzUtUTWG20soCHEBaElSAoqAsWUqQesdkB1r+bEzwVRcvHnJ+aBbW+3w2kHQpV/o2jQIDP88l+XwMYXPZ/KW3dONjY+L0Xtm6Aa5zwr3D7CuNw9Xf9XfARGue8leC1/suBAUzIXu1XgNnge3+d60AzwH//2Q=="},44:function(A,t,e){function i(A){e(227)}var c=e(64)(e(229),e(230),i,"data-v-186f0f23",null);A.exports=c.exports},64:function(A,t){A.exports=function(A,t,e,i,c){var a,n=A=A||{},s=typeof A.default;"object"!==s&&"function"!==s||(a=A,n=A.default);var o="function"==typeof n?n.options:n;t&&(o.render=t.render,o.staticRenderFns=t.staticRenderFns),i&&(o._scopeId=i);var l;if(c?(l=function(A){A=A||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,A||"undefined"==typeof __VUE_SSR_CONTEXT__||(A=__VUE_SSR_CONTEXT__),e&&e.call(this,A),A&&A._registeredComponents&&A._registeredComponents.add(c)},o._ssrRegister=l):e&&(l=e),l){var r=o.functional,d=r?o.render:o.beforeCreate;r?o.render=function(A,t){return l.call(t),d(A,t)}:o.beforeCreate=d?[].concat(d,l):[l]}return{esModule:a,exports:n,options:o}}}});