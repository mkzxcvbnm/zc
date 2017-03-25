<template>
    <div class="project_content">
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
            <transition name="fade" mode="out-in">
            <div v-if="currentView == 1" key="1">
                {{data.content}}
            </div>
            <div v-if="currentView == 2" key="2">
                {{data.content2}}
            </div>
            <div v-if="currentView == 3" key="3">
                {{data.content3}}
            </div>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'project_content',
        props: ['pdata'],
        data: function () {
            return {
                currentView: 1
            }
        },
        computed: {
            data(){
                return this.pdata;
            },
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../css/mk.scss';
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