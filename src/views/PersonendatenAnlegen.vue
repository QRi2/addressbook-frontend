<template>
  <div class="complete">
    <Header/>
    <div>
      <h2>Personendaten - Anlegen</h2><br>
    </div>
    <div class="table">
      <PersonendatenTableNew/>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import PersonendatenTableNew from '../components/PersonendatenTableNew'

export default {
  components: { Header, PersonendatenTableNew }
}
</script>

<style scoped>

</style>
