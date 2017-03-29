<template>
    <div class="project_content upper_lower">
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
                {{pro_data.content}}
            </div>
            <div v-if="currentView == 2" key="2">
                {{pro_data.content2}}
            </div>
            <div v-if="currentView == 3" key="3">
                {{pro_data.content3}}
            </div>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'project_content',
        props: ['pid'],
        data(){
            return {
                pro_data: {},
                currentView: 1
            }
        },
        computed: {
        },
        created() {
            //获取大项目数据
            mk.http('/name/Projectshow/',{
                id: this.pid
            },(response) => {
                this.$set(this,'pro_data',response.data[0])
            })
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    //@import '../css/mk.scss';
</style>