<template>
    <div class="follow">
        <div class="follow_tit">
            <h2>关注公众号可以获取更多活动相关信息哦</h2>
            <span>长按二维码识别</span>
        </div>
        <img :src="data">
        <p>如有问题，关注后即可和客服联系</p>
        <span class="follow_icon" @click="back">
            <div class="close"></div>
        </span>
    </div>
</template>

<script>
    export default {
        name: 'follow',
        data(){
            return {
                data: ''
            }
        },
        methods: {
            ...Vuex.mapMutations([
                'ISBACK',
                'SETTRANSITIONNAME'
            ]),
            back(){
                this.ISBACK(true)
                this.SETTRANSITIONNAME('translateY')
                this.$router.go(-1)
            }
        },
        created() {
            document.title = '关注我们';
            mk.http('/name/Config/cname/wxewm/',{
            },(response) => {
                this.$set(this,'data',response.data.replace(/(^\")|(\"*$)/g, ""))
            })
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../css/mk.scss';
    .follow {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #fff;
        @include flex(space-between);
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        z-index: 9999!important;
        img {
            width: 2.67rem;
            height: 2.67rem;
        }
        * {
            margin: .2rem 0;
        }
        .follow_icon {
            width: .44rem;
            height: .44rem;
            line-height: .44rem;
            position: relative;
            background: #7e7f86;
            text-align: center;
            border-radius: 50%;
            i {
                font-style: normal;
                color: #fff;
                font-weight: bold;
            }
        }
    }
    .follow_tit {
        h2 {
            font-size: .36rem;
        }
        span {
            font-size: .28rem;
        }
    }
    .close {
        position: relative;
        width: 100%;
        height: 100%;
        margin: 0;
        &:after,&:before{
            content: '';
            width: .28rem;
            height: .04rem;
            background: #fff;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -.14rem;
            margin-top: -.02rem;
            border-radius: .02rem;
        }
        &:after {
            transform:rotate(45deg);
        }
        &:before {
            transform:rotate(-45deg);
        }
    }
</style>