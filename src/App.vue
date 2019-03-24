<template>
 <div>
   <router-view></router-view>
   <FooterGuide v-show="$route.meta.isShow"/>
 </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  import {reqSessionUserInfo} from './Api'
  export default {

    name: 'App',
    components: {
      FooterGuide
    },
    async mounted () {
      const result = await reqSessionUserInfo()
      const user = result.data
      if(user){
        this.$store.dispatch('saveUser',user)

      }
    }
  }
</script>

<style>

</style>
