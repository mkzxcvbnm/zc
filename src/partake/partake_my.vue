<template>
    <div class="partake_my upper_spacing upper_lower">
        <!-- <header-view :title="data.title"></header-view> -->
        <div class="partake_top">
            <!-- <div class="weui-cells weui-cells_checkbox" v-if="current">
                <label class="weui-cell weui-check__label" for="current" >
                    <div class="weui-cell__bd">
                        <p>{{data.oneword}}</p>
                    </div>
                    <div class="weui-cell__hd">
                        <input type="radio" class="weui-check" name="radio" id="current" checked="checked" ref="current">
                        <i class="weui-icon-checked"></i>
                    </div>
                </label>
            </div> -->
            <div class="weui-cells weui-cells_checkbox" v-for="(item, index) in recollections">
                <label class="weui-cell weui-check__label" :for="'s'+index" @click="diymesspush(item)">
                    <div class="weui-cell__bd">
                        <p>{{item}}</p>
                    </div>
                    <div class="weui-cell__hd">
                        <input type="radio" class="weui-check" name="radio" :id="'s'+index" :checked="item == data.oneword?'checked':''">
                        <i class="weui-icon-checked"></i>
                    </div>
                </label>
            </div>
            <div class="weui-cells weui-cells_checkbox">
                <label class="weui-cell weui-check__label" for="my" @click="dialogOc=true">
                    <div class="weui-cell__bd">
                        <p>{{data.oneword?data.oneword:'自己写点什么'}}</p>
                    </div>
                    <div class="weui-cell__hd">
                        <input type="radio" class="weui-check" name="radio" id="my" :checked="current?'':'checked'">
                        <i class="weui-icon-checked"></i>
                    </div>
                </label>
            </div>
        </div>
        <partake-content-view :pdata="data" v-if="data.id"></partake-content-view>
        <div class="partake_my_prompt center f">赶紧找小伙伴们帮你付款吧！</div>
        <div class="line"></div>
        <transition name="fade">
        <message-view v-if="data.id" :pdata="data"></message-view>
        </transition>
        <div class="bbtn bbtn2 translate-hidden" v-if="data.status == 0">
            <a href="javascript:;" class="weui-btn weui-btn_primary" @click="fx_dialog">找人帮我筹</a>
            <a href="javascript:;" class="weui-btn weui-btn_default" @click="zf_ts">自己支付</a>
        </div>
        <div class="bbtn translate-hidden" v-if="data.status == 1">
            <a href="javascript:;" class="weui-btn weui-btn_warn">众筹完成</a>
        </div>
        <div class="bbtn bbtn2 translate-hidden" v-if="data.status == 2">
            <a href="javascript:;" class="weui-btn weui-btn_warn">众筹失败</a>
            <router-link :to="{ name: 'partake_my_pay', params: { id: data.id, title: data.title } }" class="weui-btn weui-btn_primary">自己支付</router-link>
        </div>
        <dialog-view @text="text" :dialogOc="dialogOc"></dialog-view>
        <transition name="fade">
        <div class="weui-mask fx" v-if="fx" @click="fx = false"></div>
        </transition>
        <rbtn-view></rbtn-view>
    </div>
</template>

<script>
    import dialog from './dialog.vue';
    import partake_content from './partake_content.vue';
    import message from './message.vue';
    import rbtn from '../public/rbtn.vue';

    export default {
        name: 'partake_my',
        props: ['pdata'],//小项目数据
        data(){
            return {
                data: this.pdata,
                params: {
                    id: this.$route.params.id,//小项目id
                    diymess: this.pdata.oneword,//参与感言
                },//提交接口数据
                //recollections: [],//参与感言
                dialogOc: false,//修改信息弹窗开关
                fx: false,//找人帮我筹分享弹出层开关
            }
        },
        computed: Vuex.mapState({
            ...Vuex.mapState([
                'userinfo'
            ]),
            recollections(){
                if (!this.data.recollections) {
                    return []
                }
                return this.data.recollections.split('|');
            },
            current(){
                if (this.recollections.indexOf(this.data.oneword) == -1) {
                    return false
                }else{
                    return true
                }
            },
        }),
        components: {
            'dialog-view': dialog,
            'partake-content-view': partake_content,
            'message-view' : message,
            'rbtn-view' : rbtn,
        },
        created(){
            document.title = this.data.title;
            //获取参与感言
            // mk.http('/name/Config/cname/recollections/',{
            // },(response) => {
            //     this.$set(this,'recollections',response.data)
            // })
            mk.showMenuItems({
                title: this.data.title,
                desc: this.userinfo.nickname + '发起的活动邀请您来支持',
                imgUrl: this.data.litpic,
            });//显示分享按钮
        },
        methods: {
            ...Vuex.mapActions([
                'mask',
                'toast',
                'loadingToast',
                'dialog',
            ]),
            push(text){
                //修改信息
                mk.http('/name/Partakeadd/',
                this.params,
                (response) => {
                    if (response.data[0].status === 0) {
                        this.toast([true, , response.data[0].mess, () => {
                            //不刷新修改信息
                            this.$set(this.data, 'oneword', text)
                            Velocity(document.getElementsByTagName('html'), "scroll", { duration: 400, mobileHA: false});
                        }])
                    }else{
                        this.dialog([true, response.data[0].mess])
                    }
                },
                (response) => {
                    this.dialog([true, response])
                })
            },
            diymesspush(text){
                if (this.params.diymess == text) {
                    return;
                }
                this.params.diymess = text;
                this.push(text);
            },
            text(text){
                if (text != undefined) {
                    this.params.diymess = text;
                    this.push(text);
                }
                this.dialogOc = false
            },
            fx_dialog(){
                this.dialog([true, '右上角你懂的，将TA发送给您的朋友']);
            },
            zf_ts(){
                mk.http('/name/Projectshow/',{
                    id: this.data.pid
                },(response) => {
                    this.dialog([true, '如果您众筹未完成，将在'+ moment(response.data.paystart_time*1000).format('MM月DD日') +'开启自己支付，请抓紧时间众筹吧！'])
                })
            }
        },
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
            font-size: .28rem;
            line-height: .4rem;
            word-wrap: break-word;
            word-break: break-all;
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
        & + .line {
            margin-bottom: .4rem;
        }
    }
    .fx {
        background: url(../img/fx.png) rgba(0,0,0,.5) no-repeat right top;
    }
</style>