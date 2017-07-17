<template>
    <div class="partake_my_list upper_lower_spacing">
        <!-- <header-view :title="'我的众筹'"></header-view> -->
        <draggable-view>
            <template slot="draggable">
                <div class="weui-cells" ref="cells">
                    <div class="weui-tab f" ref="tab">
                        <div class="weui-navbar">
                            <div v-for="(n,index) in tab_tit.length" class="weui-navbar__item" :class="{ 'weui-bar__item_on': currentView == index }" @click="changeView(index)">
                                {{tab_tit[index]}}
                            </div>
                        </div>
                    </div>
                    <div class="weui-tab tab_top f" :style="{display: tab_top?'block':'none'}">
                        <div class="weui-navbar">
                            <div v-for="(n,index) in tab_tit.length" class="weui-navbar__item" :class="{ 'weui-bar__item_on': currentView == index }" @click="changeView(index)">
                                {{tab_tit[index]}}
                            </div>
                        </div>
                    </div>
                    <list-slide class="list">
                        <li v-if="currentView == 0" class="list_type0" v-for="(item, index) in filteredStatus0" :key="item.id" :data-index="index%params.limit">
                            <img class="list_img" :src="item.litpic">
                            <div class="list_top">
                                <h2><span>{{type_font(item)}}</span>{{item.title}}</h2>
                            </div>
                            <bar-view :pdata="item"></bar-view>
                            <div class="list_bottom">
                                <router-link  class="weui-btn weui-btn_mini weui-btn_default" :to="{ name: 'partake', params: { id: item.id } }">点击去众筹</router-link>
                                <!-- <router-link class="weui-btn weui-btn_mini weui-btn_primary" :to="{ name: 'partake_my_pay', params: { id: item.id, title: item.title } }">自己支持</router-link> -->
                            </div>
                        </li>
                        <li v-if="currentView == 1" class="list_type1" v-for="(item, index) in filteredStatus1" :key="item.id" :data-index="index%params.limit">
                            <img class="list_img" :src="item.litpic">
                            <div class="list_top">
                                <h2><span>{{type_font(item)}}</span>{{item.title}}</h2>
                            </div>
                            <bar-view :pdata="item"></bar-view>
                            <div class="list_bottom">
                                <router-link  class="weui-btn weui-btn_mini weui-btn_default" :to="{ name: 'partake', params: { id: item.id } }">点击查看详情</router-link>
                            </div>
                        </li>
                        <li v-if="currentView == 2" class="list_type2" v-for="(item, index) in filteredStatus2" :key="item.id" :data-index="index%params.limit">
                            <img class="list_img" :src="item.litpic">
                            <div class="list_top">
                                <h2><span>{{type_font(item)}}</span>{{item.title}}</h2>
                            </div>
                            <!-- <bar-view :pdata="item"></bar-view>
                            <div class="list_bottom">
                                <router-link  class="weui-btn weui-btn_mini weui-btn_default" :to="{ name: 'partake', params: { id: item.id } }">点击查看详情</router-link>
                            </div> -->
                        </li>
                        <div class="weui-loadmore" v-if="loading" key="load">
                            <i class="weui-loading"></i>
                            <span class="weui-loadmore__tips">正在加载</span>
                        </div>
                        <div class="weui-loadmore weui-loadmore_line" v-if="loading === 0" key="nomore">
                            <span class="weui-loadmore__tips">暂无数据</span>
                        </div>
                    </list-slide>
                </div>
            </template>
        </draggable-view>
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
                tab_top: false,
                tab_tit: ['进行中', '成功', '失败'],
            }
        },
        computed: Vuex.mapState({
            ...Vuex.mapState([
            ]),
            ...Vuex.mapGetters([
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
            mt(){
                return parseInt(document.defaultView.getComputedStyle(this.$refs.cells, null).marginTop);
            }
        }),
        components: {
            'bar-view': bar
        },
        created() {
            document.title = '我的众筹';
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
                    if (response.data.length) {
                        for(let v of response.data){
                            this.data.push(v);//渲染
                        }
                        this.$set(this, 'loading', false);//准备渲染关闭loading
                        this.$set(this.params, 'pages', this.params.pages + 1);//页数+1
                        this.hasScroll();
                    }
                    if (response.data.length < this.params.limit) {//数据不足 或 没有数据
                        this.$set(this, 'loading', 0);
                    }
                })
            },
            scroll(){
                let scrollTop = document.body.scrollTop;
                if(scrollTop > this.$refs.tab.offsetTop + this.mt) {
                    this.$set(this, 'tab_top', true)
                }else{
                    this.$set(this, 'tab_top', false)
                }
                if(scrollTop + window.innerHeight >= document.body.clientHeight - 1000) {//滚到底部
                    if (this.loading === false) {//非loading状态
                        this.$set(this, 'loading', true);//显示loading
                        this.debounced()//获取数据 
                    }
                }
            },
            hasScroll(){
                if (this.loading !== 0) {
                    scroll(0,1);
                    //如果页面高度不够滚动
                    if (document.body.scrollTop == 0) {
                        this.getlist()//获取数据
                    }
                }
            },
            changeView(index){
                this.currentView = index;
                Velocity(document.getElementsByTagName('html'), 'scroll', {
                    duration: 400,
                    mobileHA: false,
                    complete: (elements) => {
                        this.hasScroll();
                    }
                });
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
        .list_img {
            width: 1.02rem;
            float: left;
        }
        .list_top {
            float: right;
            h2 {
                width: 5.66rem;
                font-size: .32rem;
                font-weight: normal;
                margin-bottom: .3rem;
                line-height: 2;
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