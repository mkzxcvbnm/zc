<template>
    <div class="partake_content center">
        <div class="partake_content_top">
            <img :src="!data.userinfo?'':data.userinfo.portrait">
            <p v-if="data.userinfo">{{data.userinfo.nickname}}的众筹</p>
            <span>{{distime}}</span>
        </div>
        <bar-view :pdata="data"></bar-view>
        <div class="line row_r"></div>
        <div class="partake_content_c row_l row_r">
            <div>
                <p><i class="yen">&yen;</i>{{data.xm_money}}</p>
                <span>目标金额</span>
            </div>
            <div>
                <p><i class="yen">&yen;</i>{{data.money}}</p>
                <span>已筹金额</span>
            </div>
            <div>
                <p>{{data.unum}}人</p>
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
    import bar from'./bar.vue';
    
    export default {
        name: 'partake_content',
        props: ['pdata'],
        data(){
            return {
                data: this.pdata,
                bar: 0,
            }
        },
        computed: {
            distime: function(){
                let time = new Date().getTime()/1000 - this.data.time;
                if (time < 43200) {
                    return '刚刚发起'
                }else if(time < 86400){
                    return '1天内发起'
                }else if(time < 172800){
                    return '2天内发起'
                }else if(time < 259200){
                    return '3天内发起'
                }else{
                    return moment(this.data.time*1000).format('YYYY/MM/DD')
                }
            }
        },
        components: {
            'bar-view': bar
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
            line-height: 1.4;
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
            width: 1.7rem;
        }
    }
</style>