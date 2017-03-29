<template>
    <div id="banner" class="banner">
        <swiper :options="swiperOption">
            <swiper-slide v-for="slide in swiperSlides" :key="slide">
                <div class="contain" :style="{ backgroundImage: 'url('+slide.litpic+')' }"></div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {
        name: 'banner',
        data(){
            return {
                swiperOption: {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    loop: true,
                    observer: true,
                    autoplay: 5000,
                },
                swiperSlides: []
            }
        },
        components: {
            swiper,
            swiperSlide,
        },
        mounted(){
            this.$nextTick(() => {
                mk.http('http://qingshang.fankeweb.cn/index.php/api/index/name/banner',{
                },(response) => {
                    this.swiperSlides = response.data;
                })
            });
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .banner {
        height: 3.2rem;
        margin-bottom: .2rem;
        background: #fff;
    }
    .swiper-container,.banner .contain {
        height: 100%;
    }
</style>