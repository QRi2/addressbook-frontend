<template>
  <div class="complete">
    <div>
      <h2>PersonenDaten - Bearbeiten</h2><br>
    </div>
    <div class="table">
      <PersonendatenTableEdit :personIndex="this.id"/>
    </div>
  </div>
</template>

<script>
import PersonendatenTableEdit from '../components/PersonendatenTableEdit'

export default {
  components: { PersonendatenTableEdit },
  name: 'personendatenBearbeiten',
  props: {
    tableIndex: null
  },
  data () {
    return {
      id: null
    }
  },
  created () {
    this.id = this.$route.params.id.toString()
  }
}
</script>
<style scoped>

</style>
