<template>
    <div class="partake">
        <template v-if="data.uid >= 0">
            <my-view v-if="data.uid == 0" v-bind:pdata="data"></my-view>
            <other-view v-else v-bind:pdata="data"></other-view>
        </template>
            <div class="weui-mask fc" v-if="fc" @click="fc = false"></div>
    </div>
</template>

<script>
    import my from './partake_my.vue';
    import other from './partake_other.vue';

    export default {
        name: 'partake',
        data(){
            return {
                data: {},
                fc: false//众筹完成提示弹出层
            }
        },
        computed: Vuex.mapState({
            ...Vuex.mapState([
            ]),
        }),
        components: {
            'my-view' : my,
            'other-view' : other,
        },
        created(){
            //获取小项目数据
            mk.http('/name/Partakeshow',{
                id: this.$route.params.id
            },(response) => {
                this.$set(this, 'data', response.data)
                if (this.data.status == 1) {
                    this.fc = true;
                }
            })
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../css/mk.scss';
    .fc {
        background: url(../img/fc.png) rgba(0,0,0,.5) no-repeat center 5rem / 4rem;
        z-index: 999999;
    }
</style>