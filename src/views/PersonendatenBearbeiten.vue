<template>
  <div class="complete">
    <Header filterBar="false"/>
    <div>
      <h2>PersonenDaten - Bearbeiten</h2><br>
    </div>
    <div class="table">
      <PersonendatenTableEdit :personIndex="this.id"/>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import PersonendatenTableEdit from '../components/PersonendatenTableEdit'

export default {
  components: { Header, PersonendatenTableEdit },
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
