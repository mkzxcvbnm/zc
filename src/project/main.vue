<template>
    <div class="project upper_spacing upper_lower">
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
        <project-content-view :pdata="data" v-if="data.id"></project-content-view>
        <div class="bbtn translate-hidden">
            <a href="javascript:;" class="weui-btn weui-btn_warn" v-if="data.status == 1">活动未开始</a>
            <template v-if="data.status == 2">
                <a @click="sign" href="javascript:;" class="weui-btn weui-btn_primary" v-if="!data.Partake">我要报名</a>
                <router-link :to="{ name: 'partake', params: { id: data.Partake } }" class="weui-btn weui-btn_primary" v-else>查看详情</router-link>
            </template>
            <router-link :to="{ name: 'project_order', params: { id: data.id } }" class="weui-btn weui-btn_primary" v-if="data.status == 3">立即支付</router-link>
            <a href="javascript:;" class="weui-btn weui-btn_warn" v-if="data.status == 4">活动结束</a>
        </div>
    </div>
</template>

<script>
    import project_content from './project_content.vue';

    export default {
        name: 'project',
        data(){
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
        components: {
            'project-content-view' : project_content,
        },
        created(){
            mk.http('http://qingshang.fankeweb.cn/index.php/api/index/name/Projectshow/',{
                id: this.$route.params.id
            },(response) => {
                response.data[0].status = 2;
                response.data[0].Partake = 0;
                this.$set(this,'data',response.data[0])
            })
        },
        methods: {
            ...vuex.mapActions([
                'mask',
                'toast',
                'loadingToast',
            ]),
            sign(){
                this.loadingToast([true])
                mk.http('http://qingshang.fankeweb.cn/index.php/api/index/name/Partakeadd/',{
                    id: this.$route.params.id
                },
                (response) => {
                    this.loadingToast([false])
                    if (response.data[0].status === 0) {
                        this.toast([true, , response.data[0].mess, () => {
                            this.$router.push({ name: 'partake', params: { id: response.data[0].id }})
                        }])
                    }else{
                        this.toast([false, , response.data[0].mess])
                    }
                },
                (response) => {
                    this.loadingToast([false])
                    this.toast([false, , response])
                })
            }
        }
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