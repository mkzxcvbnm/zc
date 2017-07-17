<template>
    <div class="message f">
        <div class="message_num center">
            <p>已有{{pdata.unum}}人支持</p>
            <div class="line row_l row_r"></div>
        </div>
        <transition-group name="fade" class="message_list">
            <div v-for="(item, index) in data" class="weui-media-box weui-media-box_appmsg" :key="item.id">
                <img class="weui-media-box__thumb" :src="item.portrait">
                <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title"><div class="ellipsis">{{item.nickname}}</div><div>付款<span class="green">{{item.money}}元</span></div></h4>
                    <p class="weui-media-box__desc">{{item.content}}</p>
                    <div class="message_bottom">
                        <span>{{distime(item.time)}}</span>
                        <a href="javascript:;" @click="hf(item)">回复</a>
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
                    limit: 10,
                },
                params2: {//留言发送数据
                    pid: this.pdata.id,
                    cid: '',//留言ID
                    content: '',//留言内容

                },
                loading: true,//读取状态
                dialogOc: false,//留言弹窗开关
                debounced: _.debounce(this.getlist, 1500),//防止短时间内多次调用接口
            }
        },
        computed: Vuex.mapState({
            ...Vuex.mapState([
                'userinfo'//个人信息
            ]),
        }),
        components: {
            'dialog-view': dialog,
        },
        methods: {
            ...Vuex.mapActions([
                'mask',
                'toast',
                'loadingToast',
                'dialog',
            ]),
            distime(item_time){
                let time = new Date().getTime()/1000 - item_time;
                if (time < 43200) {
                    return '刚刚发起'
                }else if(time < 86400){
                    return '1天内发起'
                }else if(time < 172800){
                    return '2天内发起'
                }else if(time < 259200){
                    return '3天内发起'
                }else{
                    return moment(item_time*1000).format('YYYY/MM/DD')
                }
            },
            hf(item){
                if (this.pdata.uid != 0) {
                    if (item.status == 0) {
                        this.dialog([true, '未支持不能回复']);
                        return;
                    }
                }
                this.$set(this.params2, 'cid', item.id);
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
                //修改信息
                mk.http('/name/Comment/',
                this.params2,
                (response) => {
                    if (response.data.status === 0) {
                        this.toast([true, , response.data.mess, () => {
                            //不刷新添加新回复
                            this.data.some((v, i) => {
                                if (v.id == this.params2.cid) {
                                    if (!v.huifu) {
                                        this.$set(this.data[i], 'huifu', [])
                                    }
                                    v.huifu.push({
                                        content: text,
                                        nickname: this.userinfo.nickname,
                                    });
                                    return true;
                                }
                            });
                        }])
                    }else{
                        this.dialog([true, response.data.mess])
                    }
                },
                (response) => {
                    this.dialog([true, response])
                })
            },
            getlist(){
                //获取留言列表
                mk.http('/name/Commentlist/',
                this.params,
                (response) => {
                    if (response.data.length) {
                        for(let v of response.data){
                            this.data.push(v);//渲染
                        }
                        this.$set(this, 'loading', false);//准备渲染关闭loading
                        this.$set(this.params, 'pages', this.params.pages + 1);//页数+1
                    }
                    if (response.data.length < this.params.limit) {//数据不足 或 没有数据
                        this.$set(this, 'loading', 0);
                    }
                })
            },
            scroll(){
                let scrollTop = document.body.scrollTop;
                if(scrollTop + window.innerHeight >= document.body.clientHeight - 1000) {//滚到底部
                    if (this.loading === false) {//非loading状态
                        this.$set(this, 'loading', true);//显示loading
                        this.debounced()//获取数据
                    }
                }
            }
        },
        mounted(){
            this.getlist();//获取数据
            window.addEventListener('scroll', this.scroll);
        },
        beforeDestroy(){
            window.removeEventListener('scroll', this.scroll);
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../css/mk.scss';
    .message_num {
        p {
            padding: .2rem 0;
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