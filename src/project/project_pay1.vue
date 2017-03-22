<template>
    <div class="project_pay1 upper_spacing">
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
                    <div class="minus" @click="minus">-</div>
                    <span>{{params.pay_num}}</span>
                    <div class="plus" @click="plus">+</div>
                </div>
            </div>
            <div class="pay_hj">
                合计： <span><i class="yen">&yen;</i>{{data.money*params.pay_num}}</span>
            </div>
        </div>
        <div class="bbtn translate-hidden">
            <a v-if="data.Partake == 1" @click="pay" href="javascript:;" class="weui-btn weui-btn_primary">提交订单</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'project_pay',
        data: function () {
            return {
                data: {},
                params: {
                    id: this.$route.params.id,
                    pay_num: 1
                },
            }
        },
        components : {
        },
        created: function () {
            this.$http.jsonp('http://qingshang.fankeweb.cn/index.php/api/index/name/Projectshow/',{
                params: {
                    id: this.$route.params.id
                }
            })
            .then((response) => {
                this.data = response.data[0];
            })
            .catch(function(response) {
                console.log(response)
            })
        },
        methods: {
            minus(){
                if (this.params.pay_num > 1) {
                    this.params.pay_num--
                }
            },
            plus(){
                this.params.pay_num++
            },
            pay(){
                this.$http.jsonp('http://qingshang.fankeweb.cn/index.php/api/index/name/Pay',{
                    params: this.params
                })
                .then((response) => {
                    this.data = response.data[0];
                })
                .catch(function(response) {
                    console.log(response)
                })
                // 
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
            div,span {
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
            span {
                border-left: 0;
                border-right: 0;
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