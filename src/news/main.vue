<template>
    <div class="news upper_lower_spacing">
        <header-view :title="'系统信息'"></header-view>
        <ul class="news_list weui-cells" key="news">
            <list-slide>
                <li v-for="(item, index) in data" class="weui-cell" :key="item" :data-index="index%params.limit"><router-link :to="{ name: 'details', params: { id: item.id } }">
                    <div class="list2_r">
                        <h2>{{item.title}}</h2>
                        <p>{{item.describe}}</p>
                        <span class="time">{{item.time}}</span>
                    </div>
                </router-link></li>
            </list-slide>
            <div class="weui-loadmore" v-if="loading">
                <i class="weui-loading"></i>
                <span class="weui-loadmore__tips">正在加载</span>
            </div>
            <div class="weui-loadmore weui-loadmore_line" v-if="loading === 0">
                <span class="weui-loadmore__tips">暂无数据</span>
            </div>
        </ul>
        <footer-view></footer-view>
    </div>
</template>

<script>
    let moment = require('moment');

    export default {
        name: 'news',
        data(){
            return {
                data: [],//列表队列
                params: {//发送数据
                    cid: 2,//分类
                    pages: 1,//获取页数
                    limit: 8,//每页数据长度
                },
                loading: true,//读取状态
                debounced: _.debounce(this.getlist, 1500),//防止短时间内多次调用接口
            }
        },
        methods: {
            getlist(){
                mk.http('/name/Article/',
                this.params,
                (response) => {
                    if (!response.data.length){//没有数据了
                        this.loading = 0;
                        return;
                    }
                    for(let v of response.data){
                        v.time = moment(v.time*1000).format('YYYY.MM.DD');
                        this.data.push(v);//渲染
                    }
                    this.$set(this, 'loading', false);//准备渲染关闭loading
                    this.$set(this.params, 'pages', this.params.pages + 1);//页数+1
                })
            },
            scroll(){
                let scrollTop = document.body.scrollTop;
                if(scrollTop + window.innerHeight >= document.body.clientHeight) {//滚到底部
                    if (this.loading === false) {//非loading状态
                        this.$set(this, 'loading', true);//显示loading
                        this.debounced()//获取当前激活选项卡对应的数据
                    }
                }
            }
        },
        mounted(){
            this.getlist();
            window.addEventListener('scroll', this.scroll);
        },
        beforeDestroy(){
            window.removeEventListener('scroll', this.scroll);
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../css/mk.scss';
    .news_list {
        .weui-cell {
            display: block;
            font-size: .32rem;
            h2 {
                color: #6273a3;
                font-weight: normal;
                font-size: .32rem;
            }
            p {
                @include ellipsis(2);
            }
            span {
                color: #999;
                font-size: .24rem;
            }
            &:nth-last-of-type(1):after {
                content: " ";
                position: absolute;
                left: 0;
                right: 0;
                height: 1px;
                color: #d9d9d9;
                bottom: 0;
                border-top: 1px solid #d9d9d9;
                transform-origin: 0 0;
                transform: scaleY(.5);
            }
        }
    }
</style>