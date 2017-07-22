<template>
    <div class="payment upper_spacing">
        <div class="project_top f">
            <div class="project_img">
                <img :src="data.pic" v-if="data.pic !='http://api.qstubu.com'">
                <p class="ellipsis">{{data.title}}</p>
            </div>
            <div class="project_money" v-if="data.expenses">
                <span class="payment_color">费用</span> {{data.expenses}}
            </div>
            <div class="payment_top">
                <div class="fl">
                    <span class="payment_color">赛事总指挥</span>：{{data.commander}}
                </div>
                <div class="fl">
                    <span class="payment_color">客服电话</span>：{{data.tel}}
                </div>
            </div>
        </div>
        <div class="payment_group">
            <h2 class="payment_tit">活动背景</h2>
            <div class="payment_background">
                {{data.background}}
            </div>
        </div>
        <div class="payment_group">
            <h2 class="payment_tit">赛事简介</h2>
            <div class="payment_describe" v-html="data.describe"></div>
        </div>
        <div class="payment_group">
            <h2 class="payment_tit">付款方式</h2>
            <div class="payment_describe" v-html="data.terms"></div>
        </div>
        <div class="payment_list">
            <dl :class="{ 'active': list_active == n }"  v-for="n in list_tit.length">
                <dt @click="active(n)">{{list_tit[n-1]}}<span class="fr">更多></span></dt>
                <dd ref="dd" v-html="data['content'+n]"></dd>
            </dl>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'payment',
        data(){
            return {
                data: {},
                currentView: 1,
                list_tit: ['指导思想', '赛事形式', '报名相关', '竞赛规则', '赛事行程', '装备要求', '合作媒体'],
                list_active: 0
            }
        },
        computed: Vuex.mapState({
            ...Vuex.mapState([
                'userinfo'
            ]),
        }),
        components: {
        },
        watch: {
            data(){
                document.title = this.data.title;
            }
        },
        created(){
            mk.http('/name/Payment/',{
                id: this.$route.params.id
            },(response) => {
                this.$set(this,'data',response.data)
                mk.showMenuItems({
                    title: response.data.title,
                    desc: response.data.describe,
                    imgUrl: response.data.pic,
                });
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
            active(n){
                if (this.list_active > 0) {
                    this.$refs.dd[this.list_active-1].style.height = 0;
                }
                if (this.list_active == n) {
                    this.list_active = 0;
                }else{
                    this.list_active = n;
                    let dd = this.$refs.dd[n-1];
                    let pd = parseInt(document.defaultView.getComputedStyle(dd, null).getPropertyValue('padding-left')) * 2;
                    dd.style.height = dd.scrollHeight + pd +'px';
                }
            }
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../css/mk.scss';
    .project_img {
        position: relative;
        min-height: .64rem;
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
    .payment {
        font-family: Tahoma,arial,'Hiragino Sans GB','microsoft yahei',\5b8b\4f53;
        font-size: .28rem;
    }
    .payment_color {
        color: #FB6E00;
    }
    .payment_top {
        padding: .27rem .3rem;
        font-size: .28rem;
        overflow: hidden;
        line-height: 1.5;
        .fl {
            min-width: 50%;
        }
    }
    .payment_group {
        padding: .3rem;
        margin-top: .3rem;
        background-color: #fff;
        line-height: 1.4;
        .payment_tit {
            @extend .payment_color;
            font-size: .36rem;
            font-weight: normal;
            margin-bottom: .05rem;
        }
        .payment_background {
            color: #bbbaba;
        }
    }
    .payment_list {
        margin-top: .3rem;
        background-color: #fff;
        dl.active {
            dt {
                background-color: #FB6E00;
                color: #fff;
            }
            dd {
                padding: .3rem;
            }
        }
        dt {
            height: .7rem;
            line-height: .7rem;
            @extend .payment_color;
            padding: 0 .3rem;
        }
        dd {
            height: 0;
            transition: all .5s;
            padding: 0 .3rem;
            overflow: hidden;
        }
    }
</style>