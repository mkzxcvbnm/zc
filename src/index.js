import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex/store'

Vue.use(VueRouter)
Vue.use(require('vue-resource'))
Vue.use(mk)
mk.$http = Vue.http

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
                    path: '/partake_pay/:id',
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
            ]
        },{ path: '*', redirect: '/index' }
    ],
    linkActiveClass: 'active'
});

// router.beforeEach((to, from, next) => {
//     next()
// });

new Vue({
    el:'#app',
    router,
    store,
}).$mount('#app');