<template>
    <div class="contianer">
        <mktransition>
            <keep-alive include = "index">
                <router-view></router-view>
            </keep-alive>
        </mktransition>
        <tool-view></tool-view>
    </div>
</template>

<script>
    require('normalize.css/normalize.css');
    require('./css/reset.css');
    require('./components/transition.js');//运动组件

    // import header from './public/header.vue';
    // Vue.component('header-view', header);
    import footer from './public/footer.vue';
    Vue.component('footer-view', footer);
    import tool from './public/tool.vue';
    Vue.component('tool-view', tool);
    import draggable from './public/draggable.vue';
    Vue.component('draggable-view', draggable);

    //Vue.prototype.$mk = mk;

    export default {
        name: 'contianer',
        computed: Vuex.mapState({
            ...Vuex.mapState([
                'userinfo'
            ]),
            count: state => state.count,
        }),
        methods: {
            ...Vuex.mapMutations([
                'SETUSERINFO',
            ]),
            ...Vuex.mapActions([
                'mask',
                'toast',
                'loadingToast',
                'updateActiveNote'
            ]),
            userinfo_error(fn){
                let get_user_num = localStorage.getItem('get_user_num') || 0;
                get_user_num ++;
                localStorage.setItem('get_user_num', get_user_num);
                if (get_user_num > 5) {
                    get_user_num = 0;
                    this.toast([false, 5000, '获取用户数据失败！请关闭页面！联系管理员！', () => {
                        fn()
                    }])
                }else{
                    fn()
                }
            }
        },
        created(){
            document.title = '中国青商联盟';
            mk.rem();
            mk.http('/name/Userinfo',{
            },(response) => {
                let url = encodeURIComponent(window.location.href);
                if (response.data == 'null') {
                    this.userinfo_error(() => {
                        window.location = path + '/?url='+url;
                    })
                }else{
                    this.SETUSERINFO(response.data);
                    mk.wx();
                    mk.setDbJson('userinfo', response.data);//缓存
                    localStorage.removeItem('get_user_num');//清空获取用户数据失败计数
                }
            },(response) => {
                this.userinfo_error(() => {
                    window.location = path + '/?url='+url;
                })
            })
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import './css/public.scss';//公共css
</style>