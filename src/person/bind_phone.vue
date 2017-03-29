<template>
    <div class="bind_phone upper_lower_spacing">
        <header-view :title="'手机绑定'"></header-view>
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
            <a class="weui-btn weui-btn_primary" href="javascript:" id="showTooltips" @click="bind">提交</a>
        </div>
        <footer-view></footer-view>
    </div>
</template>

<script>
    export default {
        name: 'bind_phone',
        props: [],
        data(){
            return {
                tel: '',//电话号码
                vcode_time: '',//获取验证码倒计时
                vcode: '',//用户输入的验证码
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
                'ISBACK'
            ]),
            ...vuex.mapActions([
                'mask',
                'toast',
                'loadingToast',
                'dialog'
            ]),
            vfc_tel(){
                return this.tel.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
            },
            getvcode(){
                if (!this.vfc_tel()) {
                    this.dialog([true,'您输入的号码有误，请重新输入']);
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
                mk.http('http://qingshang.fankeweb.cn/index.php/api/index/name/Sms/',{
                    tel: this.tel
                },(response) => {
                    console.log(response)
                })
            },
            bind(){
                if (this.vcode_time == '') {
                    this.toast([false, , '请点击获取验证码']);
                    return;
                }
                if (!this.vcode) {
                    this.toast([false, , '请输入验证码']);
                    return;
                }
                this.loadingToast([true])
                //发送手机号获取验证码
                mk.http('http://qingshang.fankeweb.cn/index.php/api/index/name/Sms/',{
                    tel: this.tel,
                    vcode: this.vcode,
                },(response) => {
                    this.loadingToast([false])
                    if (response.data.status === 0) {
                        this.toast([true, 3000, response.data.mess, () => {
                            this.ISBACK(true)
                            this.$router.replace({ path: '/person'})
                        }])
                    }else{
                        this.toast([false, , response.data.mess])
                    }
                },
                (response) => {
                    this.loadingToast([false])
                    this.toast([false, , response])
                })
            }
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
    .tel,.vcode {
        width: .26rem;
        height: .41rem;
        display: block;
        margin-right: .3rem;
    }
    .weui-vcode-btn {
    }
</style>