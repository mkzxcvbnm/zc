<template>
    <div class="index upper_lower_spacing">
        <!-- <header-view></header-view> -->
        <draggable-view>
            <template slot="draggable">
                <banner-view></banner-view>
                <list-view></list-view>
            </template>
        </draggable-view>
        <footer-view></footer-view>
    </div>
</template>

<script>
    import banner from './banner.vue';
    import list from './index_list.vue';

    export default {
        name: 'index',
        components: {
            'banner-view' : banner,
            'list-view' : list,
        },
        methods: {
            ...Vuex.mapMutations([
                'SCROLL'
            ]),
        },
        created(){
            document.title = '中国青商联盟';
            //获取分享参数
            mk.http('/name/Config/cname/share',{
            },(response) => {
                mk.showMenuItems({
                    title: response.data.hometitle,
                    desc: response.data.homedesc,
                    imgUrl: response.data.homepic,
                });//显示分享按钮
            })
        },
        beforeRouteLeave(to, from, next){
            this.SCROLL(document.body.scrollTop)
            next()
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss">
</style>