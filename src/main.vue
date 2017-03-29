<template>
    <div class="contianer">
        <mktransition>
            <router-view></router-view>
        </mktransition>
        <tool-view></tool-view>
    </div>
</template>

<script>
    require('normalize.css/normalize.css');
    require('./css/reset.css');

    import header from './public/header.vue';
    vue.component('header-view', header);
    import footer from './public/footer.vue';
    vue.component('footer-view', footer);
    import tool from './public/tool.vue';
    vue.component('tool-view', tool);

    //可复用过渡组件(通用)
    vue.component('mktransition', {
        template: `<transition
            :name="transitionName"
            @before-leave="beforeLeave"
        >
            <slot></slot>
        </transition>`,
        computed: vuex.mapState({
            ...vuex.mapState([
                'transitionName'
            ]),
            transitionName (state) {
                return state.isback?state.transitionName+'-back':state.transitionName
            },
        }),
        methods: {
            ...vuex.mapMutations([
                'ISBACK',
                'SETTRANSITIONNAME'
            ]),
            beforeLeave: function () {
                this.ISBACK(false)
                this.SETTRANSITIONNAME('translateX')
            },
        }
    })
    //可复用过渡组件(左右)
    vue.component('translateX', {
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
    //可复用过渡组件(上下)
    vue.component('translateY', {
        template: `<transition
            :name="transitionName"
            @before-leave="beforeLeave"
        >
            <slot></slot>
        </transition>`,
        computed: vuex.mapState({
            transitionName (state) {
                return state.isback?'translateY-back':'translateY'
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
    //可复用过渡组件(列表)
    vue.component('list-slide', {
        template: `<transition-group
            name="staggered-fade"
            tag="ul"
            v-bind:css="false"
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:leave="leave"
        >
            <slot></slot>
        </transition-group>`,
        data(){
            return {
                show: true,
                fadeInDuration: 1000,
                fadeOutDuration: 1000,
                maxFadeDuration: 1500,
                stop: false
            }
        },
        methods: {
            beforeEnter: function (el) {
                el.style.display = 'none'
            },
            enter: function (el, done) {
                setTimeout(function () {
                    Velocity(el, "slideDown")
                }, el.dataset.index * 50)
            },
            leave: function (el, done) {
                setTimeout(function () {
                    Velocity(el, "slideUp")
                }, el.dataset.index * 50)
            }
        }
    })

    vue.prototype.$mk = mk;

    export default {
        name: 'contianer',
        data(){
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
                'updateActiveNote'
            ]),
        },
        created(){
            mk.rem();
            mk.http('/name/Userinfo',{
            },(response) => {
                this.SETUSERINFO(response.data[0])
                //console.log(this.userinfo)
            })
        },
        mounted(){
            this.$nextTick(() => {
            })
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import './css/mk.scss';
    .upper_lower_spacing {
        padding: .78rem 0 1rem;
    }
    .upper_spacing {
        padding-top: .78rem;
    }
    .upper_lower {
        padding-bottom: 1.82rem;
    }
    img {
        max-width: 100%;
    }
    .green {
        color: $green;
    }
    .gray {
        color: $gray;
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
    .fl {
        float: left;
    }
    .fr {
        float: right;
    }
    .content {
        @extend .f;
        padding: .3rem;
    }

    .translateX-enter-active, .translateX-leave-active,.translateX-back-enter-active, .translateX-back-leave-active {
        position: absolute;
        width: 100%;
        transition: all .6s,opacity 1s;
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

    .translateY-enter-active, .translateY-leave-active,.translateY-back-enter-active, .translateY-back-leave-active {
        position: absolute;
        width: 100%;
        transition: all .6s,opacity 1s;
    }
    .translateY-enter, .translateY-leave-active, .translateY-back-enter, .translateY-back-leave-active {
        opacity: 0;
    }
    .translateY-enter {
        transform: translateY(100%);
    }
    .translateY-leave-active {
        transform: translateY(-100%);
    }
    .translateY-back-enter {
        transform: translateY(-100%);
    }
    .translateY-back-leave-active {
        transform: translateY(100%);
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
        transition: all .3s;
        background: #fff;
        opacity: 1;
        visibility: visible;
        .weui-btn {
            font-size: .36rem;
            border-radius: 0;
        }
    }
    .bbtn2 {
        @include flex(space-between);
        .weui-btn {
            width: 48%;
            margin: 0!important;
            &.weui-btn_default{
                background: #e5e5e5;
            }
            &:after {
                border: 0;
            }
        }
    }
    .line {
        border-top: 1px solid #dedede;
        clear: both;
    }
    .row_l {
        margin-left: -.3rem;
    }
    .row_r {
        margin-right: -.3rem;
    }
    #app {
        .translateX-enter .translate-hidden,
        .translateX-leave .translate-hidden,
        .translateX-back-enter .translate-hidden,
        .translateX-back-leave .translate-hidden,
        .translateY-enter .translate-hidden,
        .translateY-leave .translate-hidden,
        .translateY-back-enter .translate-hidden,
        .translateY-back-leave .translate-hidden {
            display: none;
        }
        .translateX-enter-active .translate-hidden,
        .translateX-leave-active .translate-hidden,
        .translateX-back-enter-active .translate-hidden,
        .translateX-back-leave-active .translate-hidden,
        .translateY-enter-active .translate-hidden,
        .translateY-leave-active .translate-hidden,
        .translateY-back-enter-active .translate-hidden,
        .translateY-back-leave-active .translate-hidden  {
            opacity: 0!important;
            bottom: -2rem!important;
            visibility: hidden!important;
        }
        .weui-cells,.weui-btn {
            font-size: .32rem;
        }
        .weui-btn_primary {
            background-color: $green;
            border-radius: 0;
        }
        .swiper-pagination-bullet {
            transition: all .2s;
        }
        .swiper-pagination-bullet-active {
            background: #fff;
        }
        .weui-cell_access:active {
            background-color: #fff;
        }
        .weui-vcode-btn {
            border-left: 0;
        }
        .weui-navbar {
            background: #fff;
        }
        .weui-navbar__item {
            z-index: 2;
            font-size: .32rem;
            color: #000;
            &.weui-bar__item_on {
                background: #fff;
                color: $green;
                border-bottom: 3px solid $green;
            }
        }
        .weui-navbar__item:after {
            display: none;
        }
        .weui-navbar:after {
            border-bottom: 2px solid #e5e5e5;
        }
        .weui-tab {
            height: 1rem;
        }
    }
</style>