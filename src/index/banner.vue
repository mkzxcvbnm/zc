<template>
    <div id="banner" class="banner">
        <swiper :options="swiperOption">
            <swiper-slide v-for="slide in swiperSlides" :key="slide.id">
                <a :href="slide.url"><div class="cover" :style="{ backgroundImage: 'url('+slide.litpic+')' }"></div></a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper';

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
                swiperSlides: mk.getDbJson('swiperSlides') || [] //优先缓存
            }
        },
        components: {
            swiper,
            swiperSlide,
        },
        created(){
            mk.http('/name/banner',{
            },(response) => {
                if (!response.data.length) {
                    localStorage.removeItem('swiperSlides');
                    this.$set(this, 'swiperSlides', ['']);
                    return;
                }
                this.$set(this, 'swiperSlides', response.data);
                mk.setDbJson('swiperSlides', response.data);//缓存
            })
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .banner {
        height: 3.2rem;
        margin-bottom: .2rem;
        background: #fff;
    }
    .swiper-container,.banner .cover {
        height: 100%;
    }
</style>