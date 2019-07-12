<template>
  <div class="complete">
    <Header filterBar="true"/>
    <div class="title">
      <table width="47.5%">
        <tr>
          <th>
            <h2>Alle Personendaten</h2>
          </th>
          <th align="right">
            <div class="buttons">
              <b-button variant="success" router-link :to="`/personendatenAnlegen`">
                + Neu Anlegen
              </b-button>
              <b-button variant="danger" @click="showMsgBoxTwo">
                Alles löschen
              </b-button>
            </div>
        </th>
        </tr>
      </table>
    <br>
    </div>
    <div class="filter">
      <b-form-input class="filter" v-model="filterText" placeholder="Filtersuche" v-on:keyup.enter="filtersearch" v-on:keyup="checkIfFilterIsEmpty"/>
    </div><br>
    <div class="table">
      <b-table
        hover
        :borderless="true"
        :items="items"
        :fields="fields">
        <template slot="id" slot-scope="data">
          {{ data.item.id }}
        </template>
        <template slot=" " slot-scope="data">
          <b-button  v-b-tooltip.hover title="Details" variant="info" size="sm" @click="details(data.item.id)">
            <img src="@/assets/lupe.png" height="20" width="19"/>
          </b-button>
          <b-button v-b-tooltip.hover title="Bearbeiten" variant="warning" size="sm" @click="edit(data.item.id)">
            <img src="@/assets/edit.png" height="20" width="19"/>
          </b-button>
          <b-button v-b-tooltip.hover title="Löschen" variant="danger" size="sm" @click="deleteThisEntry(data.item.id)">
            <img src="@/assets/trash.png" height="20" width="18"/>
          </b-button>
        </template>
      </b-table>
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
      fields: ['id', 'vorname', 'name', ' '],
      items: [],
      filterText: ''
    }
  },
  created: function () {
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
    showMsgBoxTwo () {
      this.boxTwo = ''
      this.$bvModal.msgBoxConfirm('Wirklich alle Daten löschen?', {
        title: 'Alle Daten löschen',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'JA',
        cancelTitle: 'NEIN',
        footerClass: 'p-2',
        hideHeaderClose: true,
        centered: true
      })
        .then(value => {
          if (value) {
            this.deleteAllEntrys()
          }
        })
    },
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
    checkIfFilterIsEmpty () {
      if (this.filterText === '') {
        this.filtersearch()
      }
    },
    filtersearch: function () {
      console.log(this.filterText)
      fetch('http://localhost:8080/addressbook/address?' + this.filterText, {
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
    width: 70%;
  }

  .filter{
    width: 720px;
  }
</style>
