<template>
    <div class="project_pay upper_spacing upper_lower">
        <header-view :title="data.title"></header-view>
        <div class="pay_box">
            <div class="pay_img contain" :style="{ backgroundImage: 'url('+data.litpic+')' }"></div>
            <div class="pay_content">
                <h2>{{data.title}}</h2>
                <p><i class="yen">&yen;</i>{{data.money}} x 1</p>
            </div>
            <div class="pay_num">
                <div class="fl">购买数量</div>
                <div class="num_box">
                    <span>{{params.pay_num}}</span>
                </div>
            </div>
            <div class="pay_hj">
                合计： <span><i class="yen">&yen;</i>{{data.money*params.pay_num}}</span>
            </div>
        </div>
        <div class="pay_mode weui-cells weui-cells_checkbox">
            <label class="weui-cell weui-check__label" for="s11">
                <div class="weui-cell__bd">
                    <p>微信支付</p>
                </div>
                <div class="weui-cell__hd">
                    <input type="checkbox" class="weui-check" name="checkbox1" id="s11" checked="checked">
                    <i class="weui-icon-checked"></i>
                </div>
            </label>
        </div>
        <div class="bbtn translate-hidden" v-if="params.pay_num">
            <a @click="pay" href="javascript:;" class="weui-btn weui-btn_primary">立即支付</a>
        </div>
    </div>
</template>

<script>
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
        created(){
            mk.http('http://qingshang.fankeweb.cn/index.php/api/index/name/Payshow/',{
                id: this.$route.params.id
            },(response) => {
                this.$set(this, 'data', response.data[0]);
                this.$set(this.params, 'pay_num', this.data.num);
            })
        },
        methods: {
            ...vuex.mapMutations([
                'ISBACK'
            ]),
            ...vuex.mapActions([
                'mask',
                'toast',
                'loadingToast',
            ]),
            pay(){
                this.loadingToast([true])
                mk.http('http://qingshang.fankeweb.cn/index.php/api/index/name/Pay',
                this.params,
                (response) => {
                    this.loadingToast([false])
                    if (response.data[0].status === 0) {
                        this.toast([true, 3000, response.data[0].mess, () => {
                            this.ISBACK(true)
                            this.$router.replace('/')
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
            @include ellipsis;
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
            width: 2.4rem;
            height: .68rem;
            line-height: .68rem;
            text-align: center;
            @include clearfix;
            float: right;
            margin-top: .2rem;
            margin-right: .3rem;
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
</style>