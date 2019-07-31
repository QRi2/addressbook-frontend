<template>
  <div>
    <Header/>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  components: { Header }
}
</script>

<style lang="scss">

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    float: left;
    margin-left: 20px;
  }

  .btn {
    margin-right: 5px;
  }

  .complete {
    margin-left: 20px;
  }
</style>
