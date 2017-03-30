<template>
    <div class="partake">
        <template v-if="data.uid >= 0">
            <my-view v-if="userinfo.id == data.uid" v-bind:pdata="data"></my-view>
            <other-view v-if="userinfo.id != data.uid" v-bind:pdata="data"></other-view>
        </template>
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
            }
        },
        computed: vuex.mapState({
            ...vuex.mapState([
                'userinfo'//个人信息
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
                response.data.uid = mk.random();
                this.$set(this,'data',response.data)
            })
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../css/mk.scss';
</style>