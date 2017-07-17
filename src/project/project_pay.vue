<template>
    <div class="project_pay upper_spacing upper_lower">
        <!-- <header-view :title="data.title"></header-view> -->
        <div class="pay_box" v-if="data.id">
            <div class="pay_img contain" :style="{ backgroundImage: 'url('+data.litpic+')' }"></div>
            <div class="pay_content">
                <h2 class="ellipsis">{{data.title}}</h2>
                <p><i class="yen">&yen;</i>{{data.money/100}} x {{params.pay_num}}</p>
            </div>
            <div class="pay_num">
                <div class="fl">购买数量</div>
                <div class="num_box">
                    <span>{{params.pay_num}}</span>
                </div>
            </div>
            <div class="pay_hj">
                合计： <span><i class="yen">&yen;</i>{{data.money*params.pay_num/100}}</span>
            </div>
        </div>
        <div class="pay_mode weui-cells weui-cells_checkbox">
            <label class="weui-cell weui-check__label" for="s11">
                <div class="weui-cell__bd">
                    <p>微信支付</p>
                </div>
                <div class="weui-cell__hd">
                    <input type="checkbox" class="weui-check" name="checkbox1" id="s11" checked="checked" @click.prevent="">
                    <i class="weui-icon-checked"></i>
                </div>
            </label>
        </div>
        <div class="zfsx" @click="zfsx">* 微信支付额度上限</div>
        <div ref="zfsx_content" style="display: none;">
            <table class="zfsx_table" border="0" cellspacing="1" cellpadding="0">
                <tr>
                    <th>银行</th>
                    <th>储蓄卡</th>
                    <th>信用卡</th>
                </tr>
                <tr>
                    <td>工商</td>
                    <td>10000元/笔<br/>50000元/日</td>
                    <td>10000元/笔<br/>50000元/日</td>
                </tr>
                <tr>
                    <td>农行</td>
                    <td>10000元/笔/日</td>
                    <td>10000元/笔/日</td>
                </tr>
                <tr>
                    <td>招商</td>
                    <td>50000元/笔/日</td>
                    <td>30000元/笔/日</td>
                </tr>
                <tr>
                    <td>建设</td>
                    <td>10000元/笔<br/>50000元/日</td>
                    <td>50000元/笔/日</td>
                </tr>
                <tr>
                    <td>中行</td>
                    <td>20000元/笔/日</td>
                    <td>50000元/笔/日</td>
                </tr>
                <tr>
                    <td>光大</td>
                    <td>50000元/笔/日</td>
                    <td>50000元/笔/日</td>
                </tr>
                <tr>
                    <td>广发</td>
                    <td>50000元/笔/日</td>
                    <td>30000元/笔/日</td>
                </tr>
                <tr>
                    <td>平安</td>
                    <td>50000元/笔/日</td>
                    <td>50000元/笔/日</td>
                </tr>
                <tr>
                    <td>中信</td>
                    <td>100000元/笔/日</td>
                    <td>50000元/笔/日</td>
                </tr>
                <tr>
                    <td>兴业</td>
                    <td>30000元/笔/日</td>
                    <td>30000元/笔<br/>50000元/日</td>
                </tr>
                <tr>
                    <td>民生</td>
                    <td>50000元/笔/日</td>
                    <td>30000元/笔/日</td>
                </tr>
                <tr>
                    <td>浦发</td>
                    <td>300000元/笔<br/>500000元/日</td>
                    <td>50000元/笔/日</td>
                </tr>
                <tr>
                    <td>储蓄</td>
                    <td>5000元/笔/日</td>
                    <td>20000元/笔<br/>50000元/日</td>
                </tr>
                <tr>
                    <td>交行</td>
                    <td>50000元/笔/日</td>
                    <td>25000元/笔/日</td>
                </tr>
            </table>
        </div>
        <div class="bbtn translate-hidden" v-if="params.pay_num">
            <a @click="pay" href="javascript:;" class="weui-btn weui-btn_primary">立即支付</a>
        </div>
    </div>
</template>

<script>
    require('../css/layer.css');
    import layer from '../js/layer.js';

    export default {
        name: 'project_pay',
        data(){
            return {
                data: {},//当前项目数据
                params: {//提交接口数据
                    id: this.$route.params.id,
                    pay_type: 'wx'
                }
            }
        },
        computed: Vuex.mapState({
            zfsx_content(){
                let zfsx = this.$refs.zfsx_content;
                let zfsx_content = zfsx.innerHTML;
                zfsx.parentNode.removeChild(zfsx);
                return zfsx_content;
            },
        }),
        watch: {
            data(){
                document.title = this.data.title;
            }
        },
        created(){
            mk.http('/name/Payshow/',{
                id: this.$route.params.id
            },(response) => {
                response.data.money = Math.round(response.data.money*100);
                this.$set(this, 'data', response.data);
                this.$set(this.params, 'pay_num', this.data.num);
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
                mk.http('/name/Pay',
                this.params,
                (response) => {
                    if(response.data.status != 0) {
                        this.mask(false);
                    }
                    if(response.data.status == 0){
                        mk.callpay(response.data['parameters'], this.jsApiCall);
                    }else{
                        this.dialog([true, response.data.mess])
                    }
                },(response) => {
                    this.dialog([true, response.status])
                })
            },
            zfsx(){
                layer.open({
                    content: this.zfsx_content,
                    btn: '我知道了'
                });
            }
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../css/mk.scss';
    .pay_box {
        padding: .4rem .3rem;
        margin: .4rem 0;
        background: #fff;
        @include clearfix;
        font-size: .32rem;
    }
    .pay_img {
        width: 1.4rem;
        height: .88rem;
        float: left;
    }
    .pay_content {
        margin-left: 1.55rem;
        h2 {
            height: .4rem;
            font-weight: normal;
            margin-bottom: .25rem;
            font-size: .32rem;
        }
    }
    .pay_num {
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
        height: 1.1rem;
        line-height: 1.1rem;
        margin-top: .3rem;
        margin-right: -.3rem;
        @include clearfix;
        .fl {
            float: left;
        }
        .num_box {
            height: .68rem;
            line-height: .68rem;
            text-align: center;
            @include clearfix;
            float: right;
            margin-top: .2rem;
            margin-right: .3rem;
            span {
                width: .8rem;
                height: .68rem;
                float: left;
            }
            div,input {
                width: .8rem;
                height: .68rem;
                float: left;
                border: 1px solid #999;
            }
            div {
                background: #f1f1f1;
                font-size: .36rem;
                &:first-child {
                    line-height: .6rem;
                }
                &:active {
                    background: darken(#f1f1f1, 10%);
                }
            }
            input {
                border-left: 0;
                border-right: 0;
                text-align: center;
            }
        }
    }
    .pay_hj {
        padding-top: .4rem;
        float: right;
        span {
            color: $green;
        }
    }
    .zfsx {
        padding: .3rem;
        color: red;
    }
    .zfsx_table {
        width: 100%;
        background: #386193;
        td {
            background: #fff;
            padding: .1rem;
            color: #000;
        }
        th {
            background: #538dd5;
            padding: .1rem;
            color: #fff;
        }
    }
</style>