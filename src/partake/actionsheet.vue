<template>
    <div>
        <transition-group name="fade">
            <div class="weui-mask" v-if="actionSheetOp" @click="close" key="close"></div>
            <div class="weui-actionsheet" :class="[{'weui-actionsheet_toggle': actionSheetOp}]" key="actionsheet">
                <div class="weui-actionsheet__menu">
                    <div class="weui-actionsheet__cell" v-for="item in list" @click.stop="active(item)">{{item}}</div>
                </div>
                <div class="weui-actionsheet__action">
                    <div class="weui-actionsheet__cell" @click.stop="close">取消</div>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>
    export default {
        name: 'actionSheet',
        props: ['actionSheet', 'data'],
        computed: Vuex.mapState({
            list(){
                return this.data || []
            },
            actionSheetOp(){
                return this.actionSheet
            },
        }),
        methods: {
            active(text) {
                this.$emit('text', text)
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