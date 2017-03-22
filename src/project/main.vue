<template>
    <div class="project upper_spacing">
        <header-view :title="data.title"></header-view>
        <div class="project_top f">
            <div class="project_img">
                <img :src="data.litpic">
                <p class="ellipsis">{{data.describe}}</p>
            </div>
            <div class="project_money">
                <i class="yen">&yen;</i>{{data.money}}
            </div>
        </div>
        <div class="weui-tab f">
            <div class="weui-navbar">
                <div class="weui-navbar__item" :class="{ 'weui-bar__item_on': currentView == 1 }" @click="currentView = 1">
                    详情描述
                </div>
                <div class="weui-navbar__item" :class="{ 'weui-bar__item_on': currentView == 2 }" @click="currentView = 2">
                    报名相关
                </div>
                <div class="weui-navbar__item" :class="{ 'weui-bar__item_on': currentView == 3 }" @click="currentView = 3">
                    参赛标准
                </div>
            </div>
        </div>
        <div class="content">
            {{tab_panel}}
        </div>
        <div class="bbtn translate-hidden">
            <router-link :to="{ name: 'project_pay', params: { id: data.id } }" class="weui-btn weui-btn_primary" v-if="data.Partake == 1">我要报名</router-link>
            <router-link :to="{ name: 'project', params: { id: data.id } }" class="weui-btn weui-btn_primary" v-if="data.Partake == 2">查看详情</router-link>
            <router-link :to="{ name: 'project', params: { id: data.id } }" class="weui-btn weui-btn_primary" v-if="data.Partake == 3">立即支付</router-link>
            <a href="javascript:;" class="weui-btn weui-btn_warn" v-if="data.Partake == 4">活动结束</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'project',
        data: function () {
            return {
                data: {},
                currentView: 1
            }
        },
        computed: {
            tab_panel: function(){
                switch (this.currentView) {
                    case 1: return this.data.content
                    case 2: return this.data.content2
                    case 3: return this.data.content3
                }
            }
        },
        created: function () {
            this.$http.jsonp('http://qingshang.fankeweb.cn/index.php/api/index/name/Projectshow/',{
                params: {
                    id: this.$route.params.id
                }
            })
            .then((response) => {
                this.data = response.data[0];
            })
            .catch(function(response) {
                console.log(response)
            })
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../css/mk.scss';
    .project_img {
        position: relative;
        img {
            width: 100%;
            display: block;
        }
        p {
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: 2;
            width: 100%;
            height: .64rem;
            background: rgba(0,0,0,.5);
            color: #fff;
            font-size: .28rem;
            padding: 0 .3rem;
            line-height: .64rem;
        }
    }
    .project_money {
        height: .96rem;
        line-height: .96rem;
        border-bottom: 1px solid #f1f1f1;
        margin-left: .3rem;
        font-size: .36rem;
    }
    .content {
        margin-bottom: .1rem;
    }
    .weui-navbar {
        background: #fff;
    }
    .weui-navbar__item {
        z-index: 2;
        font-size: .32rem;
        color: #000;
        &.weui-bar__item_on {
            background: #fff;
            color: $green;
            border-bottom: 3px solid $green;
        }
    }
    .weui-navbar__item:after {
        display: none;
    }
    .weui-navbar:after {
        border-bottom: 2px solid #e5e5e5;
    }
    .weui-tab {
        height: 1rem;
    }
</style>