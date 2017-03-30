<template>
    <div class="partake_my_list upper_lower_spacing">
        <header-view :title="'我的众筹'"></header-view>
        <div class="weui-cells">
            <div class="weui-tab f">
                <div class="weui-navbar">
                    <div class="weui-navbar__item" :class="{ 'weui-bar__item_on': currentView == 0 }" @click="currentView = 0">
                        进行中
                    </div>
                    <div class="weui-navbar__item" :class="{ 'weui-bar__item_on': currentView == 1 }" @click="currentView = 1">
                        成功
                    </div>
                    <div class="weui-navbar__item" :class="{ 'weui-bar__item_on': currentView == 2 }" @click="currentView = 2">
                        失败
                    </div>
                </div>
            </div>
            <transition name="fade" mode="out-in">
                <list-slide class="list" v-if="currentView == 0" key="0">
                    <li class="list_type0" v-for="(item, index) in filteredStatus0" :key="item" :data-index="index%params.limit">
                        <div class="list_top">
                            <img class="list_img" :src="item.litpic">
                            <h2 class="ellipsis"><span>{{type_font(item)}}</span>{{item.title}}</h2>
                        </div>
                        <bar-view :pdata="item"></bar-view>
                        <div class="list_bottom">
                            <router-link  class="weui-btn weui-btn_mini weui-btn_default" :to="{ name: 'partake', params: { id: item.id } }">点击去众筹</router-link>
                            <router-link class="weui-btn weui-btn_mini weui-btn_primary" :to="{ name: 'partake_my_pay', params: { id: item.id, title: item.title } }">自己支持</router-link>
                        </div>
                    </li>
                    <div class="weui-loadmore" v-if="loading" key="loadmore">
                        <i class="weui-loading"></i>
                        <span class="weui-loadmore__tips">正在加载</span>
                    </div>
                    <div class="weui-loadmore weui-loadmore_line" v-if="loading === 0" key="loadmore_line">
                        <span class="weui-loadmore__tips">暂无数据</span>
                    </div>
                </list-slide>
                <list-slide class="list" v-else-if="currentView == 1" key="1">
                    <li class="list_type1" v-for="(item, index) in filteredStatus0" :key="item" :data-index="index%params.limit">
                        <div class="list_top">
                            <img class="list_img" :src="item.litpic">
                            <h2 class="ellipsis"><span>{{type_font(item)}}</span>{{item.title}}</h2>
                        </div>
                        <bar-view :pdata="item"></bar-view>
                        <div class="list_bottom">
                            <router-link  class="weui-btn weui-btn_mini weui-btn_default" :to="{ name: 'partake', params: { id: item.id } }">点击查看详情</router-link>
                        </div>
                    </li>
                    <div class="weui-loadmore" v-if="loading" key="loadmore">
                        <i class="weui-loading"></i>
                        <span class="weui-loadmore__tips">正在加载</span>
                    </div>
                    <div class="weui-loadmore weui-loadmore_line" v-if="loading === 0" key="loadmore_line">
                        <span class="weui-loadmore__tips">暂无数据</span>
                    </div>
                </list-slide>
                <list-slide class="list" v-else key="2">
                    <li class="list_type2" v-for="(item, index) in filteredStatus0" :key="item" :data-index="index%params.limit">
                        <div class="list_top">
                            <img class="list_img" :src="item.litpic">
                            <h2 class="ellipsis"><span>{{type_font(item)}}</span>{{item.title}}</h2>
                        </div>
                        <bar-view :pdata="item"></bar-view>
                        <div class="list_bottom">
                            <router-link  class="weui-btn weui-btn_mini weui-btn_default" :to="{ name: 'partake', params: { id: item.id } }">点击查看详情</router-link>
                        </div>
                    </li>
                    <div class="weui-loadmore" v-if="loading" key="loadmore">
                        <i class="weui-loading"></i>
                        <span class="weui-loadmore__tips">正在加载</span>
                    </div>
                    <div class="weui-loadmore weui-loadmore_line" v-if="loading === 0" key="loadmore_line">
                        <span class="weui-loadmore__tips">暂无数据</span>
                    </div>
                </list-slide>
            </transition>
        </div>
        <footer-view></footer-view>
    </div>
</template>

<script>
    import bar from'./bar.vue';

    export default {
        name: 'partake_my_list',
        data(){
            return {
                data: [],//列表队列
                currentView: 0,
                params: {//发送数据
                    type: 'my',//类型
                    pages: 1,//获取页数
                    limit: 10,//每页数据长度
                },
                loading: true,//读取状态
                debounced: _.debounce(this.getlist, 1500),//防止短时间内多次调用接口
            }
        },
        computed: vuex.mapState({
            ...vuex.mapState([
            ]),
            ...vuex.mapGetters([
            ]),
            sort(){
                return _.orderBy(this.data, 'time', 'desc')
            },
            filteredStatus0(){
                return this.sort.filter((item) => {
                    return item.status == 0
                })
            },
            filteredStatus1(){
                return this.sort.filter((item) => {
                    return item.status == 1
                })
            },
            filteredStatus2(){
                return this.sort.filter((item) => {
                    return item.status == 2
                })
            },
        }),
        components: {
            'bar-view': bar
        },
        methods: {
            type_font(item){
                switch (item.status) {
                    case 0: return '进行中'
                    case 1: return '成功'
                    case 2: return '失败'
                }
            },
            getlist(){
                mk.http('/name/Partake/',
                this.params,
                (response) => {
                    if (!response.data.length) {//没有数据了
                        this.loading = 0;
                        return;
                    }
                    for(let v of response.data){
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
                        this.debounced()//获取数据 
                    }
                }
            }
        },
        mounted(){
            this.getlist();//获取数据
            window.addEventListener('scroll', this.scroll);
        },
        beforeDestroy(){
            window.removeEventListener('scroll', this.scroll);
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../css/mk.scss';
    .list {
        li {
            padding: .4rem .28rem;
            font-size: .28rem;
            border-bottom: 2px solid #f1f1f1;
            @include clearfix;
        }
        .list_type2 {
            .list_top {
                span {
                    border-color: red;
                    color: red;
                }
            }
        }
        .list_top {
            @include flex(space-between);
            .list_img {
                width: 1.02rem;
                height: .64rem;
            }
            h2 {
                width: 5.66rem;
                font-size: .32rem;
                font-weight: normal;
                margin-bottom: .3rem;
            }
            span {
                display: inline-block;
                padding: 0 .15rem;
                height: .46rem;
                line-height: .46rem;
                border: .02rem solid $green;
                font-size: .28rem;
                margin-right: .25rem;
            }
        }
        .list_bottom {
            width: 6rem;
            float: right;
            border-top: 1px solid #f1f1f1;
            text-align: right;
            padding-top: .4rem;
            margin-right: -.28rem;
            padding-right: .28rem;
            margin-top: .1rem;
            .weui-btn {
                width: 2.04rem;
                padding: 0;
                margin-left: .2rem;
                border-radius: .1rem!important;
                font-size: .28rem!important;
                margin-top: 0;
            }
        }
    }
    #app .weui-navbar__item {
        color: #999!important;
        &.weui-bar__item_on {
            color: #09bb07!important;
        }
    }
</style>