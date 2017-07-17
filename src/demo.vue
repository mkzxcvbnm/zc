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
        computed: Vuex.mapState({
            ...Vuex.mapState([
            ]),
            ...Vuex.mapGetters([
            ]),
        }),
        components: {
        },
        watch: {
        },
        methods: {
            ...Vuex.mapMutations([
            ]),
            ...Vuex.mapActions([
            ]),
        },
        beforeCreate(){
        },
        created(){
        },
        beforeMount(){
        },
        mounted(){
            this.$nextTick(() => {
            });
        },
        beforeUpdate(){
        },
        updated(){
        },
        beforeDestroy(){
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    //@import '../css/mk.scss';
</style>