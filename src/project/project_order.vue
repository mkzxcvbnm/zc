<template>
    <div class="project_order upper_spacing upper_lower">
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
                    <div class="minus" @click="minus">-</div>
                    <input v-model="params.pay_num" @input="onInput(params.pay_num)">
                    <div class="plus" @click="plus">+</div>
                </div>
            </div>
            <div class="pay_hj">
                合计： <span><i class="yen">&yen;</i>{{data.money*params.pay_num/100}}</span>
            </div>
        </div>
        <div class="bbtn translate-hidden">
            <a @click="pay" href="javascript:;" class="weui-btn weui-btn_primary">提交订单</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'project_order',
        data() {
            return {
                data: {},//当前项目数据
                params: {//提交接口数据
                    id: this.$route.params.id,
                    pay_num: 1
                }
            }
        },
        watch: {
            data(){
                document.title = this.data.title;
            }
        },
        created(){
            mk.http('/name/Projectshow/',{
                id: this.$route.params.id
            },(response) => {
                response.data.money = Math.round(response.data.money*100);
                this.$set(this, 'data', response.data);
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
                if(typeof v == 'string') {
                    this.$set(this.params,'pay_num',v.replace(/\D/g,''))
                }
                if (v < 1) {
                    this.$set(this.params,'pay_num', 1)
                }
                if (this.params.pay_num * this.data.money > 1e7) {
                    this.$set(this.params,'pay_num', Math.floor(1e7 / this.data.money))
                    this.dialog([true, '最大订单金额不能超过10万'])
                }
            },
            minus(){
                if (this.params.pay_num > 1) {
                    this.params.pay_num--
                }
            },
            plus(){
                this.params.pay_num++;
                this.onInput(this.params.pay_num);
            },
            pay(){
                mk.http('/name/Pay',
                this.params,
                (response) => {
                    if (response.data[0].status === 0) {
                        this.toast([true, , response.data[0].mess, () => {
                            this.$router.push({ name: 'project_pay', params: { id: response.data[0].id }})
                        }])
                    }else{
                        this.dialog([true, response.data[0].mess])
                    }
                },
                (response) => {
                    this.dialog([true, response])
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
            div,input {
                width: .8rem;
                height: .68rem;
                float: left;
                border: 1px solid #999;
                border-radius: 0;
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