<template>
    <div id="banner" class="banner swiper-container">
        <template v-for="item in banner_data">
        </template>
        <div class="swiper-wrapper">
            <template v-for="item in banner_data">
                <div class="swiper-slide contain" :style="{ backgroundImage: 'url('+item.litpic+')' }"></div>
            </template>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
        <!-- Add Arrows -->
        <!-- <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div> -->
    </div>
</template>

<script>
    import Swiper from '../js/swiper.min.js';
    import mk from '../js/mk.js';

    export default {
        name: 'banner',
        data(){
            return {
                banner_data: []
            }
        },
        updated(){
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                // nextButton: '.swiper-button-next',
                // prevButton: '.swiper-button-prev',
                paginationClickable: true,
                loop: true,
                observer: true,
                autoplay: 5000,
            });
        },
        mounted(){
            this.$nextTick(() => {
                mk.http('http://qingshang.fankeweb.cn/index.php/api/index/name/banner',{
                },(response) => {
                    this.banner_data = response.data;
                })
            });
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../css/swiper.min.css';
    .banner {
        height: 3.2rem;
        margin-bottom: .2rem;
        background: #fff;
    }
    .swiper-pagination-bullet-active {
        background: #fff;
    }
</style>