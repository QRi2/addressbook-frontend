<template>
  <div class="complete">
    <Header filterBar="true"/>
    <div class="title">
      <h2>Alle Personendaten</h2><br>
    </div>
    <div class="table">
      <b-table
        hover
        :items="items"
        :fields="fields">
        <template slot="id" slot-scope="data">
          {{ data.item.id }}
        </template>
        <template slot="details" slot-scope="data">
          <b-button variant="info" size="sm" @click="details(data.item.id)">
            Details
          </b-button>
        </template>
        <template slot="bearbeiten" slot-scope="data">
          <b-button variant="warning" size="sm" @click="edit(data.item.id)">
            <img src="@/assets/edit.png" height="20" width="19"/>
          </b-button>
        </template>
        <template slot="löschen" slot-scope="data">
          <b-button variant="danger" size="sm" @click="deleteThisEntry(data.item.id)">
            <img src="@/assets/trash.png" height="20" width="18"/>
          </b-button>
        </template>
      </b-table>
    </div>
    <div class="buttons">
      <b-button variant="success" router-link :to="`/personendatenAnlegen`">
        + Neu Anlegen
      </b-button>
      <b-button variant="danger" @click="deleteAllEntrys">
        Alles löschen
      </b-button>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'

export default {
  name: 'home',
  components: { Header },
  data () {
    return {
      fields: ['id', 'vorname', 'name', 'details', 'bearbeiten', 'löschen'],
      items: [],
      id_s: []
    }
  },
  mounted: function () {
    fetch('http://localhost:8080/addressbook/addresses', {
      method: 'get'
    })
      .then((response) => {
        return response.json()
      })
      .then((jsonData) => {
        this.items = jsonData.valueOf()
      })
  },
  methods: {
    deleteAllEntrys () {
      fetch('http://localhost:8080/addressbook/addresses', {
        method: 'delete'
      })
        .then((response) => {
          return response.json()
        })
        .then((jsonData) => {
          this.items = jsonData.valueOf()
        })
    },
    details (id) {
      this.$router.push('/personendatenDetail/' + id)
    },
    edit (id) {
      this.$router.push('/personendatenBearbeiten/' + id)
    },
    deleteThisEntry (id) {
      fetch('http://localhost:8080/addressbook/addresses/' + id, {
        method: 'delete'
      })
        .then((response) => {
          return response.json()
        })
        .then((jsonData) => {
          this.items = jsonData.valueOf()
        })
    },
    filtersearch: function (text) {
      fetch('http://localhost:8080/addressbook/address?' + text, {
        method: 'get'
      })
        .then((response) => {
          return response.json()
        })
        .then((jsonData) => {
          this.items = jsonData.valueOf()
          console.log(this.items)
        })
    }
  }
}

</script>

<style scoped>
  .home {
    margin-left: 20px;
  }

  .table {
    color: black;
    width: 60%;
  }
</style>
