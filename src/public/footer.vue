<template>
    <div class="footer weui-tabbar">
        <a href="javascript:;" class="weui-tabbar__item weui-bar__item_on">
            <span style="display: inline-block;position: relative;">
                <div class="ficon contain weui-tabbar__icon"></div>
                <!-- <span class="weui-badge" style="position: absolute;top: -2px;right: -13px;">8</span> -->
            </span>
            <p class="weui-tabbar__label">首页</p>
        </a>
        <a href="javascript:;" class="weui-tabbar__item">
            <span style="display: inline-block;position: relative;">
                <div class="ficon contain weui-tabbar__icon"></div>
            </span>
            <p class="weui-tabbar__label">消息</p>
        </a>
        <a href="javascript:;" class="weui-tabbar__item">
            <span style="display: inline-block;position: relative;">
                <div class="ficon contain weui-tabbar__icon"></div>
            </span>
            <p class="weui-tabbar__label">关注</p>
        </a>
        <a href="javascript:;" class="weui-tabbar__item">
            <span style="display: inline-block;position: relative;">
                <div class="ficon contain weui-tabbar__icon"></div>
                <span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>
            </span>
            <p class="weui-tabbar__label">订单</p>
        </a>
        <a href="javascript:;" class="weui-tabbar__item">
            <span style="display: inline-block;position: relative;">
                <div class="ficon contain weui-tabbar__icon"></div>
            </span>
            <p class="weui-tabbar__label">我的</p>
        </a>
    </div>
</template>

<script>
    export default {
        name: 'footer',
        data: function () {
            return {
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../css/mk.scss';
    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        z-index: 999;
        height: 1rem;
        background: #f7f7f7;
        border-top: 1px solid #b2b2b2;
        font-size: .2rem;
        .ficon {
            width: .5rem;
            height: .5rem;
        }
        @for $i from 1 through 5 {
            a:nth-child(#{$i}) {
                .ficon {
                    background-image: url(../img/ficon#{$i}.png);
                }
                &:hover,&.active,&.weui-bar__item_on {
                    .ficon {
                        background-image: url(../img/ficon#{$i}_h.png);
                    }
                    .weui-tabbar__label {
                        color: $green;
                    }
                }
            }
        }
    }
</style>