<template>
    <div class="change_phone upper_lower_spacing">
        <header-view :title="'手机绑定'"></header-view>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <span style="vertical-align: middle">绑定手机号</span>
                </div>
                <div v-if="userinfo.tel" class="gray">{{userinfo.tel.substr(0,3)+"****"+userinfo.tel.substr(7)}}</div>
            </div>
        </div>
        <div class="weui-btn-area">
            <router-link :to="{ path: '/bind_phone'}" replace class="weui-btn weui-btn_primary">更换</router-link>
        </div>
        <footer-view></footer-view>
    </div>
</template>

<script>
    export default {
        name: 'change_phone',
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
</style>