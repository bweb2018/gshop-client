<template>
 <div>
   <router-view></router-view>
   <FooterGuide></FooterGuide>
 </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  import {reqAddress,reqCategorys,reqShops} from './Api'
  export default {

    name: 'App',
    components: {
      FooterGuide
    },
   async mounted () {
      console.log(111)
      const result = await reqAddress(40.10038,116.36867)
      console.log(result)
    }
  }
</script>

<style>

</style>
