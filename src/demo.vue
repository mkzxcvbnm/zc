<template>
    <div class="demo">
    </div>
</template>

<script>
    export default {
        name: 'demo',
        props: [],
        data(){
            return {
            }
        },
        computed: vuex.mapState({
            ...vuex.mapState([
            ]),
            ...vuex.mapGetters([
            ]),
        }),
        watch: {
        },
        methods: {
            ...vuex.mapMutations([
            ]),
            ...vuex.mapActions([
            ]),
        },
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
        },
        mounted(){
            this.$nextTick(() => {
            });
        },
        beforeUpdate() {
        },
        updated(){
        },
        beforeDestroy() {
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    //@import '../css/mk.scss';
</style>