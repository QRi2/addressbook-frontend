<template>
  <div class="complete">
    <Header filterBar="false"/>
    <div>
      <h2>Personendaten - Detail</h2><br>
    </div>
    <div class="table">
      <PersonendatenTableDetail :personIndex="id"></PersonendatenTableDetail>
    </div>
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
  </div>
</template>

<script>
import Header from '../components/Header'
import PersonendatenTableDetail from '../components/PersonendatenTableDetail'

export default {
  components: { Header, PersonendatenTableDetail },
  created () {
    this.id = this.$route.params.id.toString()
  },
  data () {
    return {
      id: ''
    }
  },
  methods: {
    edit (id) {
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
