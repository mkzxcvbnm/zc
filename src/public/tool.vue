<template>
    <div>
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
    </div>
</template>

<script>
    export default {
        name: 'tool',
        data(){
            return {
                
            }
        },
        computed: vuex.mapState({
            ...vuex.mapState([
                'mask',
                'toast',
                'loadingToast',
            ]),
        }),
        methods: {
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    #toast .weui-icon-warn {
        font-size: 1.2rem;
        padding-bottom: .2rem;
    }
</style>