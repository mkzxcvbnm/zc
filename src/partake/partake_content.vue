<template>
    <div class="partake_content center">
        <div class="partake_content_top">
            <img :src="partakeData.userinfo.portrait">
            <p>{{partakeData.userinfo.nickname}}的众筹</p>
            <span>{{distime}}</span>
        </div>
        <div class="partake_content_bar">
            <div class="bar_box">
                <span :style="{ left: -(1-(bar)) * 100 + '%' }"></span>
            </div>
            <span class="fl">完成进度：{{bar * 100}}% </span>
            <span class="fr">还差{{data.money - partakeData.money}}元</span>
        </div>
        <div class="line row_r"></div>
        <div class="partake_content_c row_l row_r">
            <div>
                <p><i class="yen">&yen;</i>{{data.money}}</p>
                <span>目标金额</span>
            </div>
            <div>
                <p><i class="yen">&yen;</i>{{partakeData.money}}</p>
                <span>已筹金额</span>
            </div>
            <div>
                <p>{{partakeData.unum}}人</p>
                <span>支持人数</span>
            </div>
        </div>
        <div class="line row_l row_r"></div>
        <div class="partake_content_b">
            <img :src="data.litpic">
            <p>{{data.describe}}</p>
        </div>
        <div class="line row_l row_r"></div>
    </div>
</template>

<script>
    export default {
        name: 'partake_content',
        props: ['pdata', 'ppartakeData'],
        data(){
            return {
                bar: 0,
            }
        },
        computed: {
            data(){
                return this.pdata;
            },
            partakeData(){
                setTimeout(() => {
                    this.$set(this,'bar',this.partakeData.money / this.data.money)
                },50)
                return this.ppartakeData;
            },
            distime: function(){
                let time = this.partakeData.time - new Date().getTime()/1000
                if (time < 43200) {
                    return '刚刚发起'
                }else if(time < 86400){
                    return '1天内发起'
                }else if(time < 172800){
                    return '2天内发起'
                }else if(time < 259200){
                    return '3天内发起'
                }else{
                    return moment(time*1000).format('YYYY/MM/DD')
                }
            }
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../css/mk.scss';
    .partake_content {
        background: #fff;
    }
    .partake_content_top {
        @include clearfix;
        color: #fff;
        position: relative;
        top: -.85rem;
        margin-bottom: -.85rem;
        img {
            width: 1rem;
            height: 1rem;
            float: left;
            margin-right: .2rem;
            background: #fff;
        }
        p {
            font-size: .28rem;
        }
    }
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
    .partake_content_c {
        @include flex(space-around);
        padding: .35rem 0;
        text-align: center;
        p {
            font-size: .36rem;
            color: $green;
            font-weight: bold;
        }
        span {
            font-size: .28rem;
        }
    }
    .partake_content_b {
        padding: .35rem 0;
        @include clearfix;
        p {
            line-height: .36rem;
            font-size: .28rem;
            width: 5rem;
            float: left;
        }
        img {
            float: right;
            width: 1.33rem;
        }
    }
</style>