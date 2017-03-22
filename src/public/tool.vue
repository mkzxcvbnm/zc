<template>
    <div>
        <div id="mask" class="weui-mask" :style="{'display': mask?'blcok':'none'}"></div>

        <div id="toast" :style="{'display': toast?'blcok':'none'}">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-icon-success-no-circle weui-icon_toast"></i>
                <p class="weui-toast__content">{{toast.text}}</p>
            </div>
        </div>

        <div id="loadingToast" :style="{'display': loadingToast?'blcok':'none'}">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">{{loadingToast.text}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tool',
        data: function () {
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
    
</style>