<template>
  <div class="complete">
    <div>
      <table width="47.5%">
        <tr>
          <th>
            <h2>Personendaten - Detail</h2>
          </th>
          <th>
            <div class="buttons">
              <b-button variant="info" router-link to="/">
                Home
              </b-button>
              <b-button variant="warning" @click="edit()">
                Eintrag bearbeiten
              </b-button>
              <b-button variant="danger" @click="deleteThisItem()">
                Eintrag löschen
              </b-button>
            </div>
          </th>
        </tr>
      </table>
      <br>
    </div>
    <PersonendatenTableDetail :personIndex="id"></PersonendatenTableDetail>
  </div>
</template>

<script>
import PersonendatenTableDetail from '../components/PersonendatenTableDetail'

export default {
  components: { PersonendatenTableDetail },
  created () {
    this.id = this.$route.params.id.toString()
  },
  data () {
    return {
      id: ''
    }
  },
  methods: {
    edit () {
      this.$router.push('/personendatenBearbeiten/' + this.id)
    },
    deleteThisItem () {
      fetch('http://localhost:8080/addressbook/addresses/' + this.id, {
        method: 'delete'
      })
        .then((response) => {
          return response.json()
        })
        .then((jsonData) => {
          this.items = jsonData.valueOf()
          this.$router.push('/')
        })
    }
  }
}
</script>
<style>
</style>
