<template>
    <div class="partake_my upper_spacing upper_lower">
        <header-view :title="data.title"></header-view>
        <div class="partake_top">
            <div class="weui-cells weui-cells_checkbox">
                <label class="weui-cell weui-check__label" :for="'s'+index" @click="diymesspush(data.describe)">
                    <div class="weui-cell__bd">
                        <p>{{data.describe}}</p>
                    </div>
                    <div class="weui-cell__hd">
                        <input type="radio" class="weui-check" name="radio" :id="'s'+index" checked="checked">
                        <i class="weui-icon-checked"></i>
                    </div>
                </label>
            </div>
            <div class="weui-cells weui-cells_checkbox" v-for="(item, index) in recollections">
                <label class="weui-cell weui-check__label" :for="'s'+index" @click="diymesspush(item)">
                    <div class="weui-cell__bd">
                        <p>{{item}}</p>
                    </div>
                    <div class="weui-cell__hd">
                        <input type="radio" class="weui-check" name="radio" :id="'s'+index">
                        <i class="weui-icon-checked"></i>
                    </div>
                </label>
            </div>
            <div class="weui-cells weui-cells_checkbox">
                <label class="weui-cell weui-check__label" for="s3" @click="dialogOc=true">
                    <div class="weui-cell__bd">
                        <p>自己写点什么</p>
                    </div>
                    <div class="weui-cell__hd">
                        <input type="radio" class="weui-check" name="radio" id="s3">
                        <i class="weui-icon-checked"></i>
                    </div>
                </label>
            </div>
        </div>
        <partake-content-view :pdata="data" v-if="data.id"></partake-content-view>
        <div class="partake_my_prompt center f">赶紧找小伙伴们帮你付款吧！</div>
        <div class="line"></div>
        <div class="bbtn bbtn2 translate-hidden" v-if="data.id">
            <a href="javascript:;" class="weui-btn weui-btn_primary" v-if="data.status == 0" @click="fx = true">找人帮我筹</a>
            <router-link :to="{ name: 'partake_my_pay', params: { id: data.id, title: data.title } }" class="weui-btn weui-btn_default" v-if="data.status == 0">自己支持</router-link>
            <a href="javascript:;" class="weui-btn weui-btn_warn" v-if="data.status == 1">众筹完成</a>
            <a href="javascript:;" class="weui-btn weui-btn_warn" v-if="data.status == 2">众筹失败</a>
        </div>
        <dialog-view @text="text" :dialogOc="dialogOc"></dialog-view>
        <transition name="fade">
        <div class="weui-mask fx" v-if="fx" @click="fx = false"></div>
        </transition>
    </div>
</template>

<script>
    let moment = require('moment');
    import dialog from './dialog.vue';
    import partake_content from './partake_content.vue';

    export default {
        name: 'partake_my',
        props: ['pdata'],//小项目数据
        data(){
            return {
                data: this.pdata,//大项目数据
                params: {
                    id: this.$route.params.id,//小项目id
                    diymess: '',//参与感言
                },//提交接口数据
                recollections: [],//参与感言
                dialogOc: false,//修改信息弹窗开关
                fx: false,//找人帮我筹分享弹出层开关
            }
        },
        components: {
            'dialog-view': dialog,
            'partake-content-view': partake_content,
        },
        created() {
            //获取参与感言
            mk.http('http://qingshang.fankeweb.cn/index.php/api/index/name/Config/cname/recollections/',{
            },(response) => {
                this.$set(this,'recollections',response.data)
            })
        },
        methods: {
            ...vuex.mapActions([
                'mask',
                'toast',
                'loadingToast',
            ]),
            push(){
                this.loadingToast([true])
                //修改信息
                mk.http('http://qingshang.fankeweb.cn/index.php/api/index/name/Partakeadd/',
                this.params,
                (response) => {
                    this.loadingToast([false])
                    if (response.data[0].status === 0) {
                        this.toast([true, , response.data[0].mess, () => {
                            this.$router.go(0)
                        }])
                    }else{
                        this.toast([false, , response.data[0].mess])
                    }
                },
                (response) => {
                    this.loadingToast([false])
                    this.toast([false, , response])
                })
            },
            diymesspush(text){
                this.params.diymess = text;
                this.push();
            },
            text(text){
                if (text != undefined) {
                    this.params.diymess = text;
                    this.push();
                }
                this.dialogOc = false
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
    .partake_my_prompt {
        line-height: .68rem;
        color: #999;
    }
    .fx {
        background: url(../img/fx.png) rgba(0,0,0,.5) no-repeat right top;
    }
</style>