<template>
    <div class="partake_content_bar">
        <div class="bar_box">
            <span :style="{ left: -(1-(bar)) * 100 + '%' }"></span>
        </div>
        <span class="fl">完成进度：{{(bar * 100).toFixed(2)}}% </span>
        <span class="fr">还差{{data.xm_money - data.money}}元</span>
    </div>
</template>

<script>
    export default {
        name: 'partake_content_bar',
        props: ['pdata'],
        data(){
            return {
                bar: 0,
            }
        },
        computed: {
            data(){
                setTimeout(() => {
                    this.$set(this,'bar',this.data.money / this.data.xm_money)
                },50)
                return this.pdata;
            },
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../css/mk.scss';
    .partake_content_bar {
        float: right;
        .bar_box {
            width: 5.66rem;
            height: .24rem;
            background-color: #e5e5e5;
            overflow: hidden;
            border-radius: .12rem;
            position: relative;
            span {
                display: block;
                width: 5.66rem;
                height: .24rem;
                background-color: $green;
                border-radius: .12rem;
                transition: all 1s ease-out .5s;
                position: absolute;
                left: -100%;
                top: 0;
                z-index: 2;
            }
        }
        span {
            line-height: .85rem;
            font-size: .32rem;
        }
    }
</style>