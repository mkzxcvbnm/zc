import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex/store'

Vue.use(VueRouter)
Vue.use(require('vue-resource'))

const router = new VueRouter({
    routes: [
        {
            path:'/',
            component: resolve => {
                require(['./main.vue'], resolve);
            },
            children:[
                {
                    name: 'index',
                    path:'/',
                    component: resolve => {
                        require(['./index/main.vue'], resolve);
                    },
                },
                {
                    name: 'detail',
                    path: '/detail/:id',
                    component: resolve => {
                        require(['./detail/main.vue'], resolve);
                    },
                },
            ]
        },{ path: '*', redirect: '/' }
    ],
    linkActiveClass: 'active'
});

new Vue({
    el:'#app',
    router,
    store,
}).$mount('#app');