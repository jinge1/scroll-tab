<template>
  <div id="app">
    <router-view></router-view>
    <DemoMenu :isShow="isShow"></DemoMenu>
  </div>
</template>
<script>
import DemoMenu from './components/DemoMenu'
export default {
  components: {
    DemoMenu
  },
  data(){
    return {
      isShow: false
    }
  }
}
</script>
<style lang="postcss">
#app .router-link-active{
  color: blue;
}
</style>

