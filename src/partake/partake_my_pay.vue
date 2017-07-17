<template>
    <div class="partake_my_pay upper_spacing upper_lower">
        <!-- <header-view :title="$route.params.title"></header-view> -->
        <div class="weui-cells weui-cells_form">
            <div class="weui-cells__title">活动金额: {{data.xm_money}}&nbsp;&nbsp;&nbsp;&nbsp;已众筹金额: {{data.money}}</div>
            <div class="weui-cell" @click="dialog([true, '金额不可编辑'])">
                <div class="weui-cell__hd"><label for="" class="weui-label">付款金额</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="input" v-model="params.money" disabled="disabled">
                </div>
                <div class="weui-cell__ft">
                    <i class="weui-icon-warn"></i>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" href="javascript:" id="showTooltips" @click="pay">确认付款</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'partake_my_pay',
        data(){
            return {
                data: {},
                params: {//提交接口数据
                    pid: this.$route.params.id,
                    money: '',
                },
            }
        },
        computed: {
            money(){
                return (Math.round(this.data.xm_money*100) - Math.round(this.data.money*100)) / 100
            }
        },
        created(){
            document.title = this.$route.params.title || document.title;
            //获取小项目数据
            mk.http('/name/Partakeshow',{
                id: this.$route.params.id
            },(response) => {
                this.$set(this, 'data', response.data)
                document.title = response.data.title;
                this.$set(this.params,'money',this.money)
                if (this.money == 0) {
                    this.dialog([true, '众筹已成功无需支付']);
                    this.$router.go(-1)
                }
            })
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
            // onInput(v){
            //     if (v > 1e5) {
            //         this.$set(this.params,'money', 1e5);
            //     }else{
            //         this.$set(this.params,'money',(v.match(/\d+(\.\d{0,2})?/)||[''])[0]);
            //     }
            // },
            jsApiCall(v){
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',{
                        "appId":v.appId,
                        "nonceStr":v.nonceStr,
                        "package":v.package,
                        "paySign":v.paySign,
                        "signType":v.signType,
                        "timeStamp":v.timeStamp
                    },(res) =>{
                        this.mask(false);
                        if(res.err_msg == 'get_brand_wcpay_request:ok'){
                            this.toast([true, 3000, '恭喜您，支付成功!更新可能会有5～10秒延迟!', () => {
                                this.$router.replace({ path: '/pay'})
                            }])
                        }else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
                            this.dialog([true, '取消支付']);
                        }else{
                            this.dialog([true,'支付失败' + res.err_msg])
                        }
                    }
                );
            },
            pay(){
                if (this.params.money == '' || this.params.money == 0) {
                    this.dialog([true, '请输入金额']);
                    return;
                }
                this.mask(true);
                mk.http('/name/Payzc',
                this.params,
                (response) => {
                    if(response.data.status != 0) {
                        this.mask(false);
                    }
                    if(response.data.status == 0){
                        mk.callpay(response.data['parameters'], this.jsApiCall);
                    }else if(response.data.status == 501){
                        this.$set(this.params,'money',response.data.money)
                        this.dialog([true, response.data.mess, () => {
                            if (response.data.money == 0) {
                                this.dialog([true, '众筹已成功无需支付']);
                                this.$router.go(-1)
                            }
                        }])
                    }else{
                        this.dialog([true, response.data.mess])
                    }
                },(response) => {
                    this.dialog([true, response.status])
                })
            },
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../css/mk.scss';
    .weui-cells {
        margin-top: 0;
    }
    .weui-cell {
        background-color: #ddd;
    }
</style>