<template>
    <div class="index upper_lower_spacing">
        <header-view></header-view>
        <banner-view></banner-view>
        <list-view></list-view>
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
    }
</script>

<style lang="scss" rel="stylesheet/scss">
</style>