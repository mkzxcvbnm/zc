<template>
    <div class="index">
        <header-view></header-view>
        <banner-view></banner-view>
        <list-view></list-view>
        <footer-view></footer-view>
    </div>
</template>

<script>
    import header from '../public/header.vue';
    import footer from '../public/footer.vue';
    import banner from './banner.vue';
    import list from './index_list.vue';

    export default {
        name: 'index',
        data: function () {
            return {
            }
        },
        components : {
            'header-view' : header,
            'footer-view' : footer,
            'banner-view' : banner,
            'list-view' : list,
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss">
</style>