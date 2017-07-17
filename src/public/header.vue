<template>
    <div class="header" ref="header">
        <a v-if="!back_show" @click="back" class="back" href="javascript:;"><i class="fa fa-angle-left"></i></a>
        <span class="ellipsis">{{this.tit}}</span>
    </div>
</template>

<script>
    export default {
        name: 'header',
        props: ['title', 'modeback'],
        data(){
            return {
                back_show: this.$route.path == '/' || this.$route.path == '/index'
            }
        },
        computed: Vuex.mapState({
            ...Vuex.mapState([
                'isback'
            ]),
            tit: function () {
                return this.title || '中国青商联盟'
            },
            mode_back(){
                return this.modeback;
            }
        }),
        methods: {
            ...Vuex.mapMutations([
                'ISBACK'
            ]),
            back(){
                if (this.mode_back) {
                    this.$emit('modeclose')
                }else{
                    this.ISBACK(true)
                    this.$router.go(-1)
                }
            }
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .header {
        height: .78rem;
        line-height: .78rem;
        font-size: .36rem;
        color: #000;
        text-align: center;
        background: #fff;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        width: 100%;
        z-index: 999;
        span {
            display: block;
            padding: 0 1rem;
            height: 100%;
        }
    }
    .back {
        font-size: .72rem;
        color: #333;
        position: absolute;
        left: 0 ;
        top: 0;
        padding: 0 .4rem;
        i {
            vertical-align: top;
        }
    }
</style>