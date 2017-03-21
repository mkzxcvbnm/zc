<template>
    <div class="header">
        <a v-if="back_show" @click="back" class="back" href="javascript:;"><i class="fa fa-angle-left"></i></a>
        <span>{{this.tit}}</span>
    </div>
</template>

<script>
    require('font-awesome-webpack');
    export default {
        name: 'header',
        props: ['title'],
        data: function () {
            return {
                back_show: this.$route.path != '/'
            }
        },
        computed: {
            tit: function () {
                return this.title || '青商户外联盟'
            }
        },
        mounted: function () {
            this.$nextTick(function () {
            })
        },
        methods: {
            back(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .header {
        height: .78rem;
        line-height: .78rem;
        font-size: .36rem;
        color: #000;
        text-align: center;
        background: #fff;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        width: 100%;
        z-index: 999;
    }
    .back {
        font-size: .72rem;
        color: #333;
        position: absolute;
        left: 0 ;
        top: 0;
        padding: 0 .4rem;
        i {
            vertical-align: top;
        }
    }
</style>