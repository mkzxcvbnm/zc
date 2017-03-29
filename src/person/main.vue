<template>
    <div class="person upper_lower_spacing">
        <header-view :title="'个人中心'"></header-view>
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <p>头像</p>
                </div>
                <div class="weui-cell__hd">
                    <img class="tx" :src="userinfo.portrait"/>
                </div>
            </div>
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <span style="vertical-align: middle">用户昵称</span>
                </div>
                <div class="weui-cell__ft">{{userinfo.nickname}}</div>
            </div>
            <router-link :to="{ path: '/change_phone'}" class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <span style="vertical-align: middle">绑定手机号</span>
                </div>
                <div v-if="userinfo.tel" class="weui-cell__ft">{{userinfo.tel.substr(0,3)+"****"+userinfo.tel.substr(7)}}</div>
            </router-link>
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <span style="vertical-align: middle">实名认证</span>
                </div>
                <div class="weui-cell__ft"></div>
            </div>
        </div>
        <div class="weui-cells">
            <router-link :to="{ path: '/partake_my_list'}" class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <span style="vertical-align: middle">我的众筹</span>
                </div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link :to="{ path: '/pay'}" class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <span style="vertical-align: middle">我的订单</span>
                </div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link :to="{ path: '/news'}" class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <span style="vertical-align: middle">系统消息</span>
                    <span class="weui-badge" style="margin-left: 5px;">8</span>
                </div>
                <div class="weui-cell__ft"></div>
            </router-link>
        </div>
        <footer-view></footer-view>
    </div>
</template>

<script>
    export default {
        name: 'person',
        props: [],
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
        }),
        components: {
        },
        watch: {
        },
        methods: {
            ...vuex.mapMutations([
            ]),
            ...vuex.mapActions([
            ]),
        },
        beforeCreate(){
        },
        created(){
        },
        beforeMount(){
        },
        mounted(){
            this.$nextTick(() => {
            });
        },
        beforeUpdate(){
        },
        updated(){
        },
        beforeDestroy(){
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    //@import '../css/mk.scss';
    .weui-cell_access .weui-cell__ft {
        padding-right: .45rem;
        &:after {
            border-color: #999;
        }
    }
    .weui-cell {
        padding: 12px 15px 10px;
    }
    .tx {
        width: .48rem;
        height: .48rem;
        display: block;
    }
</style>