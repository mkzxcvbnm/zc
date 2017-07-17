<template>
    <div class="index_list">
        <div class="tab">
            <ul>
                <li :class="[{ active: currentView == 'project'}]" @click="CURRENTVIEW('project')">最新项目</li>
                <li :class="[{ active: currentView == 'partake'}]" @click="CURRENTVIEW('partake')">梦想清单</li>
            </ul>
        </div>
        <list-slide class="list center">
            <li v-if="currentView == 'project' && item.id" v-for="(item, index) in project.data.length?project.data:project.localStorage" :key="item.id" :data-index="index%project.params.limit"><router-link :to="{ name: 'project', params: { id: item.id } }">
                <div class="img contain" :style="{backgroundImage: 'url('+item.litpic+')'}"></div>
                <h3>
                    <span class="fl">{{item.title}}</span>
                    <span class="time">
                        <i class="fa fa-clock-o"></i>{{item.start_time}}
                        <template v-if="item.status == 2">
                            <a @click="sign(item.id)" href="javascript:;" class="project_btn weui-btn weui-btn_mini weui-btn_primary" v-if="!item.partake">我要报名</a>
                            <router-link :to="{ name: 'partake', params: { id: item.partake } }" class="project_btn weui-btn weui-btn_mini weui-btn_primary" v-else>我的众筹</router-link>
                        </template>
                    </span>
                </h3>
                <!-- <p><span class="time"><i class="fa fa-clock-o"></i>{{item.updatetime}}</span><span class="money">¥ {{item.money}}</span></p> -->
            </router-link></li>
            <li v-if="currentView == 'partake' && item.id" v-for="(item, index) in partake.data.length?partake.data:partake.localStorage" :key="item.id" :data-index="index%partake.params.limit"><router-link :to="{ name: 'partake', params: { id: item.id } }">
                <img class="list2_img_big" :src="item.portrait">
                <div class="list2_r">
                    <h2>{{item.nickname}}<span class="time"><i class="fa fa-clock-o"></i>{{item.time}}</span></h2>
                    <h3>{{item.title}}</h3>
                    <p class="ellipsis">{{item.describe}}</p>
                </div>
                <dl>
                    <dd v-for="upic in item.unum_litpic"><img :src="upic"></dd>
                </dl>
                <span class="unum">已有{{item.unum}}人参与</span>
            </router-link></li>
            <div class="weui-loadmore" v-if="this[currentView].loading" key="load">
                <i class="weui-loading"></i>
                <span class="weui-loadmore__tips">正在加载</span>
            </div>
            <div class="weui-loadmore weui-loadmore_line" v-if="this[currentView].loading === 0" key="nomore">
                <span class="weui-loadmore__tips">暂无数据</span>
            </div>
        </list-slide>
    </div>
</template>

