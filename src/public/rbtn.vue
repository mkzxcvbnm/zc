<template>
        <div class="rbtn translate-hidden">
            <router-link :to="{ path: '/index'}" class="rbtn1"><img src="../img/rbtn1.png"></router-link>
            <transition name="fade">
                <a v-if="rbtn_show" class="rbtn2" href="javascript:;" @click="top"><img src="../img/rbtn2.png"></a>
            </transition>
        </div>
</template>

<script>
    export default {
        name: 'rbtn',
        data(){
            return {
                rbtn_show: false,
                debounced: _.debounce(this.scroll, 200),//防止短时间内调用多次
            }
        },
        methods: {
            scroll(){
                if(document.body.scrollTop > 0) {
                    this.$set(this, 'rbtn_show', true);//显示
                }else{
                    this.$set(this, 'rbtn_show', false);//隐藏
                }
            },
            top(){
                Velocity(document.getElementsByTagName('html'), "scroll", {
                    duration: 400,
                    mobileHA: false
                });
            },
        },
        mounted(){
            window.addEventListener('scroll', this.debounced);
        },
        beforeDestroy(){
            window.removeEventListener('scroll', this.debounced);
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .rbtn {
        position: fixed;
        right: .28rem;
        bottom: 1.05rem;
        z-index: 1001;
        a {
            display: block;
        }
        img {
            display: block;
            width: 1rem;
            height: 1rem;
            margin: .2rem 0;
        }
    }
</style>