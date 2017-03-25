<template>
    <div>
        <transition name="fade">
        <div id="iosDialog1" class="weui-mask" v-if="oc">
            <div class="weui-dialog">
                <div class="weui-dialog__hd"><strong class="weui-dialog__title">回复</strong></div>
                <div class="weui-dialog__bd"><textarea v-model="data" placeholder="这一刻您的想法"></textarea></div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="close">取消</a>
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="push">提交</a>
                </div>
            </div>
        </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'dialog',
        props: ['dialogOc'],
        data: function () {
            return {
                data: ''
            }
        },
        computed: vuex.mapState({
            oc: function(){
                return this.dialogOc
            }
        }),
        methods: {
            push() {
                this.$emit('text', this.data)
            },
            close(){
                this.$emit('text')
            }
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .weui-dialog {
        border-radius: 5px;
    }
    .weui-dialog__hd {
        padding-bottom: .3rem;
    }
    .weui-dialog__title {
        font-size: .34rem;
        color: #000;
    }
    .weui-dialog__bd textarea {
        border: 0;
        width: 100%;
        height: 3rem;
        resize: none;
        outline-width: 0;
    }
</style>