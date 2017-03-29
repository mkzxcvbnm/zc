<template>
    <div class="order upper_lower_spacing">
        <header-view :title="'我的订单'"></header-view>
        <div class="weui-cells">
            <div class="weui-tab f">
                <div class="weui-navbar">
                    <div class="weui-navbar__item" :class="{ 'weui-bar__item_on': currentView == 0 }" @click="currentView = 0">
                        待支付
                    </div>
                    <div class="weui-navbar__item" :class="{ 'weui-bar__item_on': currentView == 1 }" @click="currentView = 1">
                        已完成
                    </div>
                    <div class="weui-navbar__item" :class="{ 'weui-bar__item_on': currentView == 2 }" @click="currentView = 2">
                        全部订单
                    </div>
                </div>
            </div>
            <transition name="fade" mode="out-in">
                <list-slide class="list" v-if="currentView == 0" key="0">
                    <li class="list_type1" v-for="(item, index) in filteredStatus0" :key="item.id" :data-index="index"><router-link :to="{ name: 'project_pay', params: { id: item.id } }">
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
                            <p>合计：<span class="type_font"><i class="yen">&yen;</i>{{item.num * item.money}}</span></p>
                        </div>
                    </router-link></li>
                    <div class="weui-loadmore weui-loadmore_line" v-if="filteredStatus0.length == 0" :key="-1">
                        <span class="weui-loadmore__tips">暂无数据</span>
                    </div>
                </list-slide>
                <list-slide class="list" v-else-if="currentView == 1" key="1">
                    <li class="list_type1" v-for="(item, index) in filteredStatus1" :key="item.id" :data-index="index"><router-link :to="{ name: 'partake', params: { id: item.id } }">
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
                            <p>合计：<span class="type_font"><i class="yen">&yen;</i>{{item.num * item.money}}</span></p>
                        </div>
                    </router-link></li>
                    <div class="weui-loadmore weui-loadmore_line" v-if="filteredStatus1.length == 0" :key="-1">
                        <span class="weui-loadmore__tips">暂无数据</span>
                    </div>
                </list-slide>
                <list-slide class="list" v-else key="2">
                    <li :class="[item.status == 2?'list_type2':'list_type1']" v-for="(item, index) in sort" :key="item.id" :data-index="index"><router-link :to="{ name: 'partake', params: { id: item.id } }">
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
                            <p>合计：<span class="type_font"><i class="yen">&yen;</i>{{item.num * item.money}}</span></p>
                        </div>
                    </router-link></li>
                    <div class="weui-loadmore weui-loadmore_line" v-if="sort.length == 0" :key="-1">
                        <span class="weui-loadmore__tips">暂无数据</span>
                    </div>
                </list-slide>
            </transition>
        </div>
        <footer-view></footer-view>
    </div>
</template>

<script>
    export default {
        name: 'order',
        props: [],
        data(){
            return {
                data: {},
                currentView: 2,
                loading: false,
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
            type_font(item){
                switch (item.status) {
                    case 0: return '等待买家付款'
                    case 1: return '已支付'
                    case 2: return '订单已关闭'
                }
            },
        },
        beforeCreate(){
        },
        created(){
            mk.http('/name/Paylist',{
            },
            (response) => {
                this.$set(this,'data',response.data);//渲染
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
            border-top: 1px solid #f1f1f1;
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