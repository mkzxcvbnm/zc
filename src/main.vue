<template>
    <div class="contianer">
        <router-view></router-view>
    </div>
</template>

<script>
    require('normalize.css/normalize.css');
    require('./css/reset.css');
    require('./css/mk.css');
    import mk from './js/mk.js';

    export default {
        name: 'contianer',
        data: function () {
            return {
            }
        },
        computed: vuex.mapState({
            count: state => state.count,
            countPlusLocalState (state) { 
            } 
        }),
        computed: {
            ...vuex.mapGetters([
            ])
        },
        methods: {
            ...vuex.mapMutations([
            ]),
            ...vuex.mapActions([
            ]),
        },
        created: function () {
            mk.rem();
        },
        mounted: function () {
            this.$nextTick(function () {
            })
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import './css/mk.scss';
</style>