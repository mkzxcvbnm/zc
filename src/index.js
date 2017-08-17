import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex/store'

Vue.use(VueRouter)
Vue.use(require('vue-resource'))

const resource = require('vue-resource')
//vue-resource拦截器
resource.Http.interceptors.push((request, next) => {
    //在所有请求发送之前
    if (_.endsWith(request.url, 'Userinfo')) {
        store.dispatch('loadingToast', [true])
    }
    next((response) => {
        //在所有请求响应之后触发 无论是否成功
        store.dispatch('loadingToast', [false])
    });
});
const router = new VueRouter({
    routes: [
        {
            path:'/',
            component: resolve => {
                require(['./main.vue'], resolve);
            },
            children:[
                {
                    name: 'localhost',
                    path:'/',
                    component: resolve => {
                        require(['./index/main.vue'], resolve);
                    }
                },
                {
                    name: 'index',
                    path:'/index',
                    component: resolve => {
                        require(['./index/main.vue'], resolve);
                    }
                },
                {
                    name: 'project',
                    path: '/project/:id',
                    component: resolve => {
                        require(['./project/main.vue'], resolve);
                    }
                },
                {
                    name: 'project_order',
                    path: '/project_order/:id',
                    component: resolve => {
                        require(['./project/project_order.vue'], resolve);
                    }
                },
                {
                    name: 'project_pay',
                    path: '/project_pay/:id',
                    component: resolve => {
                        require(['./project/project_pay.vue'], resolve);
                    }
                },
                {
                    name: 'partake',
                    path: '/partake/:id',
                    component: resolve => {
                        require(['./partake/main.vue'], resolve);
                    }
                },
                {
                    name: 'partake_pay',
                    path: '/partake_pay/:id/:pid',
                    component: resolve => {
                        require(['./partake/partake_pay.vue'], resolve);
                    }
                },
                {
                    name: 'partake_my_pay',
                    path: '/partake_my_pay/:id',
                    component: resolve => {
                        require(['./partake/partake_my_pay.vue'], resolve);
                    }
                },
                {
                    name: 'follow',
                    path: '/follow',
                    component: resolve => {
                        require(['./follow/main.vue'], resolve);
                    }
                },
                {
                    name: 'news',
                    path: '/news',
                    component: resolve => {
                        require(['./news/main.vue'], resolve);
                    }
                },
                {
                    name: 'details',
                    path: '/details/:id',
                    component: resolve => {
                        require(['./news/details.vue'], resolve);
                    }
                },
                {
                    name: 'person',
                    path: '/person',
                    component: resolve => {
                        require(['./person/main.vue'], resolve);
                    }
                },
                {
                    name: 'change_phone',
                    path: '/change_phone',
                    component: resolve => {
                        require(['./person/change_phone.vue'], resolve);
                    }
                },
                {
                    name: 'bind_phone',
                    path: '/bind_phone',
                    component: resolve => {
                        require(['./person/bind_phone.vue'], resolve);
                    }
                },
                {
                    name: 'change_uname',
                    path: '/change_uname',
                    component: resolve => {
                        require(['./person/change_uname.vue'], resolve);
                    }
                },
                {
                    name: 'pay',
                    path: '/pay',
                    component: resolve => {
                        require(['./pay/main.vue'], resolve);
                    }
                },
                {
                    name: 'partake_my_list',
                    path: '/partake_my_list',
                    component: resolve => {
                        require(['./partake/partake_my_list.vue'], resolve);
                    }
                },
                {
                    name: 'clock',
                    path: '/clock',
                    component: resolve => {
                        require(['./clock/main.vue'], resolve);
                    }
                },
                {
                    name: 'intention',
                    path: '/intention',
                    component: resolve => {
                        require(['./person/intention.vue'], resolve);
                    }
                },
                {
                    name: 'payment',
                    path: '/payment/:id',
                    component: resolve => {
                        require(['./payment/main.vue'], resolve);
                    }
                },
            ]
        },{ path: '*', redirect: '/index' }
    ],
    linkActiveClass: 'active'
});

let routerBack = false;
window.addEventListener("popstate", function(e) {
    if (routerBack) {
        //点击返回 开启返回动画
        store.commit('ISBACK', !store.state.isback);
    }
    routerBack = true;
}, false);

//let routerQueue = [];//路由队列
router.beforeEach((to, from, next) => {
    //scroll(0,0)
    Velocity(document.body, 'scroll', {
        duration: "fast",
        easing: "easeOutExpo",
        mobileHA: false,
        complete(el) {
            if (document.body.scrollTop == 0) {
                scroll(0,1)
                scroll(0,0)
            }
        }
    });
    mk.hideMenuItems();
    // if (routerQueue[routerQueue.length - 1] == to.path + '=>' + from.path) {
    //     store.commit('ISBACK', !store.state.isback);
    //     routerQueue.pop();
    // }else{
    //     routerQueue.push(from.path + '=>' + to.path);
    // }
    routerBack = false;
    next();
});

new Vue({
    el:'#app',
    router,
    store,
}).$mount('#app');