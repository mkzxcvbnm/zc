<template>
    <div class="clock">
        <div class="clock_head">
            <a href="javascript:;" @click="popup=true"><i class="fa fa-question-circle"></i>打卡疑问解答</a>
            <div class="popup" :style="{display: popup?'block':'none'}">
                <a href="javascript:;" @click="popup=false">关闭</a>
                <h1>-你可能想知道-</h1>
                <h2>1.什么样的计步截图才算合格？</h2>
                <p>计步运动截图上需带有清晰有效的运动日期、时间、10000步以上的计步，建议以带有个人头像的微信运动截图；</p>
                <h2>2.打卡上传不了图片怎么办？</h2>
                <p>可关闭打卡页面，重新点开或刷新尝试。</p>
                <h2>3.21天打卡挑战是否可以第二天打卡？</h2>
                <p>活动期间，需当天运动当天打卡，打卡截至时间为每天的24:00.</p>
                <h2>4.作弊情况的处理？</h2>
                <p>活动结束后，工作人员将会对所有参与队员进行打卡审核，如发现作弊情况，扣除团队100积分。</p>
                <div>活动期间疑问可咨询<br/>蓝精灵微信号：anttyyjj23</div>
            </div>
            <p>您已成功的打卡<span> {{params.count}} </span>天</p>
            <vue-core-image-upload
                :text="''"
                inputOfFile="pic"
                :class="params.pic?['uploader']:['uploader','npic']"
                :crop="false"
                @imageuploading="imageuploading"
                @imageuploaded="imageuploaded"
                @errorHandle="errorHandle"
                :max-file-size="524288000"
                url="http://api.qstubu.com/index.php/api/index/name/File"
                extensions="png,gif,jpeg,jpg,svg"
                inputAccept="image/gif,image/jpeg,image/jpg,image/png,image/svg" >
                <img :src="params.pic" />
            </vue-core-image-upload>
            <p>{{params.pic?'点击图片更换':'上传步数凭证'}}</p>
        </div>
        <div class="clock_content">
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">今日步数</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="input" v-model="params.step" @input="onInput(params.step)" placeholder="请输入你的步数">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="input" v-model="params.uname" placeholder="请输入你的姓名">
                    </div>
                </div>
            </div>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" href="javascript:" id="showTooltips" @click="clock">{{isclock?'修改今日打卡':'提交今日打卡'}}</a>
            </div>
            
        </div>
    </div>
</template>

<script>
    import VueCoreImageUpload from 'vue-core-image-upload';
    export default {
        name: 'clock',
        data(){
            return {
                popup: false,
                isclock: false,
                params: {
                    step: '',//步数
                    uname: '',//姓名
                    pic: '',//图片
                    params: ''
                }
            }
        },
        components: {
            'vue-core-image-upload': VueCoreImageUpload,
        },
        methods: {
            ...Vuex.mapActions([
                'mask',
                'toast',
                'loadingToast',
                'dialog'
            ]),
            onInput(v){
                if(typeof v == 'string') {
                    this.$set(this.params,'step',v.replace(/\D/g,''));
                }
                if (v[0] == 0 & v.length >= 2) {
                    this.$set(this.params,'step', v.replace(/^0/,''));
                }
            },
            imageuploading() {
                this.loadingToast([true, '上传中...']);
            },
            imageuploaded(res) {
                this.loadingToast([false]);
                this.$set(this.params,'pic', res.result.fileurl)
            },
            errorHandle(err) {
                this.loadingToast([false]);
                this.dialog([true, '上传失败'+err])
            },
            clock(){
                if (this.params.pic == '') {
                    this.dialog([true, '请上传图片']);
                    return;
                }
                if (this.params.step == '') {
                    this.dialog([true, '请输入步数']);
                    return;
                }
                if (this.params.uname == '') {
                    this.dialog([true, '请输入姓名']);
                    return;
                }
                this.mask(true);
                mk.http('/name/Dk',
                this.params,
                (response) => {
                    if(response.data.name){
                        this.$set(this.params, 'count', response.data.count);
                        this.dialog([true, '今日打卡已成功，请明日再来，如信息提交错误，可以重复提交。']);
                        this.$set(this, 'isclock', true);
                    }else{
                        this.dialog([true, '提交信息失败,请联系管理员'])
                    }
                    this.mask(false);
                },(response) => {
                    this.dialog([true, response.status])
                    this.mask(false);
                })
            }
        },
        created() {
            document.title = '打卡';
            //获取当天打卡记录
            mk.http('/name/Dk',{
            },(response) => {
                if (response.data.pic) {
                    this.$set(this, 'isclock', true);
                    this.$set(this, 'params', response.data);
                }
            });
            //显示分享按钮
            mk.showMenuItems({
                title: '徒步呼伦贝尔大草原，挑战万步打卡',
                desc: '坚持是一种态度，优秀是一种习惯',
                imgUrl: window.location.protocol + '//' + window.location.host + '/' + require('../img/clock.jpg'),
            });
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .clock_head {
        background: #37be37;
        font-size: .3rem;
        text-align: center;
        padding: .1rem;
        a {
            float: right;
            color: #fff;
            font-size: .28rem;
            i {
                margin-right: .1rem;
                font-size: .32rem;
            }
        }
        p {
            clear: both;
            padding: .2rem 0 .8rem;
            span {
                color: #ff6a1d;
            }
        }
    }
    .weui-cells {
        margin-top: 0;
    }
    .uploader {
        position: relative;
        margin: 0 auto;
        width: 3.2rem;
        &.npic {
            height: 3.2rem;
            border: 1px dashed #fff;
            &:after,&:before {
                content: '';
                background: #fff;
                border-radius: .1rem;
                position: absolute;
                top: 50%;
                left: 50%;
            }
            &:after {
                width: 1rem;
                height: .25rem;
                margin-left: -.5rem;
                margin-top: -.125rem;
            }
            &:before {
                width: .25rem;
                height: 1rem;
                margin-left: -.125rem;
                margin-top: -.5rem;
            }
        }
    }
    .popup {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 999999;
        width: 100%;
        height: 100%;
        background: #37be37;
        color: #fff;
        padding: .4rem;
        overflow-x: hidden;
        a {
            position: absolute;
            right: .1rem;
            top: .1rem;
            font-size: .4rem;
        }
        p {
            padding: .1rem 0 .4rem .3rem;
            line-height: 1.4;
            font-size: .28rem;
            text-align: left;
            border-bottom: 1px solid #fff;
        }
        h1 {
            line-height: 1.4;
            font-size: .4rem;
            margin: 0;

        }
        h2 {
            text-align: left;
            font-size: .32rem;
            line-height: 2;
        }
        div {
            line-height: 1.4;
            font-size: .32rem;
        }
    }
</style>