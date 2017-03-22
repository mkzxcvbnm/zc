<template>
    <div class="contianer">
        <translateX>
            <router-view></router-view>
        </translateX>
        <tool-view></tool-view>
    </div>
</template>

<script>
    require('normalize.css/normalize.css');
    require('./css/reset.css');
    require('weui/dist/style/weui.min.css');
    import mk from './js/mk.js';

    import header from './public/header.vue';
    vue.component('header-view', header);
    import footer from './public/footer.vue';
    vue.component('footer-view', footer);
    import tool from './public/tool.vue';
    vue.component('tool-view', tool);
    
    vue.component('translateX', {//可复用过渡组件
        template: `<transition
            :name="transitionName"
            @before-leave="beforeLeave"
        >
            <slot></slot>
        </transition>`,
        computed: vuex.mapState({
            transitionName (state) {
                return state.isback?'translateX-back':'translateX'
            },
        }),
        methods: {
            ...vuex.mapMutations([
                'ISBACK'
            ]),
            beforeLeave: function () {
                this.ISBACK(false)
            },
        }
    })

    export default {
        name: 'contianer',
        data: function () {
            return {
            }
        },
        computed: vuex.mapState({
            ...vuex.mapState([
                'userinfo'
            ]),
            ...vuex.mapGetters([
            ]),
            count: state => state.count,
        }),
        methods: {
            ...vuex.mapMutations([
                'SETUSERINFO',
            ]),
            ...vuex.mapActions([
            ]),
        },
        created: function () {
            mk.rem();
            this.$http.jsonp('http://qingshang.fankeweb.cn/index.php/api/index/name/Userinfo')
            .then((response) => {
                this.SETUSERINFO(response.data[0])
                //console.log(this.userinfo)
            })
            .catch(function(response) {
                console.log(response)
            })
        },
        mounted: function () {
            this.$nextTick(function () {
            })
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    body {
        font: .24rem/1.14 "\5FAE\8F6F\96C5\9ED1", "arial";
        background: #f1f1f1;
        color: #333;
    }
    .upper_lower_spacing {
        padding: .78rem 0 1rem;
    }
    .upper_spacing {
        padding-top: .78rem;
    }
    img {
        max-width: 100%;
    }
    .cover {
        background-repeat: no-repeat;
        background-position: center;
        background-size: cever;
    }
    .contain {
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }
    .center {
        padding: 0 .3rem;
    }
    .ellipsis {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .f {
        background: #fff;
    }
    .content {
        @extend .f;
        padding: .3rem;
    }

    .translateX-enter-active, .translateX-leave-active,.translateX-back-enter-active, .translateX-back-leave-active {
        position: absolute;
        width: 100%;
        transition: all .8s;
    }
    .translateX-enter-active .translate-hidden, .translateX-leave-active .translate-hidden,.translateX-back-enter-active .translate-hidden, .translateX-back-leave-active .translate-hidden {
        display: none;
    }
    .translateX-enter, .translateX-leave-active, .translateX-back-enter, .translateX-back-leave-active {
        opacity: 0;
    }
    .translateX-enter {
        transform: translateX(7.5rem);
    }
    .translateX-leave-active {
        transform: translateX(-7.5rem);
    }
    .translateX-back-enter {
        transform: translateX(-7.5rem);
    }
    .translateX-back-leave-active {
        transform: translateX(7.5rem);
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    .yen {
        font-style: normal;
        margin-right: .1rem;
    }
    .bbtn {
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
        z-index: 999;
        padding: .25rem .4rem;
        transition: all .2s;
        background: #fff;
        .weui-btn {
            font-size: .36rem;
        }
    }
</style>