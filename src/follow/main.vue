<template>
    <div class="follow">
        <div class="follow_tit">
            <h2>先关注公众号才可以参加活动</h2>
            <span>长按二维码图片</span>
        </div>
        <img :src="data">
        <p>关注公众号后，可获得消息通知</p>
        <span class="follow_icon" @click="back">
            <div class="close"></div>
        </span>
    </div>
</template>

<script>
    export default {
        name: 'follow',
        props: [],
        data(){
            return {
                data: {}
            }
        },
        computed: vuex.mapState({
            ...vuex.mapState([
            ]),
            ...vuex.mapGetters([
            ]),
        }),
        watch: {
        },
        methods: {
            ...vuex.mapMutations([
                'SETTRANSITIONNAME'
            ]),
            back(){
                this.SETTRANSITIONNAME('translateY')
                this.$router.go(-1)
            }
        },
        beforeCreate() {
        },
        created() {
            mk.http('/name/Config/cname/wxewm/',{
            },(response) => {
                this.$set(this,'data',response.data)
            })
        },
        beforeMount() {
        },
        mounted(){
            this.$nextTick(() => {
            });
        },
        beforeUpdate() {
        },
        updated(){
        },
        beforeDestroy() {
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