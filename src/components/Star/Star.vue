<template>
  <div :class="`star star-${size}`">
    <span class="star-item" v-for="(s,index) in star" :class="s"></span>
  </div>
</template>

<script>
const STAT_ON = 'on'
const STAT_HALF = 'half'
const STAT_OFF = 'off'
  export default {

    props: {
      rating: Number,
      size: Number
    },
    computed: {
      star () {
        const {rating} = this
        const starArr =  []
        const starInteger = Math.floor(rating)
        const starDecimals = rating - starInteger
        for (let i=0; i<starInteger; i++){
          starArr.push(STAT_ON)
        }
        if(starDecimals * 10 >= 5 ){
          starArr.push(STAT_HALF)
        }else if(starArr.length < 5){
          starArr.push(STAT_OFF)
        }
        return starArr
      }
    },
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')
</style>
