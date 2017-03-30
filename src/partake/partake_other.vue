<template>
    <div class="partake_other upper_spacing upper_lower">
        <header-view ref="header" :title="data.title" @modeclose="closepay" :modeback="partake_pay_op"></header-view>
        <transition name="translateY">
        <div v-if="!partake_pay_op">
            <div class="partake_top">
                <div class="weui-cells weui-cells_checkbox">
                    <label class="weui-cell weui-check__label" :for="'s'+index">
                        <div class="weui-cell__bd">
                            <p>{{data.describe}}</p>
                        </div>
                    </label>
                </div>
            </div>
            <partake-content-view :pdata="data" v-if="data.id"></partake-content-view>
            <div class="partake_project_content">
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell weui-cell_switch">
                        <div class="weui-cell__bd">活动详情介绍</div>
                        <div class="weui-cell__ft">
                            <input class="weui-switch" type="checkbox" v-model="ppc">
                        </div>
                    </div>
                </div>
                <transition name="fade">
                <project-content-view v-show="ppc" :pid="data.id" v-if="data.id" :prefs="$refs"></project-content-view>
                </transition>
            </div>
            <transition name="fade">
            <message-view v-if="data.id" :pdata="data"></message-view>
            </transition>
            <div class="bbtn bbtn2 translate-hidden" v-if="data.id">
                <a href="javascript:;" class="weui-btn weui-btn_primary" @click="partake_pay_op = true">给他支持</a>
                <!-- <router-link :to="{ name: 'partake_pay', params: { id: data.id } }" class="weui-btn weui-btn_primary">给他支持</router-link> -->
                <router-link :to="{ name: 'project', params: { id: data.id } }" class="weui-btn weui-btn_default" v-if="data.id">我也要玩</router-link>
            </div>
        </div>
        <partake-pay-view :pdata="data" @close="closepay" v-if="partake_pay_op"></partake-pay-view>
        </transition>
    </div>
</template>

<script>
    import partake_content from './partake_content.vue';
    import project_content from '../project/project_content.vue';
    import partake_pay from './partake_pay.vue';
    import message from './message.vue';

    export default {
        name: 'partake_other',
        props: ['pdata'],//小项目数据
        data(){
            return {
                data: this.pdata,
                params: {//提交接口数据
                    id: this.$route.params.id,
                    diymess: ''
                },
                partake_pay_op: false,//给他支持
                ppc: true,//活动详情介绍开关
            }
        },
        components: {
            'partake-content-view': partake_content,
            'project-content-view' : project_content,
            'partake-pay-view' : partake_pay,
            'message-view' : message,
        },
        created() {
        },
        methods: {
            closepay(){
                this.partake_pay_op = false
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../css/mk.scss';
    .partake_top {
        background: #3ebad7;
        color: #fff;
        padding: .2rem 0 1rem;
        .weui-cells {
            background: transparent;
            margin-top: 0;
            &:after,&:before {
                display: none;
            }
        }
        .weui-cell__bd p {
            width: 4.8rem;
            font-size: .28rem;
            line-height: .4rem;
        }
        .weui-check__label {
            -webkit-tap-highlight-color: transparent;
        }
        .weui-check__label:active {
            background-color: transparent;
        }
        .weui-cells_checkbox .weui-icon-checked:before {
            color: #fff;
        }
    }
</style>