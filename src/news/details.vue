<template>
    <div class="details upper_spacing">
        <header-view :title="'系统信息'"></header-view>
        <div class="weui-cells">
            <div class="center">
                <div class="title">
                    <h1>首届四天三夜108公里隔壁（宁夏）挑战赛即将开始</h1>
                    <p>2017-03-15&nbsp;张三Laixiac</p>
                    <div class="line"></div>
                </div>
            </div>
            <div class="content">
            【大白，卖的一手好萌】一波三折，妙趣横生。悬疑和温情，搞笑与动作，即使拍成真人版也绝对是一部好题材和好故事。大白呆萌可爱一逗比，细节刻画真实有趣，放气如放屁，警察局撕扯胶带还有低电量时如同宿醉一样。最后，“I will always with you ！”绝对催泪。开年最佳动画！
            它是只充气机器人,也是个医疗伴侣，能够快速扫描，检测出人体的不正常情绪或受伤，并对其治疗。大白呆萌可爱，作为机器人医生它很称职，也是小宏最好的朋友。
            <div class="read_num"><img src="../img/read.jpg">阅读量 6655</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'details',
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
        components: {
        },
        watch: {
        },
        methods: {
            ...vuex.mapMutations([
            ]),
            ...vuex.mapActions([
            ]),
        },
        beforeCreate(){
        },
        created(){
            //获取详情数据
            mk.http('/name/Articleshow/',{
                id: this.$route.params.id
            },(response) => {
                this.$set(this,'data',response.data[0])
            })
        },
        beforeMount(){
        },
        mounted(){
            this.$nextTick(() => {
            });
        },
        beforeUpdate(){
        },
        updated(){
        },
        beforeDestroy(){
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    //@import '../css/mk.scss';
    .title {
        h1 {
            font-size: .36rem;
            font-weight: normal;
            margin: 0;
            padding: .3rem 0 .05rem;
        }
        p {
            font-size: .3rem;
            color: #999;
            padding-bottom: .25rem;
        }
    }
    .content {
        line-height: 1.625;
    }
    .read_num {
        color: #999;
        font-size: .24rem;
        padding: 1.2rem 0 .8rem;
        img {
            width: .3rem;
            height: .24rem;
            margin-right: .18rem;
        }
    }
</style>