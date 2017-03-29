<template>
    <div class="partake_my_pay upper_spacing upper_lower">
        <header-view :title="title"></header-view>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label for="" class="weui-label">付款金额</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="input" v-model="params.pay_num" @input="onInput(params.pay_num)" placeholder="请输入金额">
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
                title: this.$route.params.title,
                params: {//提交接口数据
                    id: this.$route.params.id,
                    pay_num: '',
                    pay_type: 'wx'
                },
            }
        },
        components: {
        },
        computed: {
        },
        created() {
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
                this.$set(this.params,'pay_num',(v.match(/\d+(\.\d{0,2})?/)||[''])[0])
            },
            pay(){
                if (this.params.pay_num == '') {
                    this.toast([false, , '请输入金额']);
                    return;
                }
                this.loadingToast([true])
                mk.http('/name/Pay/',
                this.params,
                (response) => {
                    this.loadingToast([false])
                    if (response.data[0].status === 0) {
                        this.toast([true, 3000, response.data[0].mess, () => {
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
</style>