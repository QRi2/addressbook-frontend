<template>
  <div class="complete">
    <Header filterBar="false"/>
    <div class="personendaten">
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
  components: { Header, PersonendatenTableNew },
  props: {
    tableIndex: null
  },
  data () {
    return {
      id: null
    }
  },
  mounted () {
    this.index = this.tableIndex
  },
  methods: {
    speichern () {

    }
  }
}
</script>

<style scoped>
  .personendaten {
    margin-left: 20px;
  }
</style>
