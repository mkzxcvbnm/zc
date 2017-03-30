<template>
    <div class="index_list">
        <div class="tab">
            <ul>
                <li :class="[{ active: currentView == 'project'}]" @click="currentView = 'project'">最新项目</li>
                <li :class="[{ active: currentView == 'partake'}]" @click="currentView = 'partake'">梦想清单</li>
            </ul>
        </div>
        <transition name="translateX" mode="out-in">
        <ul class="list center" v-if="currentView == 'project'" key="project">
            <list-slide>
                <li v-for="(item, index) in project.data" :key="item" :data-index="indexindex%project.params.limit"><router-link :to="{ name: 'project', params: { id: item.id } }">
                    <div class="img contain" :style="{backgroundImage: 'url('+item.litpic+')'}"></div>
                    <h3><span class="fl ellipsis">{{item.title}}</span><span class="time"><i class="fa fa-clock-o"></i>{{item.updatetime}}</span></h3>
                    <!-- <p><span class="time"><i class="fa fa-clock-o"></i>{{item.updatetime}}</span><span class="money">¥ {{item.money}}</span></p> -->
                </router-link></li>
            </list-slide>
            <div class="weui-loadmore" v-if="project.loading">
                <i class="weui-loading"></i>
                <span class="weui-loadmore__tips">正在加载</span>
            </div>
            <div class="weui-loadmore weui-loadmore_line" v-if="project.loading === 0">
                <span class="weui-loadmore__tips">暂无数据</span>
            </div>
        </ul>
        <ul class="list center" v-else key="partake">
            <list-slide>
                <li v-for="(item, index) in partake.data" :key="item" :data-index="index%partake.params.limit"><router-link :to="{ name: 'partake', params: { id: item.id } }">
                    <img class="list2_img_big" :src="item.litpic">
                    <div class="list2_r">
                        <h2>{{item.nickname}}<span class="time"><i class="fa fa-clock-o"></i>{{item.time}}</span></h2>
                        <h3>{{item.title}}</h3>
                        <p class="ellipsis">{{item.describe}}</p>
                    </div>
                    <dl>
                        <dd v-for="upic in item.unum_litpic"><img :src="upic"></dd>
                    </dl>
                    <span class="unum">已有{{item.unum}}人参与</span>
                </router-link></li>
            </list-slide>
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
    let moment = require('moment');

    export default {
        name: 'index_list',
        data(){
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
        methods: {
            getlist(type){
                mk.http('/name/'+type+'',
                this[type].params,
                (response) => {
                    if (!response.data.length) {//没有数据了
                        this[type].loading = 0;
                        return;
                    }
                    for(let v of response.data){
                        if (v.time) v.time = moment(v.time*1000).format('YYYY/MM/DD');
                        if (v.updatetime) v.updatetime = moment(v.updatetime*1000).format('YYYY/MM/DD');
                        this[type].data.push(v);//渲染
                    }
                    this.$set(this[type], 'loading', false);//准备渲染关闭loading
                    this.$set(this[type].params, 'pages', this[type].params.pages + 1);//页数+1
                })
            },
            debounced(){
                return _.debounce(this.getlist, 1500);
            },
            scroll(){
                let scrollTop = document.body.scrollTop;
                if(scrollTop + window.innerHeight >= document.body.clientHeight) {//滚到底部
                    if (this[this.currentView].loading === false) {//非loading状态
                        this.$set(this[this.currentView], 'loading', true);//显示loading
                        this.debounced(this.currentView)//获取当前激活选项卡对应的数据
                    }
                }
            }
        },
        created(){
            this.getlist('project');//最新项目
            this.getlist('partake');//梦想清单
            window.addEventListener('scroll', this.scroll);
        },
        beforeDestroy(){
            window.removeEventListener('scroll', this.scroll);
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
            @include clearfix;
        }
        .img {
            width: 6.9rem;
            height: 3.22rem;
        }
        h3 {
            font-size: .28rem;
            font-weight: normal;
            margin-top: .2rem;
            overflow: hidden;
            .fl {
                width: 5rem;
            }
            .time {
                float: right;
            }
        }
        p {
            line-height: 24px;
            color: #999;
        }
        .time {
            color: #999;
            font-size: .2rem;
            font-weight: normal;
            i {
                padding-right: .1rem;
            }
        }
        .money {
            float: right;
            color: $green;
            font-size: .32rem;
        }
        .list2_img_big {
            width: 1.2rem;
            height: 1.2rem;
            float: left;
            border-radius: 50%;
            border: .03rem solid #f1f1f1;
        }
        h2 {
            font-size: .32rem;
            border-bottom: 1px solid #f1f1f1;
            line-height: 2;
            font-weight: normal;
            .time {
                float: right;
            }
        }
        .list2_r {
            margin-left: 1.45rem;
            padding-bottom: .2rem;
            h3,p {
                width: 4.2rem;
            }
            h3 {
                @include ellipsis(2);
                margin: .1rem 0;
            }
        }
        dl {
            @include clearfix;
            float: left;
            dd {
                float: left;
                margin-left: -.2rem;
                &:first-child {
                    margin-left: 0;
                }
                img {
                    width: .65rem;
                    height: .65rem;
                    border-radius: 50%;
                    border: .03rem solid #fff;
                }
            }
        }
        .unum {
            float: right;
            font-size: .2rem;
            color: #666;
            line-height: .65rem;
        }
    }
    .translateX-enter-active, .translateX-leave-active {
        transition: all .3s;
        position: static;
    }
</style>