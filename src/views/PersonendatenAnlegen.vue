<template>
  <div class="complete">
    <div>
      <h2>Personendaten - Anlegen</h2><br>
    </div>
    <div class="table">
      <PersonendatenTableNew/>
    </div>
  </div>
</template>

<script>
import PersonendatenTableNew from '../components/PersonendatenTableNew'

export default {
  components: { PersonendatenTableNew }
}
</script>

<style scoped>

</style>
