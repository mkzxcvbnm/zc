<template>
    <div class="bind_phone upper_lower_spacing">
        <!-- <header-view :title="'手机绑定'"></header-view> -->
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__hd">
                    <img class="tel" src="../img/tel.jpg">
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" pattern="/\D/g" v-model="tel" placeholder="请输入您的手机号">
                </div>
            </div>
            <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__hd">
                    <img class="vcode" src="../img/vcode.jpg">
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="vcode" placeholder="请输入您收到的验证码">
                </div>
                <div class="weui-cell__ft">
                    <span class="weui-vcode-btn" v-if="vcode_time">重新发送 {{vcode_time}}s</span>
                    <button v-else class="weui-vcode-btn" @click="getvcode">获取验证码</button>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a class="weui-btn" :class="[btn_class?'weui-btn_primary':'weui-btn_disabled']" href="javascript:" id="showTooltips" @click="bind">提交</a>
        </div>
        <footer-view></footer-view>
    </div>
</template>

<script>
    export default {
        name: 'bind_phone',
        data(){
            return {
                tel: '',//电话号码
                vcode_time: '',//获取验证码倒计时
                vcode: '',//用户输入的验证码
            }
        },
        computed: Vuex.mapState({
            ...Vuex.mapState([
                'userinfo'
            ]),
            btn_class(){
                if (this.tel != '' && this.vcode != '') {
                    return true
                }else{
                    return false
                }
            }
        }),
        created(){
            document.title = '手机绑定';
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
            vfc_tel(){
                return this.tel.match(/^1(3|4|5|7|8)\d{9}$/);
            },
            getvcode(){
                if (!this.vfc_tel()) {
                    this.dialog([true, '请输入正确手机号']);
                    return;
                }
                if (this.tel == this.userinfo.tel) {
                    this.dialog([true, '输入的号码与原号码相同，请输入新号码']);
                    return;
                }
                this.vcode_time = 60;
                let timer = setInterval(() => {
                    this.vcode_time--;
                    if (this.vcode_time == 0) {
                        clearInterval(timer)
                    }
                }, 1000)
                //发送手机号获取验证码
                mk.http('/name/Sms/',{
                    tel: this.tel
                },(response) => {
                    if (response.data.status !== 0) {
                        this.dialog([true, response.data.mess]);
                        this.vcode_time = 3
                    }
                })
            },
            bind(){
                if (!this.vfc_tel()) {
                    return;
                }
                if (!this.vcode) {
                    this.dialog([true, '请输入正确的验证码']);
                    return;
                }
                //提交验证码
                mk.http('/name/Sms/',{
                    tel: this.tel,
                    vcode: this.vcode,
                },(response) => {
                    if (response.data.status === 0) {
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
                        this.dialog([true, '请输入正确的验证码']);
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
    .tel,.vcode {
        width: .26rem;
        height: .41rem;
        display: block;
        margin-right: .3rem;
    }
    .weui-vcode-btn {
    }
</style>