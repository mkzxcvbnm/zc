<template>
    <div class="order upper_lower_spacing">
        <!-- <header-view :title="'我的订单'"></header-view> -->
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
                        <li v-if="currentView == 0" class="list_type1" v-for="(item, index) in filteredStatus0" :key="item.id" :data-index="index<10?index:10"><router-link :to="{ name: 'project_pay', params: { id: item.id } }">
                            <div class="list_top">
                                <span class="fl">{{item.title}}</span>
                                <span class="fr type_font">{{type_font(item)}}</span>
                            </div>
                            <div class="list_center">
                                <img class="list_img" :src="item.litpic">
                                <p>{{item.describe}}</p>
                                <span><i class="yen">&yen;</i>{{item.money}}<br/>X{{item.num}}</span>
                            </div>
                            <div class="list_bottom">
                                <p>合计：<span class="type_font"><i class="yen">&yen;</i>{{total(item)}}</span></p>
                            </div>
                        </router-link></li>
                        <li v-if="currentView == 1" class="list_type1" v-for="(item, index) in filteredStatus1" :key="item.id" :data-index="index<10?index:10"><router-link :to="{ name: item.type==1?'partake':'project', params: { id: item.pid } }">
                            <div class="list_top">
                                <span class="fl">{{item.title}}</span>
                                <span class="fr type_font">{{type_font(item)}}</span>
                            </div>
                            <div class="list_center">
                                <img class="list_img" :src="item.litpic">
                                <p>{{item.describe}}</p>
                                <span><i class="yen">&yen;</i>{{item.money}}<br/>X{{item.num}}</span>
                            </div>
                            <div class="list_bottom">
                                <p>合计：<span class="type_font"><i class="yen">&yen;</i>{{total(item)}}</span></p>
                            </div>
                        </router-link></li>
                        <li v-if="currentView == 2" :class="[item.status == 0 || item.status == 1?'list_type1':'list_type2']" v-for="(item, index) in filteredStatus2" :key="item.id" :data-index="index<10?index:10" @click="link(item)">
                            <div class="list_top">
                                <span class="fl">{{item.title}}</span>
                                <span class="fr type_font">{{type_font(item)}}</span>
                            </div>
                            <div class="list_center">
                                <img class="list_img" :src="item.litpic">
                                <p>{{item.describe}}</p>
                                <span><i class="yen">&yen;</i>{{item.money}}<br/>X{{item.num}}</span>
                            </div>
                            <div class="list_bottom">
                                <p>合计：<span class="type_font"><i class="yen">&yen;</i>{{total(item)}}</span></p>
                            </div>
                        </li>
                        <div class="weui-loadmore weui-loadmore_line" v-if="loading === 0 || this['filteredStatus'+currentView].length == 0" key="nomore">
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
    export default {
        name: 'pay',
        data(){
            return {
                data: {},
                currentView: 2,
                loading: false,
                tab_top: false,
                tab_tit: ['待支付', '已支付', '全部订单'],
            }
        },
        computed: Vuex.mapState({
            ...Vuex.mapState([
            ]),
            ...Vuex.mapGetters([
            ]),
            filteredStatus0(){
                return this.filteredStatus2.filter((item) => {
                    return item.status == 0
                })
            },
            filteredStatus1(){
                return this.filteredStatus2.filter((item) => {
                    return item.status == 1
                })
            },
            filteredStatus2(){
                return _.orderBy(this.data, 'time', 'desc')
            },
            mt(){
                return parseInt(document.defaultView.getComputedStyle(this.$refs.cells, null).marginTop);
            }
        }),
        methods: {
            type_font(item){
                switch (item.status) {
                    case 0: return '未支付'
                    case 1: return '已支付'
                    case 2: return '已退款'
                    case 3: return '已申请退款'
                    case 4: return '已关闭'
                }
            },
            link(item){
                switch (item.status) {
                    case 0:
                        this.$router.push({name: 'project_pay', params: { id: item.id }})
                        break;
                    case 1:
                        if (item.type == 1) {
                            this.$router.push({name: 'partake', params: { id: item.pid }})
                        }else{
                            this.$router.push({name: 'project', params: { id: item.pid }})
                        }
                    default:
                        return;
                }
            },
            total(item){
                return Math.round(item.money*100)*item.num/100
            },
            hasScroll(){
                if (this.loading !== 0) {
                    scroll(0,1);
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
                    // complete: (elements) => {
                    //     this.hasScroll();
                    // }
                });
            },
            scroll(){
                if(document.body.scrollTop > this.$refs.tab.offsetTop + this.mt) {
                    this.$set(this, 'tab_top', true)
                }else{
                    this.$set(this, 'tab_top', false)
                }
            },
        },
        created(){
            document.title = '我的订单';
            mk.http('/name/Paylist',{
            },
            (response) => {
                this.$set(this,'data',response.data);//渲染
                this.loading = 0;
            })
        },
        mounted(){
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
        .list_top {
            @include clearfix;
        }
        .list_center {
            padding: .3rem 0;
            @include flex(space-between);
            .list_img {
                width: 1.02rem;
                height: .64rem;
            }
            p {
                width: 4rem;
                @include ellipsis(2);
            }
            span {
                width: 1.5rem;
                text-align: right;
            }
        }
        .list_bottom {
            width: 6rem;
            float: right;
            border-top: 1px solid #f1f1f1!important;
            text-align: right;
            padding-top: .25rem;
            margin-right: -.28rem;
            padding-right: .28rem;
        }
    }
    .list_type1 {
        .type_font {
            color: $green;
        }
        .list_top {
            .fl {
                color: #000;
            }
        }
    }
    .list_type2 {
        .list_center {
            color: #666;
        }
        .list_bottom {
            color: #666;
        }
    }
</style>