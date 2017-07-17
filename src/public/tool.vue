<template>
    <div class="tool">
        <transition name="fade">
        <div id="mask" class="weui-mask" v-if="mask"></div>
        </transition>

        <transition name="fade">
        <div id="toast" class="weui-mask" v-if="toast.open">
            <div class="weui-toast">
                <i class="weui-icon_toast" :class="toast.sw?'weui-icon-success-no-circle':'weui-icon-warn'"></i>
                <p class="weui-toast__content">{{toast.text}}</p>
            </div>
        </div>
        </transition>

        <transition name="fade">
        <div id="loadingToast" class="weui-mask" v-if="loadingToast.open">
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">{{loadingToast.text}}</p>
            </div>
        </div>
        </transition>

        <transition name="fade">
        <div class="weui-mask" v-if="dialog.open">
            <div class="weui-dialog">
                <div class="weui-dialog__bd">{{dialog.text}}</div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="DIALOG([false])">知道了</a>
                </div>
            </div>
        </div>
        </transition>

        <transition name="fade">
        <div class="weui-mask" v-if="dialog.open">
            <div class="weui-dialog">
                <div class="weui-dialog__bd">{{dialog.text}}</div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="DIALOG([false])">知道了</a>
                </div>
            </div>
        </div>
        </transition>

        <transition name="fade">
        <div class="weui-mask" v-if="iosDialog1.open">
            <div class="weui-dialog">
                <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{iosDialog1.title}}</strong></div>
                <div class="weui-dialog__bd">{{iosDialog1.text}}</div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="iosDialog1_default">取消</a>
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="iosDialog1_primary">确认</a>
                </div>
            </div>
        </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'tool',
        computed: Vuex.mapState({
            ...Vuex.mapState([
                'mask',
                'toast',
                'loadingToast',
                'dialog',
                'iosDialog1'
            ]),
        }),
        methods: {
            ...Vuex.mapMutations([
                'DIALOG'
            ]),
            iosDialog1_primary(){
                this.iosDialog1.primary();
                this.iosDialog1.open = false;
            },
            iosDialog1_default(){
                this.iosDialog1.default();
                this.iosDialog1.open = false;
            },
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .tool {
        font-family:-apple-system-font,Helvetica Neue,Helvetica,sans-serif
    }
    #toast .weui-icon-warn {
        font-size: 1.2rem;
        padding-bottom: .2rem;
    }
    .weui-toast__content {
        line-height: 1.4;
        padding: 0 .2rem;
        word-wrap: break-word;
        word-break: break-all;
    }
    .weui-toast {
        width: auto;
        min-width: 7.6em;
        margin-left: auto;
        transform: translateX(-50%);
    }
</style>