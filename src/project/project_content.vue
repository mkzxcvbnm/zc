<template>
    <div class="project_content">
        <div class="weui-tab f" ref="tab">
            <div class="weui-navbar">
                <div v-for="(n,index) in tab_tit.length" class="weui-navbar__item" :class="{ 'weui-bar__item_on': currentView == n }" @click="currentView = n">
                    {{tab_tit[index]}}
                </div>
            </div>
        </div>
        <div class="weui-tab tab_top f" :style="{display: tab_top?'block':'none'}">
            <div class="weui-navbar">
                <div v-for="(n,index) in tab_tit.length" class="weui-navbar__item" :class="{ 'weui-bar__item_on': currentView == n }" @click="currentView = n">
                    {{tab_tit[index]}}
                </div>
            </div>
        </div>
        <div class="content">
            <!-- <transition name="fade" mode="out-in" @enter="enter"> -->
            <template v-for="n in tab_tit.length">
                <transition name="fade" @afterEnter="afterEnter">
                <div class="ck_box" v-if="currentView == n">
                    <div class="ck_box_content" v-html="pro_data['content' + (n == 1 ? '' : n)]"></div>
                    <div class="ck_btn" @click="more" ref="more">展开详情 +</div>
                </div>
                </transition>
            </template>
            <!-- </transition> -->
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
                currentView: 0,
                tab_top: false,
                tab_tit: ['详情描述', '报名相关', '赛程安排']
            }
        },
        computed: {
            dom_head(){
                //return this.prefs.header.$refs.header;
            },
            head_h(){
                // let header = document.defaultView.getComputedStyle(this.dom_head, null)
                // return parseInt(header.height);
            }
        },
        created() {
            //获取大项目数据
            mk.http('/name/Projectshow/',{
                id: this.pid
            },(response) => {
                this.$set(this,'pro_data',response.data)
                this.currentView = 1;
                if (response.data.id == 14) {
                    this.$set(this,'tab_tit', ['详情描述', '报名相关', '公司介绍']);
                }
            })
        },
        methods: {
            more(event){
                let t = event.currentTarget;
                let content = t.previousElementSibling;
                let content_max_h = document.defaultView.getComputedStyle(content, null).getPropertyValue('max-height');
                if (content_max_h == 'none') {
                    content.style.maxHeight = '8rem';
                    t.innerHTML = '展开详情 +'
                }else{
                    content.style.maxHeight = 'none';
                    t.innerHTML = '收起详情 -'
                }
            },
            scroll(){
                // if(document.body.scrollTop >= this.$refs.tab.offsetTop - this.head_h) {
                if(document.body.scrollTop > this.$refs.tab.offsetTop) {
                    this.$set(this, 'tab_top', true)
                }else{
                    this.$set(this, 'tab_top', false)
                }
            },
            afterEnter(el){
                let more = this.$refs.more[0];
                if (more) {
                    let prev = document.defaultView.getComputedStyle(more.previousElementSibling, null);
                    if (parseInt(prev.height) >= parseInt(prev.getPropertyValue('max-height'))) {
                        more.style.display = 'block';
                    }
                }
                // let more = this.$refs.more;
                // let parent_h = document.defaultView.getComputedStyle(more.parentNode, null).getPropertyValue('max-height');
                // let prev_h = document.defaultView.getComputedStyle(more.previousElementSibling, null).height;
                // if (parseInt(prev_h) < parseInt(parent_h)) {
                //     more.style.display = 'none';
                // }
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
    .ck_box_content {
        max-height: 8rem;
        overflow: hidden;
        position: relative;
    }
    .ck_btn {
        width: 2.4rem;
        height: .6rem;
        line-height: .6rem;
        text-align: center;
        border: 1px solid #dcdcdc;
        color: #6679a3;
        margin: .2rem auto;
        font-size: .28rem;
        display: none;
    }
    .content .fade-leave-active {
        display: none;
    }
</style>