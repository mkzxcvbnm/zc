<template>
    <div class="draggable-view">
        <slot name="draggable"></slot>
    </div>
    <!-- <div class="draggable-view"
        @mousedown="startDrag" @touchstart="startDrag"
        @mousemove="onDrag" @touchmove="onDrag"
        @mouseup="stopDrag" @touchend="stopDrag" @mouseleave="stopDrag">
        <div class="svg" :style="{height: this.c.y-this._w/2 + 'px','margin-bottom': this._h + 'px'}">
            <svg class="bg" :style="{height: this.c.y}">
                <path :d="headerPath" fill="#fff"></path>
            </svg>
        </div>
        <div class="draggable" :style="contentPosition">
            <slot name="draggable"></slot>
        </div>
        <div class="svg" :style="{height: this._h + 'px','margin-top': -this._h + 'px'}">
            <svg class="bg" :style="{height: this._w/2}">
                <path :d="headerPath" fill="#fff"></path>
            </svg>
        </div>
    </div> -->
</template>

<script>
    import dynamics from '../js/dynamics.min.js'
    export default {
        name: 'draggable',
        data() {
            return {
                dragging: false,
                c: { x: document.body.clientWidth/2, y: document.body.clientWidth/2 },
                start: { x: 0, y: 0 }
            }
        },
        computed: {
            _w() {
                return document.body.clientWidth
            },
            _h() {
                return (this._w/2 - this.c.y) / 2
            },
            headerPath() {
                return 'M0,0 L'+this._w+',0 '+this._w+','+this._w/2 +
                    'Q' + this.c.x + ',' + this.c.y +
                    ' 0,'+this._w/2
            },
            contentPosition() {
                return {
                    transform: 'translate3d(0,' + - this._h + 'px,0)'
                }
            }
        },
        methods: {
            startDrag(e) {
                e = e.changedTouches ? e.changedTouches[0] : e
                this.dragging = true
                this.start.x = e.pageX
                this.start.y = e.pageY
            },
            onDrag(e) {
                e = e.changedTouches ? e.changedTouches[0] : e
                if (this.dragging) {
                    this.c.x = this._w/2 + (e.pageX - this.start.x)
                    var dy = e.pageY - this.start.y
                    this.c.y = this._w/2 + dy / 4
                }
            },
            stopDrag() {
                if (this.dragging) {
                    this.dragging = false
                    dynamics.animate(this.c, {
                        x: this._w/2,
                        y: this._w/2
                    }, {
                        type: dynamics.spring,
                        duration: 700,
                        friction: 280
                    })
                }
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.draggable-view .svg {
    position: relative;
    overflow: hidden;
    .bg {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
    }
}
</style>