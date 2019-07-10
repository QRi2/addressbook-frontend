<template>
  <div class="table">
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="danger"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p> {{ fehlerText }} </p>
    </b-alert>
    <table>
      <tr>
        <th>
          Vorname
        </th>
        <th>
          <b-form-input v-model="textVorname" placeholder="Vorname"></b-form-input>
        </th>
      </tr>
      <tr>
        <th>
          Name
        </th>
        <th>
          <b-form-input v-model="textName" placeholder="Name"></b-form-input>
        </th>
      </tr>
      <tr>
        <th>
          Straße
        </th>
        <th>
          <b-form-input v-model="textStrasse" placeholder="Straße"></b-form-input>
        </th>
      </tr>
      <tr>
        <th>
          Postleitzahl
        </th>
        <th>
          <b-form-input v-model="textPostleitzahl" placeholder="Postleitzahl"></b-form-input>
        </th>
      </tr>
      <tr>
        <th>
          Stadt
        </th>
        <th>
          <b-form-input v-model="textStadt" placeholder="Stadt"></b-form-input>
        </th>
      </tr>
      <tr>
        <th>
          Land
        </th>
        <th>
          <b-form-input v-model="textLand" placeholder="Land"></b-form-input>
        </th>
      </tr>
      <tr>
        <th>
          Email
        </th>
        <th>
          <b-form-input v-model="textEmail" placeholder="Email"></b-form-input>
        </th>
      </tr>
      <tr>
        <th>
          Telefon
        </th>
        <th>
          <b-form-input v-model="textTelefon" placeholder="Telefon"></b-form-input>
        </th>
      </tr>
    </table>
    <div class="buttons">
      <b-button variant="success" @click="speichern()">
        speichern
      </b-button>
      <b-button variant="danger" @click="abbrechen()">
        abbrechen
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewPersonTable',
  data () {
    return {
      fehleingabe: false,
      id: String,
      textVorname: '',
      textName: '',
      textStrasse: '',
      textPostleitzahl: '',
      textStadt: '',
      textLand: '',
      textEmail: '',
      textTelefon: '',
      adressdaten: false,
      fehlerText: '',
      fehlerTextElemente: [],
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false
    }
  },
  methods: {
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    erstelleFehlerText () {
      this.fehlerText = 'Speichern fehlgeschlagen. '

      if (this.fehlerTextElemente.length > 1) {
        for (var i = 0; i < this.fehlerTextElemente.length; i++) {
          this.fehlerText += this.fehlerTextElemente[i]
          if (i < this.fehlerTextElemente.length - 2) {
            this.fehlerText += ' , '
          } else if (i === this.fehlerTextElemente.length - 2) {
            this.fehlerText += ' und '
          }
        }
        this.fehlerText += ' müssen ausgefüllt sein.'
      } else {
        this.fehlerText += this.fehlerTextElemente[0] + ' muss ausgefüllt sein.'
      }
      this.fehlerTextElemente = []
    },
    speichern () {
      if (this.textVorname === '') {
        this.fehleingabe = true
        this.fehlerTextElemente.push('Vorname')
      }
      if (this.textName === '') {
        this.fehleingabe = true
        this.fehlerTextElemente.push('Name')
      }
      if (this.textEmail === '') {
        this.fehleingabe = true
        this.fehlerTextElemente.push('Email')
      }
      if (this.textTelefon === '') {
        this.textTelefon = null
      }
      if (this.textStrasse === '') {
        this.textStrasse = null
      }
      if (this.textPostleitzahl === '') {
        this.textPostleitzahl = null
      }
      if (this.textStadt === '') {
        this.textStadt = null
      }
      if (this.textLand === '') {
        this.textLand = null
      }

      if (this.fehleingabe) {
        this.erstelleFehlerText()
        this.showAlert()
      }

      if (!this.fehleingabe) {
        if (this.textStrasse || this.textPostleitzahl || this.textPostleitzahl || this.textStadt || this.textLand) {
          this.$http.post('http://localhost:8080/addressbook/address', {
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
          this.$http.post('http://localhost:8080/addressbook/address', {
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
        this.$router.push('/')
      }
      this.fehleingabe = false
    },
    abbrechen () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .form-control {
    width: 400px;
  }
</style>
