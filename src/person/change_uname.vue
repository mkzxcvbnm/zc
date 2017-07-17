<template>
    <div class="change_uname upper_lower_spacing">
        <!-- <header-view :title="'手机绑定'"></header-view> -->
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="uname" placeholder="请输入您的姓名">
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a class="weui-btn" :class="[btn_class?'weui-btn_primary':'weui-btn_disabled']" href="javascript:" id="showTooltips" @click="change">确认修改</a>
        </div>
        <footer-view></footer-view>
    </div>
</template>

<script>
    export default {
        name: 'change_uname',
        data(){
            return {
                uname: '',//姓名
            }
        },
        computed: Vuex.mapState({
            ...Vuex.mapState([
                'userinfo'
            ]),
            btn_class(){
                if (this.uname != '') {
                    return true
                }else{
                    return false
                }
            }
        }),
        created(){
            document.title = '修改姓名';
            this.$set(this,'uname',this.userinfo.uname)
        },
        methods: {
            ...Vuex.mapMutations([
                'ISBACK'
            ]),
            ...Vuex.mapActions([
                'mask',
                'toast',
                'loadingToast',
                'dialog'
            ]),
            change(){
                if (!this.uname) {
                    this.dialog([true, '请输入姓名']);
                    return;
                }
                //提交修改
                mk.http('/name/Userinfo/',{
                    uname: this.uname
                },(response) => {
                    if (response.data) {
                        this.toast([true, 3000, response.data.mess, () => {
                            mk.get(this, 'Userinfo');//重新获取用户信息
                            this.ISBACK(true)
                            if (this.$route.params.type) {
                                //活动页点击按钮过来的 验证成功之后回到之前的页面
                                this.$router.go(-1)
                            }else{
                                this.$router.replace({ path: '/person'})
                            }
                        }])
                    }else{
                        this.dialog([true, '请输入正确的姓名']);
                    }
                },
                (response) => {
                    this.dialog([true, response])
                })
            }
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    //@import '../css/mk.scss';
</style>