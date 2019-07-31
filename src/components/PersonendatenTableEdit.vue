<template>
  <div>
    <table class="table">
      <tr>
        <th class="firstColumn">
          Vorname
        </th>
        <th>
          <b-form-input v-model="textVorname" :placeholder=getTextVorname></b-form-input>
        </th>
      </tr>
      <tr>
        <th>
          Name
        </th>
        <th v-if="items.name">
          <b-form-input v-model="textName" :placeholder=items.name></b-form-input>
        </th>
        <th v-else>
          <b-form-input v-model="textName" placeholder="Name"></b-form-input>
        </th>
      </tr>
      <tr>
        <th>
          Straße
        </th>
        <th >
          <b-form-input v-model="textStrasse" :placeholder=getTextStrasse></b-form-input>
        </th>
      </tr>
      <tr>
        <th width="20%">
          Postleitzahl
        </th>
        <th v-if="items.adressdaten && items.adressdaten.postleitzahl">
          <b-form-input v-model="textPostleitzahl"
                        :placeholder=items.adressdaten.postleitzahl.toString()></b-form-input>
        </th>
        <th v-else>
          <b-form-input v-model="textPostleitzahl" placeholder="Postleitzahl"></b-form-input>
        </th>
      </tr>
      <tr>
        <th>
          Stadt
        </th>
        <th v-if="items.adressdaten && items.adressdaten.stadt">
          <b-form-input v-model="textStadt" :placeholder=items.adressdaten.stadt></b-form-input>
        </th>
        <th v-else>
          <b-form-input v-model="textStadt" placeholder="Stadt"></b-form-input>
        </th>
      </tr>
      <tr>
        <th>
          Land
        </th>
        <th v-if="items.adressdaten && items.adressdaten.land">
          <b-form-input v-model="textLand" :placeholder=items.adressdaten.land></b-form-input>
        </th>
        <th v-else>
          <b-form-input v-model="textLand" placeholder="Land"></b-form-input>
        </th>
      </tr>
      <tr>
        <th>
          Email
        </th>
        <th v-if="items.mail">
          <b-form-input v-model="textEmail" :placeholder=items.mail>hans_wurs@wasweißich.de</b-form-input>
        </th>
        <th v-else>
          <b-form-input v-model="textEmail" placeholder="Email"></b-form-input>
        </th>
      </tr>
      <tr>
        <th>
          Telefon
        </th>
        <th v-if="items.telefonnummer">
          <b-form-input v-model="textTelefon" :placeholder="items.telefonnummer"></b-form-input>
        </th>
        <th v-else>
          <b-form-input v-model="textTelefon" placeholder="Telefon"></b-form-input>
        </th>
      </tr>
    </table>
    <table class="buttonTable">
      <tr>
        <th>
          <b-button block variant="success" @click="speichern()">
            speichern
          </b-button>
        </th>
        <th>
          <b-button block variant="danger" @click="abbrechen()">
            abbrechen
          </b-button>
        </th>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'EditTable',
  data () {
    return {
      id: String,
      items: [],
      textVorname: '',
      textName: '',
      textStrasse: '',
      textPostleitzahl: '',
      textStadt: '',
      textLand: '',
      textEmail: '',
      textTelefon: '',
      adressdaten: false
    }
  },
  computed: {
    getTextVorname: function () {
      return this.items.vorname ? this.items.vorname : 'Vorname'
    },
    getTextStrasse: function () {
      return this.items.adressdaten && this.items.adressdaten.strasse ? this.items.adressdaten.strasse : 'Straße'
    }
  },
  created: function () {
    if (this.$route.params.id) {
      this.id = this.$route.params.id.toString()
      fetch('http://localhost:8080/addressbook/addresses/' + this.id, {
        method: 'get'
      })
        .then((response) => {
          return response.json()
        })
        .then((jsonData) => {
          this.items = jsonData.valueOf()
        })
    }
  },
  methods: {
    speichern () {
      if (this.textVorname === '') {
        if (this.items.vorname) {
          this.textVorname = this.items.vorname
        } else {
          this.textVorname = null
        }
      }
      if (this.textName === '') {
        if (this.items.name) {
          this.textName = this.items.name
        } else {
          this.textName = null
        }
      }
      if (this.textEmail === '') {
        if (this.items.mail) {
          this.textEmail = this.items.mail
        } else {
          this.textEmail = null
        }
      }
      if (this.textTelefon === '') {
        if (this.items.telefonnummer) {
          this.textTelefon = this.items.telefonnummer
        } else {
          this.textTelefon = null
        }
      }
      if (this.textStrasse || this.textPostleitzahl || this.textStadt || this.textLand || this.items.adressdaten) {
        this.adressdaten = true
        if (this.textStrasse === '') {
          if (this.items.adressdaten && this.items.adressdaten.strasse) {
            this.textStrasse = this.items.adressdaten.strasse
          } else {
            this.textStrasse = null
          }
        }
        if (this.textPostleitzahl === '') {
          if (this.items.adressdaten && this.items.adressdaten.postleitzahl) {
            this.textPostleitzahl = this.items.adressdaten.postleitzahl
          } else {
            this.textPostleitzahl = null
          }
        }
        if (this.textStadt === '') {
          if (this.items.adressdaten && this.items.adressdaten.stadt) {
            this.textStadt = this.items.adressdaten.stadt
          } else {
            this.textStadt = null
          }
        }
        if (this.textLand === '') {
          if (this.items.adressdaten && this.items.adressdaten.land) {
            this.textLand = this.items.adressdaten.land
          } else {
            this.textLand = null
          }
        }
      } else {
        this.adressdaten = false
      }

      if (this.adressdaten) {
        this.$http.put('http://localhost:8080/addressbook/addresses/' + this.id, {
          name: this.textName,
          vorname: this.textVorname,
          mail: this.textEmail,
          telefonnummer: this.textTelefon,
          adressdaten: {
            strasse: this.textStrasse,
            postleitzahl: this.textPostleitzahl,
            stadt: this.textStadt,
            land: this.textLand

          }
        })
          .then((response) => {
            return response.json()
          })
          .then((jsonData) => {
            this.items = jsonData.valueOf()
          })
      } else {
        this.$http.put('http://localhost:8080/addressbook/addresses/' + this.id, {
          name: this.textName,
          vorname: this.textVorname,
          mail: this.textEmail,
          telefonnummer: this.textTelefon,
          adressdaten: null
        })
          .then((response) => {
            return response.json()
          })
          .then((jsonData) => {
            this.items = jsonData.valueOf()
          })
      }

      this.$router.push('/personendatenDetail/' + this.id)
    },
    abbrechen () {
      this.$router.push('/personendatenDetail/' + this.id)
    }
  }
}
</script>

<style scoped>
  .form-control {
    width: 100%;
  }

  .firstColumn {
    width: 20%;
  }

  .table {
    width: 42.5%;
  }

  .buttonTable {
    width: 42.5%;
    margin-top: -15px;
  }
</style>
