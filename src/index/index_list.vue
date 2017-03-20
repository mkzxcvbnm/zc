<template>
    <div class="index_list">
        <div class="tab">
            <ul>
                <li :class="[{ active: currentView == 'project'}]" @click="currentView = 'project'">最新项目</li>
                <li :class="[{ active: currentView == 'partake'}]" @click="currentView = 'partake'">梦想清单</li>
            </ul>
        </div>
        <transition name="fade" mode="out-in">
        <ul class="list center" v-if="currentView == 'project'" key="project">
            <template v-for="item in project.data">
                <li><a href="javascript:;">
                    <div class="img contain" :style="{backgroundImage: 'url('+item.litpic+')'}"></div>
                    <h2>{{item.title}}</h2>
                    <p><i class="fa fa-clock-o"></i>{{item.updatetime}}<span>¥ {{item.money}}</span></p>
                </a></li>
            </template>
            <div class="weui-loadmore" v-if="project.loading">
                <i class="weui-loading"></i>
                <span class="weui-loadmore__tips">正在加载</span>
            </div>
            <div class="weui-loadmore weui-loadmore_line" v-if="project.loading === 0">
                <span class="weui-loadmore__tips">暂无数据</span>
            </div>
        </ul>
        <ul class="list center" v-else key="partake">
            <template v-for="item in partake.data">
                <li><a href="javascript:;">
                    <div class="img contain" :style="{backgroundImage: 'url('+item.litpic+')'}"></div>
                    <h2>{{item.title}}</h2>
                    <p><i class="fa fa-clock-o"></i>{{item.updatetime}}<span>¥ {{item.money}}</span></p>
                </a></li>
            </template>
            <div class="weui-loadmore" v-if="partake.loading">
                <i class="weui-loading"></i>
                <span class="weui-loadmore__tips">正在加载</span>
            </div>
            <div class="weui-loadmore weui-loadmore_line" v-if="partake.loading === 0">
                <span class="weui-loadmore__tips">暂无数据</span>
            </div>
        </ul>
        </transition>
    </div>
</template>

<script>
    import Swiper from '../js/swiper.min.js';
    let moment = require('moment');

    export default {
        name: 'index_list',
        data: function () {
            return {
                currentView: 'project',
                project: {//最新项目
                    data: [],//列表队列
                    params: {//发送数据
                        pages: 1,//获取页数
                        limit: 5,//每页数据长度
                    },
                    loading: true//读取状态
                },
                partake: {//梦想清单
                    data: [],
                    params: {
                        pages: 1,
                        limit: 5,
                    },
                    loading: true
                }
            }
        },
        mounted: function () {
            let t = this;
            this.$nextTick(function () {
                let getlist = (type) => {
                    this.$http.jsonp('http://qingshang.fankeweb.cn/index.php/api/index/name/'+type+'',{
                        params: this[type].params
                    })
                    .then((response) => {
                        if (!response.data.length) {//没有数据了
                            this[type].loading = 0;
                            return;
                        }
                        this.$set(this[type], 'loading', false);//准备渲染关闭loading
                        for(let v of response.data){
                            v.updatetime = moment(v.updatetime*1000).format('YYYY/MM/DD');
                            this[type].data.push(v);//渲染
                        }
                        this.$set(this[type].params, 'pages', this[type].params.pages + 1);//页数+1
                    })
                    .catch(function(response) {
                        console.log(response)
                    })
                }
                getlist('project');//最新项目
                getlist('partake');//梦想清单

                window.addEventListener('scroll', () => {
                    let scrollTop = document.body.scrollTop;
                    if(scrollTop + window.innerHeight >= document.body.clientHeight) {//滚到底部
                        if (this[this.currentView].loading === false) {//非loading状态
                            this.$set(this[this.currentView], 'loading', true);//显示loading
                            getlist(this.currentView)//获取当前激活选项卡对应的数据
                        }
                    }
                });
            });
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../css/mk.scss';
    .index_list {
        padding: .32rem 0;
        background: #fff;
    }
    .tab {
        width: 5.4rem;
        margin: 0 auto .4rem;
        border: .01rem solid $green;
        padding: 1px;
        border-radius: .4rem;
        ul {
            @include flex(space-between);
            li {
                width: 2.83rem;
                height: .76rem;
                line-height: .76rem;
                font-size: .32rem;
                text-align: center;
                border-radius: .38rem;
                &.active {
                    background: $green;
                    color: #fff;
                }
            }
        }
    }
    .list {
        li {
            padding-bottom: .3rem;
            border-bottom: 1px solid #ddd;
            margin-bottom: .4rem;
        }
        .img {
            width: 6.9rem;
            height: 3.22rem;
        }
        h2 {
            font-size: .28rem;
            font-weight: normal;
            padding: .2rem 0;
        }
        p {
            font-size: .2rem;
            line-height: 24px;
            color: #999;
            i {
                padding-right: .1rem;
            }
            span {
                float: right;
                color: $green;
                font-size: .32rem;
            }
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s,transform .3s;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    .fade-enter {
        transform: translateX(5rem);
    }
    .fade-leave-active {
        transform: translateX(-5rem);
    }
</style>