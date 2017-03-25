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
                    <input v-model="params.pay_num" @input="onInput(params.pay_num)">
                    <div class="plus" @click="plus">+</div>
                </div>
            </div>
            <div class="pay_hj">
                合计： <span><i class="yen">&yen;</i>{{data.money*params.pay_num}}</span>
            </div>
        </div>
        <div class="pay_mode weui-cells weui-cells_checkbox" v-if="data.Partake == 3">
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
        <div class="bbtn translate-hidden">
            <a @click="pay" v-if="params" href="javascript:;" class="weui-btn weui-btn_primary">{{btn_name}}</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'project_pay',
        data: function () {
            return {
                data: {},//当前项目数据
                params: {}//提交接口数据
            }
        },
        computed: vuex.mapState({
            ...vuex.mapState([
            ]),
            btn_name: function(){
                switch (this.data.Partake) {
                    case 1: return '提交订单'
                    case 3: return '立即支付'
                }
            }
        }),
        components : {
        },
        watch: {
            data() {
                switch (this.data.Partake) {
                    case 1: 
                        this.$set(this, 'params', {
                            id: this.$route.params.id,
                            pay_num: 1
                        })
                    break;
                    case 3: 
                        this.$set(this, 'params', {
                            id: this.$route.params.id,
                            pay_num: 1,
                            pay_type: 'wx'
                        })
                    break;
                }
            }
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
            ...vuex.mapMutations([
                'ISBACK'
            ]),
            ...vuex.mapActions([
                'mask',
                'toast',
                'loadingToast',
            ]),
            onInput(v){
                if(typeof v == 'string') {
                    this.$set(this.params,'pay_num',v.replace(/\D/g,''))
                }
                if (v < 1) {
                    this.$set(this.params,'pay_num',1)
                }
            },
            minus(){
                if (this.params.pay_num > 1) {
                    this.params.pay_num--
                }
            },
            plus(){
                this.params.pay_num++
            },
            pay(){
                this.loadingToast([true])
                this.$http.jsonp('http://qingshang.fankeweb.cn/index.php/api/index/name/Pay',{
                    params: this.params
                })
                .then((response) => {
                    this.loadingToast([false])
                    if (response.data[0].status === 0) {
                        this.toast([true, , response.data[0].mess, () => {
                            this.ISBACK(true)
                            this.$router.go(-1)
                        }])
                    }else{
                        this.toast([false, , response.data[0].mess])
                    }
                })
                .catch(function(response) {
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