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
        </ul>
        <ul class="list center" v-else key="partake">
            <template v-for="item in partake.data">
                <li><a href="javascript:;">
                    <div class="img contain" :style="{backgroundImage: 'url('+item.litpic+')'}"></div>
                    <h2>{{item.title}}</h2>
                    <p><i class="fa fa-clock-o"></i>{{item.updatetime}}<span>¥ {{item.money}}</span></p>
                </a></li>
            </template>
        </ul>
        </transition>
        <div class="weui-loadmore">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">正在加载</span>
        </div>
        <div class="weui-loadmore weui-loadmore_line">
            <span class="weui-loadmore__tips">暂无数据</span>
        </div>
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
                project: {
                    data: {},
                    params: {
                        pages: 1,
                        limit: 5
                    }
                },
                partake: {
                    data: {},
                    params: {
                        pages: 1,
                        limit: 5
                    }
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
                        for(let v of response.data){
                            v.updatetime = moment(v.updatetime*1000).format('YYYY/MM/DD');
                        }
                        this.$set(this[type], 'data', response.data)
                        this.$set(this[type].params, 'pages', this[type].params.pages+1)
                        console.log(this[type].params.pages)
                    })
                    .catch(function(response) {
                        console.log(response)
                    })
                }
                getlist('project');//最新项目
                getlist('partake');//梦想清单

                window.addEventListener('scroll', function() {
                    let scrollTop = document.body.scrollTop;
                    if(scrollTop + window.innerHeight >= document.body.clientHeight) {
                        loadMore();
                    }
                });
                function loadMore() {
                    console.log('加载数据')
                }
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