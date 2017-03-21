<template>
    <div class="detail">
        <header-view :title="this.data.title"></header-view>
        <div class="project_top f">
            <div class="project_img">
                <img :src="this.data.litpic">
                <p class="ellipsis">{{this.data.describe}}</p>
            </div>
            <div class="project_money">
                <i>&yen;</i>{{this.data.money}}
            </div>
        </div>
        <div class="weui-tab f">
            <div class="weui-navbar">
                <div class="weui-navbar__item weui-bar__item_on" @click="currentView = 1">
                    详情描述
                </div>
                <div class="weui-navbar__item" @click="currentView = 2">
                    报名相关
                </div>
                <div class="weui-navbar__item" @click="currentView = 3">
                    参赛标准
                </div>
            </div>
        </div>
        <div class="content">
            {{this.tab_panel}}
        </div>
        <a href="javascript:;" class="weui-btn weui-btn_primary">页面主操作 Normal</a>
    </div>
</template>

<script>
    import header from '../public/header.vue';

    export default {
        name: 'detail',
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
        components : {
            'header-view': header,
        },
        created: function () {
            this.$http.jsonp('http://qingshang.fankeweb.cn/index.php/api/index/name/Projectshow/',{
                params: {
                    id: this.$route.params.id
                }
            })
            .then((response) => {
                this.data = response.data[0];
                console.log(response.data[0])
            })
            .catch(function(response) {
                console.log(response)
            })
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss">
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
        i {
            font-style: normal;
            padding-right: .1rem;
        }
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