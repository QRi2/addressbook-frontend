<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="danger"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p> {{ fehlerText }} </p>
    </b-alert>
    <table class="table">
      <tr>
        <th class="firstColumn">
          Vorname
        </th>
        <th>
          <b-form-input :state="vornameValueIsOk" @blur="setzeFehlerZurueck" v-model="textVorname"
                        placeholder="Vorname"></b-form-input>
        </th>
      </tr>
      <tr>
        <th>
          Name
        </th>
        <th>
          <b-form-input :state="nameValueIsOk" @blur="setzeFehlerZurueck" v-model="textName"
                        placeholder="Name"></b-form-input>
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
          <b-form-input :state="emailValueIsOk" @blur="setzeFehlerZurueck" v-model="textEmail"
                        placeholder="Email"></b-form-input>
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
    <table class="buttonTable">
      <tr>
        <th>
          <b-button variant="success" block @click="speichern()">
            speichern
          </b-button>
        </th>
        <th>
          <b-button variant="danger" block @click="abbrechen()">
            abbrechen
          </b-button>
        </th>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'NewPersonTable',
  data () {
    return {
      vornameValueIsOk: null,
      nameValueIsOk: null,
      emailValueIsOk: null,
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
    setzeFehlerZurueck () {
      if (this.textVorname.length > 0) {
        this.vornameValueIsOk = null
      }
      if (this.textName.length > 0) {
        this.nameValueIsOk = null
      }
      if (this.textEmail.length > 0 && this.textEmail.includes('@')) {
        this.emailValueIsOk = null
      }
    },
    erstelleFehlerText () {
      this.fehlerText = 'Speichern fehlgeschlagen. '

      if (this.fehlerTextElemente.length > 1) {
        for (var i = 0; i < this.fehlerTextElemente.length; i++) {
          if (this.fehlerTextElemente[i] !== '@') {
            this.fehlerText += this.fehlerTextElemente[i]
            if (i < this.fehlerTextElemente.length - 2) {
              this.fehlerText += ' , '
            } else if (i === this.fehlerTextElemente.length - 2) {
              this.fehlerText += ' und '
            }
          }
        }
        this.fehlerText += ' müssen ausgefüllt sein.'
      } else if (this.fehlerTextElemente[0] !== '@') {
        this.fehlerText += this.fehlerTextElemente[0] + ' muss ausgefüllt sein.'
      }
      if (this.textEmail.length > 0 && !this.textEmail.includes('@')) {
        this.fehlerText += ' Die Email muss ein @ enthalten'
      }
      this.fehlerTextElemente = []
    },
    speichern () {
      if (this.textVorname === '') {
        this.vornameValueIsOk = false
        this.fehleingabe = true
        this.fehlerTextElemente.push('Vorname')
      }
      if (this.textName === '') {
        this.nameValueIsOk = false
        this.fehleingabe = true
        this.fehlerTextElemente.push('Name')
      }
      if (this.textEmail === '') {
        this.emailValueIsOk = false
        this.fehleingabe = true
        this.fehlerTextElemente.push('Email')
      }
      if (this.textEmail.length > 0 && !this.textEmail.includes('@')) {
        this.emailValueIsOk = false
        this.fehleingabe = true
        this.fehlerTextElemente.push('@')
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
        } else {
          this.$http.post('http://localhost:8080/addressbook/address', {
            name: this.textName,
            vorname: this.textVorname,
            mail: this.textEmail,
            telefonnummer: this.textTelefon,
            adressdaten: null
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
