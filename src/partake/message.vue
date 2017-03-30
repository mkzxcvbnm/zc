<template>
    <div class="message f">
        <div class="message_num center">
            <p>已有{{pdata.unum}}人支持</p>
            <div class="line row_l row_r"></div>
        </div>
        <transition-group name="fade" class="message_list">
            <div v-for="(item, index) in data" class="weui-media-box weui-media-box_appmsg" :key="item">
                <img class="weui-media-box__thumb" :src="item.portrait">
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title"><div class="ellipsis">{{item.nickname}}</div><div>付款<span class="green">{{item.money}}元</span></div></h4>
                    <p class="weui-media-box__desc">{{item.content}}</p>
                    <div class="message_bottom">
                        <span>{{item.time}}</span>
                        <a href="javascript:;" @click="hf(item.id)">回复</a>
                    </div>
                    <div class="reply" v-for="(hf, index) in item.huifu">
                        <h2>{{hf.nickname}}</h2>
                        <p>{{hf.content}}</p>
                    </div>
                </div>
            </div>
        </transition-group>
        <div class="weui-loadmore" v-if="loading">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">正在加载</span>
        </div>
        <div class="weui-loadmore weui-loadmore_line" v-if="loading === 0">
            <span class="weui-loadmore__tips">暂无数据</span>
        </div>
        <dialog-view @text="text" :dialogOc="dialogOc"></dialog-view>
    </div>
</template>

<script>
    import dialog from './dialog.vue';
    export default {
        name: 'message',
        props: ['pdata'],
        data(){
            return {
                data: [],//列表队列
                params: {//发送数据
                    pid: this.pdata.id,
                    pages: 1,
                    limit: 5,
                },
                params2: {//留言发送数据
                    pid: this.pdata.id,
                    cid: '',//留言ID
                    content: '',//留言内容

                },
                loading: true,//读取状态
                dialogOc: false,//留言弹窗开关
            }
        },
        computed: vuex.mapState({
            ...vuex.mapState([
                'userinfo'//个人信息
            ]),
            ...vuex.mapGetters([
            ]),
        }),
        components: {
            'dialog-view': dialog,
        },
        watch: {
        },
        methods: {
            ...vuex.mapMutations([
            ]),
            ...vuex.mapActions([
                'mask',
                'toast',
                'loadingToast',
            ]),
            hf(id){
                this.$set(this.params2, 'cid', id);
                this.$set(this, 'dialogOc', true);
            },
            text(text){
                if (text != undefined) {
                    this.$set(this.params2, 'content', text);
                    this.push(text);
                }
                this.$set(this, 'dialogOc', false);
            },
            push(text){
                this.loadingToast([true])
                //修改信息
                mk.http('/name/Comment/',
                this.params2,
                (response) => {
                    this.loadingToast([false])
                    if (response.data.status === 0) {
                        this.toast([true, , response.data.mess, () => {
                            //不刷新添加新回复
                            for (let v of this.data) {
                                if (v.id == this.params2.cid) {
                                    v.huifu.push({
                                        content: text,
                                        nickname: this.userinfo.nickname,
                                    });
                                    return;
                                }
                            }
                        }])
                    }else{
                        this.toast([false, , response.data.mess])
                    }
                },
                (response) => {
                    this.loadingToast([false])
                    this.toast([false, , response])
                })
            },
        },
        beforeCreate(){
        },
        created(){
            let getlist = () => {
                //获取留言列表
                mk.http('/name/Commentlist/',
                this.params,
                (response) => {
                    if (!response.data.length){//没有数据了
                        this.loading = 0;
                        return;
                    }
                    for(let v of response.data){
                        this.data.push(v);//渲染
                    }
                    this.$set(this, 'loading', false);//准备渲染关闭loading
                    this.$set(this.params, 'pages', this.params.pages + 1);//页数+1
                })
            }

            let debounced = _.debounce(getlist, 1500);
            debounced();//获取数据
            
            window.addEventListener('scroll', () => {
                let scrollTop = document.body.scrollTop;
                if(scrollTop + window.innerHeight >= document.body.clientHeight) {//滚到底部
                    if (this.loading === false) {//非loading状态
                        this.$set(this, 'loading', true);//显示loading
                        debounced()//获取数据
                    }
                }
            });
        },
        beforeMount(){
        },
        mounted(){
            this.$nextTick(() => {
            });
        },
        beforeUpdate(){
        },
        updated(){
        },
        beforeDestroy(){
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../css/mk.scss';
    .message_num {
        p {
            padding-bottom: .2rem;
        }
    }
    .message {
        font-size: .32rem;
        overflow: hidden;
        .weui-media-box__title {
            font-size: .32rem;
            padding-bottom: .1rem;
            .ellipsis {
                width: 3rem;
            }
        }
        .weui-media-box__thumb {
            width: 1rem;
            height: 1rem;
            margin-right: .4rem;
            border: 1px solid #e5e5e5;
            align-self: flex-start;
        }
        .weui-media-box__desc {
            font-size: .32rem;
            color: #666;
        }
        .message_bottom,.weui-media-box__title {
            @include flex(space-between);
        }
        .message_bottom {
            padding-top: .3rem;
            span {
                color: #999;
                font-size: .24rem;
            }
            a {
                font-size: .28rem;
            }
        }
    }
    .reply {
        padding: .1rem .25rem;
        h2 {
            border-left: 6px solid $green;
            height: .34rem;
            font-size: .32rem;
            padding-left: .15rem;
            margin-bottom: .2rem;
            font-weight: normal;
        }
        p {
            font-size: .28rem;
            line-height: 1.4;
        }
    }
</style>