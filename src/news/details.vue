<template>
    <div class="details upper_spacing">
        <!-- <header-view :title="'系统信息'"></header-view> -->
        <div class="weui-cells">
            <div class="center">
                <div class="title">
                    <h1>{{data.title}}</h1>
                    <p>{{time}}&nbsp;{{data.author}}</p>
                    <div class="line"></div>
                </div>
            </div>
            <div class="content">
            <div v-html="data.content"></div>
            <div class="read_num"><img src="../img/read.jpg">阅读量 {{data.click}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'details',
        data(){
            return {
                data: {}
            }
        },
        computed: Vuex.mapState({
            time(){
                return moment(this.data.time*1000).format('YYYY-MM-DD')
            }
        }),
        created(){
            document.title = '系统信息';
            //获取详情数据
            mk.http('/name/Articleshow/',{
                id: this.$route.params.id
            },(response) => {
                this.$set(this,'data',response.data)
            })
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