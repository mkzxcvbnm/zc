<template>
    <div class="intention upper_lower_spacing">
        <!-- <header-view :title="'手机绑定'"></header-view> -->
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="name" placeholder="请输入您的姓名">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" pattern="/\D/g" v-model="tel" placeholder="请输入您的手机号">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd flex_start"><label class="weui-label">意向说明</label></div>
                <div class="weui-cell__bd">
                    <textarea class="weui-textarea" placeholder="请输入文本" rows="6" v-model="content"></textarea>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a class="weui-btn" :class="[btn_class?'weui-btn_primary':'weui-btn_disabled']" href="javascript:" id="showTooltips" @click="change">确认提交</a>
        </div>
        <footer-view></footer-view>
    </div>
</template>

<script>
    export default {
        name: 'intention',
        data(){
            return {
                name: '',//姓名
                tel: '',//手机号
                content: '',//意向说明
            }
        },
        computed: Vuex.mapState({
            ...Vuex.mapState([
                'userinfo'
            ]),
            btn_class(){
                if (this.name != '' && this.tel != '' && this.content != '') {
                    return true
                }else{
                    return false
                }
            }
        }),
        created(){
            document.title = '赞助意向';
            this.$set(this,'name',this.userinfo.uname);
            this.$set(this,'tel',this.userinfo.tel);
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
            vfc_tel(){
                return this.tel.match(/^1(3|4|5|7|8)\d{9}$/);
            },
            change(){
                if (!this.name) {
                    this.dialog([true, '请输入姓名']);
                    return;
                }
                if (!this.vfc_tel()) {
                    this.dialog([true, '请输入正确手机号']);
                    return;
                }
                if (!this.content) {
                    this.dialog([true, '请输入意向说明']);
                    return;
                }
                //提交修改
                mk.http('/name/Intention/',{
                    uname: this.name,
                    tel: this.tel,
                    content: this.content,
                },(response) => {
                    if (response.data) {
                        this.toast([true, 3000, response.data.mess, () => {
                            this.ISBACK(true)
                            this.$router.go(-1)
                        }])
                    }else{
                        this.dialog([true, response.data.mess]);
                    }
                },
                (response) => {
                    this.dialog([true, response])
                })
            }
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    //@import '../css/mk.scss';
    .flex_start {
        align-self: flex-start;
    }
</style>