<template>
    <div class="project upper_spacing upper_lower">
        <!-- <header-view :title="data.title" ref="header"></header-view> -->
        <div class="project_top f">
            <div class="project_img">
                <img :src="data.litpic">
                <p class="ellipsis">{{data.describe}}</p>
            </div>
            <div class="project_money" v-if="data.money">
                梦想基金{{data.money}}
            </div>
        </div>
        <project-content-view :pid="data.id" v-if="data.id" :prefs="$refs"></project-content-view>
        <div class="bbtn translate-hidden">
            <a href="javascript:;" class="weui-btn weui-btn_warn" v-if="data.status == 1">活动未开始</a>
            <template v-if="data.status == 2">
                <a @click="sign" href="javascript:;" class="weui-btn weui-btn_primary" v-if="!data.partake">我要报名</a>
                <router-link :to="{ name: 'partake', params: { id: data.partake } }" class="weui-btn weui-btn_primary" v-else>我的众筹</router-link>
            </template>
            <template v-if="data.status == 3">
                <template v-if="data.partake">
                    <router-link :to="{ name: 'partake', params: { id: data.partake } }" class="weui-btn weui-btn_primary" v-if="data.ptkstatus == 1">报名成功</router-link>
                    <router-link :to="{ name: 'partake_my_pay', params: { id: data.partake, title: data.title } }" class="weui-btn weui-btn_primary" v-else>立即支付</router-link>
                </template>
                <a @click="pay" href="javascript:;" class="weui-btn weui-btn_primary" v-else>立即支付</a>
            </template>
            <a href="javascript:;" class="weui-btn weui-btn_warn" v-if="data.status == 4">活动结束</a>
        </div>
        <rbtn-view></rbtn-view>
    </div>
</template>

<script>
    import project_content from './project_content.vue';
    import rbtn from '../public/rbtn.vue';

    export default {
        name: 'project',
        data(){
            return {
                data: {},
                currentView: 1
            }
        },
        computed: Vuex.mapState({
            ...Vuex.mapState([
                'userinfo'
            ]),
        }),
        components: {
            'project-content-view' : project_content,
            'rbtn-view' : rbtn,
        },
        watch: {
            data(){
                document.title = this.data.title;
            }
        },
        created(){
            mk.http('/name/Projectshow/',{
                id: this.$route.params.id
            },(response) => {
                this.$set(this,'data',response.data)
                mk.showMenuItems({
                    title: response.data.title,
                    desc: response.data.describe,
                    imgUrl: response.data.litpic,
                });//显示分享按钮
            })
        },
        methods: {
            ...Vuex.mapActions([
                'mask',
                'toast',
                'loadingToast',
                'iosDialog1',
                'dialog'
            ]),
            verify(){
                if (!this.userinfo.tel && !this.userinfo.uname) {
                    this.iosDialog1([true, '提示', '未验证姓名和手机号的用户无法报名，点击确认前往验证页面', () => {
                        this.$router.push({ name: 'person'})
                    }])
                    return;
                }
                if (!this.userinfo.tel) {
                    this.iosDialog1([true, '提示', '未验证手机号的用户无法报名，点击确认前往验证页面', () => {
                        this.$router.push({ name: 'bind_phone', params: { type: 'project'}})
                    }])
                    return;
                }
                if (!this.userinfo.uname) {
                    this.iosDialog1([true, '提示', '未验证姓名的用户无法报名，点击确认前往验证页面', () => {
                        this.$router.push({ name: 'change_uname', params: { type: 'project'}})
                    }])
                    return;
                }
            },
            sign(){
                if (!this.userinfo.tel || !this.userinfo.uname) {
                    this.verify();
                    return;
                }
                // if (!this.userinfo.tel) {
                //     this.iosDialog1([true, '提示', '未验证手机号的用户无法报名，点击确认前往验证页面', () => {
                //         this.$router.push({ name: 'bind_phone', params: { type: 'project', tid: this.data.id }})
                //     }])
                //     return;
                // }
                mk.http('/name/Partakeadd/',{
                    id: this.$route.params.id
                },
                (response) => {
                    if (response.data[0].status === 0) {
                        this.toast([true, , '您已成功报名', () => {
                            this.$router.push({ name: 'partake', params: { id: response.data[0].id }})
                        }])
                    }else{
                        this.dialog([true, response.data[0].mess])
                    }
                },
                (response) => {
                    this.dialog([true, response])
                })
            },
            pay(){
                if (!this.userinfo.tel || !this.userinfo.uname) {
                    this.verify();
                    return;
                }
                // if (!this.userinfo.tel) {
                //     this.iosDialog1([true, '提示', '未验证手机号的用户无法报名，点击确认前往验证页面', () => {
                //         this.$router.push({ name: 'bind_phone', params: { type: 'project_order', tid: this.data.id }})
                //     }])
                //     return;
                // }
                this.$router.push({ name: 'project_order', params: { id: this.data.id }})
            }
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
</style>