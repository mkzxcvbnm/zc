<template>
    <div class="partake_content_bar">
        <div class="bar_box">
            <span :style="{ left: -(1-(bar)) * 100 + '%' }"></span>
        </div>
        <span ref="percent" class="fl">完成进度：{{percent}}%</span>
        <span v-if="xm_money - money > 0" class="fr">还差{{ (xm_money - money) / 100 }}元</span>
    </div>
</template>

<script>
    export default {
        name: 'partake_content_bar',
        props: ['pdata'],
        data(){
            return {
                bar: 0,
                percent: 0,
            }
        },
        computed: {
            data(){
                setTimeout(() => {
                    this.$set(this,'bar',this.xm_money == 0 ? 0 : this.money / this.xm_money)
                    Velocity(this.$refs.percent,{
                        tween: this.bar
                    }, {
                        duration: "1000",
                        easing: "ease-out",
                        delay: "500",
                        progress: (elements, c, r, s, t) => {
                            let percent = this.bar?(this.bar * c * 100).toFixed(2) : 0;
                            this.$set(this,'percent', percent)
                        }
                    });
                })
                return this.pdata;
            },
            money(){
                return Math.round(this.data.money*100)
            },
            xm_money(){
                return Math.round(this.data.xm_money*100)
            }
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
            .fr {
                max-width: 2.5rem;
                word-wrap: break-word;
                word-break: break-all;
            }
        }
        span {
            line-height: .85rem;
            font-size: .32rem;
        }
    }
</style>