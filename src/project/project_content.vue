<template>
    <div class="project_content">
        <div class="weui-tab f" ref="tab">
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
        <div class="weui-tab tab_top f" ref="tab_copy" :style="{display: tab_top?'block':'none'}">
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
            <div class="ck_box" v-if="currentView == 1" key="1">
                <div v-html="pro_data.content"></div>
                <div class="ck_btn" @click="more">查看更多</div>
            </div>
            <div class="ck_box" v-if="currentView == 2" key="2">
                <div v-html="pro_data.content2"></div>
                <div class="ck_btn" @click="more">查看更多</div>
            </div>
            <div class="ck_box" v-if="currentView == 3" key="3">
                <div v-html="pro_data.content3"></div>
                <div class="ck_btn" @click="more">查看更多</div>
            </div>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'project_content',
        props: ['pid', 'prefs'],
        data(){
            return {
                pro_data: {},
                currentView: 1,
                tab_top: false,
            }
        },
        computed: {
            dom_head(){
                return this.prefs.header.$refs.header;
            },
            head_h(){
                let header = document.defaultView.getComputedStyle(this.dom_head, null)
                return parseInt(header.height);
            }
        },
        created() {
            //获取大项目数据
            mk.http('/name/Projectshow/',{
                id: this.pid
            },(response) => {
                this.$set(this,'pro_data',response.data)
            })
        },
        methods: {
            more(event){
                let t = event.currentTarget;
                t.style.display = t.parentNode.style.maxHeight = 'none';
            },
            scroll(){
                if(document.body.scrollTop >= this.$refs.tab.offsetTop - this.head_h) {
                    this.$set(this, 'tab_top', true)
                }else{
                    this.$set(this, 'tab_top', false)
                }
            }
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
    //@import '../css/mk.scss';
    .ck_box {
        max-height: 8rem;
        overflow: hidden;
        position: relative;
    }
    .ck_btn {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        text-align: center;
        height: 1rem;
        line-height: 1rem;
        z-index: 2;
        color: #000;
        background: #fff;
    }
    .tab_top {
        position: fixed;
        top: .78rem;
        left: 0;
        width: 100%;
        border-top: 1px solid #ccc;
        z-index: 999;
        display: none;
    }
</style>