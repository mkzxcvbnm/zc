import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex/store'

Vue.use(VueRouter)
Vue.use(require('vue-resource'))

const router = new VueRouter({
    routes: [
        {
            path:'/',
            component:function (resolve) {
                require(['./main.vue'], resolve);
            },
            children:[
                {
                    path:'/',
                    component:function (resolve) {
                        require(['./index/main.vue'], resolve);
                    },
                },
                {
                    path:'*',
                    component: (resolve) => {
                        require(['./index/main.vue'], resolve);
                    }
                },
            ]
        }
    ],
    linkActiveClass: 'active'
});

new Vue({
    el:'#app',
    router,
    store,
}).$mount('#app');