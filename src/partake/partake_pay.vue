<template>
    <div class="partake_pay">
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd">付款人信息</div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">我的姓名</label></div>
                <div class="weui-cell__bd">
                    <input v-if="userinfo" class="weui-input" type="input" v-model="userinfo.nickname" :placeholder="userinfo.nickname">
                </div>
            </div>
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__hd"><label class="weui-label">给TA留言</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="params.comment" type="input" :placeholder="placeholder[0]">
                </div>
                <div class="weui-cell__ft arrow_down" @click="actionSheet = true"></div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">付款金额</label></div>
                <div class="weui-cell__bd">
                    <!-- <span class="green">{{params.money}}</span> -->
                    <input class="weui-input green" type="input" v-model="params.money" @input="onInput(params.money)" placeholder="请输入金额">
                </div>
                <div class="weui-cell__ft">
                    <i class="weui-icon-warn"></i>
                </div>
            </div>
            <div class="weui-cell pay_num" v-if="paymoney.length">
                <div v-for="(item, index) in paymoney" :class="{active: payindex == index}" @click="active(index, item)">
                    <span>{{item}}</span>元
                    <i class="weui-icon-success-no-circle"></i>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" href="javascript:" id="showTooltips" @click="pay">确认付款</a>
        </div>
        <actionSheet-view :actionSheet="actionSheet" @text="text" :data="placeholder"></actionSheet-view>
    </div>
</template>

<script>
    import actionSheet from './actionSheet.vue';

    export default {
        name: 'partake_pay',
        // props: ['pdata'],
        data(){
            return {
                // data: this.pdata,
                paymoney: [],
                payindex: -1,
                params: {//提交接口数据
                    pid: this.$route.params.id,
                    comment: '',
                    money: ''
                },
                placeholder: [],//留言内容提示
                actionSheet: false,//选择留言内容弹出层
            }
        },
        computed: Vuex.mapState({
            ...Vuex.mapState([
                'userinfo'
            ])
        }),
        components: {
            'actionSheet-view': actionSheet,
        },
        created() {
            //获取支付默认留言内容
            mk.http('/name/Config/cname/paycontent',{
            },(response) => {
                this.$set(this,'placeholder', response.data)
                this.$set(this.params,'comment', response.data[0])
            })
            //获取快捷支付金额
            mk.http('/name/Config/cname/paymoney',{
            },(response) => {
                this.$set(this,'paymoney', response.data)
            })
        },
        methods: {
            ...Vuex.mapActions([
                'mask',
                'toast',
                'loadingToast',
                'dialog'
            ]),
            onInput(v){
                if (v > 1e5) {
                    this.$set(this.params,'money', 1e5);
                }else{
                    this.$set(this.params,'money',(v.match(/\d+(\.\d{0,2})?/)||[''])[0]);
                }
            },
            active(index, money){
                this.$set(this.params,'money',money)
                this.$set(this,'payindex',index)
            },
            close(){
                this.$emit('close')
            },
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
                if (this.params.comment == '') {
                    this.dialog([true, '您还没有给好友留言，请给TA些鼓励吧']);
                    return;
                }
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
            text(text){
                if (text != undefined) {
                    this.$set(this.params, 'comment', text);
                }
                this.actionSheet = false
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../css/mk.scss';
    .weui-cell:first-child {
        padding-top: .6rem;
    }
    .weui-input.green {
        color: $green;
    }
    .pay_num {
        @include flex(space-between);
        font-size: .32rem;
        div {
            width: 1.2rem;
            height: .6rem;
            line-height: .6rem;
            border-radius: 5px;
            text-align: center;
            border: 1px solid #999;
            overflow: hidden;
            position: relative;
            &.active {
                border-color: $green;
                &:after {
                    content: '';
                    background: url(../img/pay_active.png) no-repeat center / cover;
                    width: .31rem;
                    height: .31rem;
                    position: absolute;
                    right: 0;
                    top: 0;
                    z-index: 2;
                }
            }
        }
        span {
            color: $green;
        }
    }
    .arrow_down {
        transform: rotate(90deg);
        position: absolute;
        right: .3rem;
        top: 0;
        padding: 0;
        height: .8rem;
        width: .8rem;
        z-index: 2;
        &:after {
            left: .32rem;
        }
    }
</style>