<script>
    export default {
        name: 'index_list',
        data(){
            return {
                project: {//最新项目
                    data: [],//列表队列
                    localStorage: mk.getDbJson('project_list'), //缓存
                    params: {//发送数据
                        pages: 1,//获取页数
                        limit: 20,//每页数据长度
                    },
                    loading: true//读取状态
                },
                partake: {//梦想清单
                    data: [],
                    localStorage: mk.getDbJson('partake_list'), //缓存
                    params: {
                        pages: 1,
                        limit: 20,
                    },
                    loading: true
                },
                debounced: _.debounce(this.getlist, 1500),//防止短时间内多次调用接口
            }
        },
        computed: Vuex.mapState({
            ...Vuex.mapState([
                'userinfo',
                'currentView'
            ]),
        }),
        methods: {
            ...Vuex.mapActions([
                'mask',
                'toast',
                'loadingToast',
                'iosDialog1',
                'dialog'
            ]),
            ...Vuex.mapMutations([
                'CURRENTVIEW'
            ]),
            getlist(type){
                mk.http('/name/'+type+'',
                this[type].params,
                (response) => {
                    if (response.data.length) {
                        for(let v of response.data){
                            if (v.time) v.time = moment(v.time*1000).format('YYYY/MM/DD');
                            if (v.start_time) v.start_time = moment(v.start_time*1000).format('YYYY/MM/DD');
                            this[type].data.push(v);//渲染
                        }
                        mk.setDbJson(type+'_list', this[type].data);//缓存
                        this.$set(this[type], 'loading', false);//准备渲染关闭loading
                        this.$set(this[type].params, 'pages', this[type].params.pages + 1);//页数+1
                    };
                    if (response.data.length < this[type].params.limit) {//数据不足
                        this.$set(this[type], 'loading', 0);
                        if (this[type].params.pages == 1) {
                            //如果第一页一条数据都没有就不显示 并清空缓存
                            localStorage.removeItem(type+'_list');
                            this.$set(this[type], 'data', ['']);
                        }
                    }
                })
            },
            scroll(){
                let scrollTop = document.body.scrollTop;
                if(scrollTop + window.innerHeight >= document.body.clientHeight - 1000) {//滚到底部
                    if (this[this.currentView].loading === false) {//非loading状态
                        this.$set(this[this.currentView], 'loading', true);//显示loading
                        this.debounced(this.currentView)//获取当前激活选项卡对应的数据
                    }
                }
            },
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
            sign(id){
                if (!this.userinfo.tel || !this.userinfo.uname) {
                    this.verify();
                    return;
                }
                mk.http('/name/Partakeadd/',{
                    id: id
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
        },
        created(){
            this.getlist('project');//最新项目
            this.getlist('partake');//梦想清单
            window.addEventListener('scroll', this.scroll);
        },
        beforeDestroy(){
            window.removeEventListener('scroll', this.scroll);
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../css/mk.scss';
    .index_list {
        padding: .32rem 0;
        background: #fff;
    }
    .tab {
        width: 5.4rem;
        margin: 0 auto .4rem;
        border: .01rem solid $green;
        padding: 1px;
        border-radius: .4rem;
        ul {
            @include flex(space-between);
            li {
                width: 2.83rem;
                height: .76rem;
                line-height: .76rem;
                font-size: .32rem;
                text-align: center;
                border-radius: .38rem;
                &.active {
                    background: $green;
                    color: #fff;
                }
            }
        }
    }
    .list {
        li {
            padding-bottom: .3rem;
            border-bottom: 1px solid #ddd;
            margin-bottom: .2rem;
            @include clearfix;
        }
        .img {
            width: 6.9rem;
            height: 3.22rem;
        }
        h3 {
            font-size: .28rem;
            font-weight: normal;
            margin-top: .1rem;
            overflow: hidden;
            line-height: .3rem;
                line-height: .48rem;
            .fl {
                width: 5rem;
            }
            .time {
                float: right;
            }
        }
        p {
            line-height: 24px;
            color: #999;
        }
        .time {
            color: #999;
            font-size: .2rem;
            font-weight: normal;
            i {
                padding-right: .1rem;
            }
        }
        .money {
            float: right;
            color: $green;
            font-size: .32rem;
        }
        .list2_img_big {
            width: 1.2rem;
            height: 1.2rem;
            float: left;
            border-radius: 50%;
            border: .03rem solid #f1f1f1;
        }
        h2 {
            font-size: .32rem;
            border-bottom: 1px solid #f1f1f1;
            line-height: .64rem;
            font-weight: normal;
            .time {
                float: right;
            }
        }
        .list2_r {
            margin-left: 1.45rem;
            padding-bottom: .2rem;
            h3,p {
                width: 4.2rem;
            }
            h3 {
                @include ellipsis(2);
                margin: .2rem 0 .1rem;
                line-height: 1.4;
            }
        }
        dl {
            @include clearfix;
            float: left;
            dd {
                float: left;
                margin-left: -.2rem;
                &:first-child {
                    margin-left: 0;
                }
                img {
                    width: .65rem;
                    height: .65rem;
                    border-radius: 50%;
                    border: .03rem solid #fff;
                }
            }
        }
        .unum {
            float: right;
            font-size: .2rem;
            color: #666;
            line-height: .65rem;
        }
        .project_btn {
            display: block;
            font-size: .24rem!important;
            padding: 0 .1rem;
            border-radius: 5px!important;
        }
    }
</style>