webpackJsonp([22],{53:function(n,t,e){"use strict";(function(n,t){function a(n){return n&&n.__esModule?n:{default:n}}var o=e(0),c=a(o),p=e(4),i=a(p),h=e(5),l=a(h);c.default.use(i.default),c.default.use(e(3)),c.default.http.interceptors.push(function(t,e){n.endsWith(t.url,"Userinfo")&&l.default.dispatch("loadingToast",[!0]),e(function(n){l.default.dispatch("loadingToast",[!1])})});var u=new i.default({routes:[{path:"/",component:function(n){e.e(1).then(function(){var t=[e(36)];n.apply(null,t)}.bind(this)).catch(e.oe)},children:[{name:"localhost",path:"/",component:function(n){e.e(0).then(function(){var t=[e(8)];n.apply(null,t)}.bind(this)).catch(e.oe)}},{name:"index",path:"/index",component:function(n){e.e(0).then(function(){var t=[e(8)];n.apply(null,t)}.bind(this)).catch(e.oe)}},{name:"project",path:"/project/:id",component:function(n){e.e(7).then(function(){var t=[e(48)];n.apply(null,t)}.bind(this)).catch(e.oe)}},{name:"project_order",path:"/project_order/:id",component:function(n){e.e(13).then(function(){var t=[e(49)];n.apply(null,t)}.bind(this)).catch(e.oe)}},{name:"project_pay",path:"/project_pay/:id",component:function(n){e.e(4).then(function(){var t=[e(50)];n.apply(null,t)}.bind(this)).catch(e.oe)}},{name:"partake",path:"/partake/:id",component:function(n){e.e(3).then(function(){var t=[e(39)];n.apply(null,t)}.bind(this)).catch(e.oe)}},{name:"partake_pay",path:"/partake_pay/:id",component:function(n){e.e(8).then(function(){var t=[e(42)];n.apply(null,t)}.bind(this)).catch(e.oe)}},{name:"partake_my_pay",path:"/partake_my_pay/:id",component:function(n){e.e(11).then(function(){var t=[e(41)];n.apply(null,t)}.bind(this)).catch(e.oe)}},{name:"follow",path:"/follow",component:function(n){e.e(15).then(function(){var t=[e(35)];n.apply(null,t)}.bind(this)).catch(e.oe)}},{name:"news",path:"/news",component:function(n){e.e(6).then(function(){var t=[e(38)];n.apply(null,t)}.bind(this)).catch(e.oe)}},{name:"details",path:"/details/:id",component:function(n){e.e(17).then(function(){var t=[e(37)];n.apply(null,t)}.bind(this)).catch(e.oe)}},{name:"person",path:"/person",component:function(n){e.e(14).then(function(){var t=[e(47)];n.apply(null,t)}.bind(this)).catch(e.oe)}},{name:"change_phone",path:"/change_phone",component:function(n){e.e(16).then(function(){var t=[e(45)];n.apply(null,t)}.bind(this)).catch(e.oe)}},{name:"bind_phone",path:"/bind_phone",component:function(n){e.e(9).then(function(){var t=[e(44)];n.apply(null,t)}.bind(this)).catch(e.oe)}},{name:"change_uname",path:"/change_uname",component:function(n){e.e(12).then(function(){var t=[e(46)];n.apply(null,t)}.bind(this)).catch(e.oe)}},{name:"pay",path:"/pay",component:function(n){e.e(10).then(function(){var t=[e(43)];n.apply(null,t)}.bind(this)).catch(e.oe)}},{name:"partake_my_list",path:"/partake_my_list",component:function(n){e.e(5).then(function(){var t=[e(40)];n.apply(null,t)}.bind(this)).catch(e.oe)}},{name:"clock",path:"/clock",component:function(n){e.e(2).then(function(){var t=[e(34)];n.apply(null,t)}.bind(this)).catch(e.oe)}}]},{path:"*",redirect:"/index"}],linkActiveClass:"active"}),f=!1;window.addEventListener("popstate",function(n){f&&l.default.commit("ISBACK",!l.default.state.isback),f=!0},!1),u.beforeEach(function(n,e,a){scroll(0,0),t.hideMenuItems(),f=!1,a()}),new c.default({el:"#app",router:u,store:l.default}).$mount("#app")}).call(t,e(1),e(7))}},[53]);