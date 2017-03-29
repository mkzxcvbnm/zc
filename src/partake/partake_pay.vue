<template>
    <div class="partake_pay">
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd">付款人信息</div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">我的姓名</label></div>
                <div class="weui-cell__bd">
                    <input v-if="data.userinfo" class="weui-input" type="input" v-model="data.userinfo.nickname" :placeholder="data.userinfo.nickname">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">给他留言</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="params.comment" type="input" :placeholder="params.comment">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">付款金额</label></div>
                <div class="weui-cell__bd">
                    <span class="green">{{params.money}}</span>
                    <!-- <input class="weui-input green" type="input" v-model="params.money" @input="onInput(params.money)" placeholder="请输入金额"> -->
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
    </div>
</template>

<script>
    export default {
        name: 'partake_pay',
        props: ['pdata'],
        data(){
            return {
                data: this.pdata,
                paymoney: [],
                payindex: 0,
                params: {//提交接口数据
                    pid: this.pdata.uid,
                    comment: '',
                    money: ''
                },
            }
        },
        created() {
            //获取支付默认留言内容
            mk.http('http://qingshang.fankeweb.cn/index.php/api/index/name/Config/cname/paycontent',{
            },(response) => {
                this.$set(this.params,'comment',response.data[0])
            })
            //获取快捷支付金额
            mk.http('http://qingshang.fankeweb.cn/index.php/api/index/name/Config/cname/paymoney',{
            },(response) => {
                this.$set(this,'paymoney',response.data)
                this.$set(this.params,'money',response.data[0])
            })
        },
        methods: {
            ...vuex.mapActions([
                'mask',
                'toast',
                'loadingToast',
            ]),
            onInput(v){
                this.$set(this.params,'pay_num',(v.match(/\d+(\.\d{0,2})?/)||[''])[0])
            },
            active(index, money){
                this.$set(this.params,'money',money)
                this.$set(this,'payindex',index)
            },
            close(){
                this.$emit('close')
            },
            pay(){
                if (this.params.pay_num == '') {
                    this.toast([false, , '请输入金额']);
                    return;
                }
                this.loadingToast([true])
                mk.http('http://qingshang.fankeweb.cn/index.php/api/index/name/Payzc',
                this.params,
                (response) => {
                    this.loadingToast([false])
                    if (response.data[0].status === 1) {
                        this.toast([true, 3000, response.data[0].mess, () => {
                            // this.close()
                            this.$router.push({ path: '/pay'})
                        }])
                    }else{
                        this.toast([false, , response.data[0].mess])
                    }
                },
                (response) => {
                    this.loadingToast([false])
                    this.toast([false, , response])
                })
            },
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
                    background: url(../img/pay_active.png) no-repeat center / contain;
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
</style>