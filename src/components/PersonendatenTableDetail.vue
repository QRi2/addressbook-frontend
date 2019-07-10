<template>
  <div class="table">
    <table>
      <tr>
        <th>
          Vorname
        </th>
        <th>
          {{items.vorname}}
        </th>
      </tr>
      <tr>
        <th>
          Name
        </th>
        <th>
          {{items.name}}
        </th>
      </tr>
      <tr>
        <th>
          Straße
        </th>
        <th v-if="items.adressdaten && items.adressdaten.strasse">
          {{items.adressdaten.strasse}}
        </th>
        <th v-else="">
        </th>
      </tr>
      <tr>
        <th>
          Postleitzahl
        </th>
        <th v-if="items.adressdaten && items.adressdaten.postleitzahl">
          {{items.adressdaten.postleitzahl}}
        </th>
        <th v-else="">
        </th>
      </tr>
      <tr>
        <th>
          Stadt
        </th>
        <th v-if="items.adressdaten && items.adressdaten.stadt">
          {{items.adressdaten.stadt}}
        </th>
        <th v-else="">
        </th>
      </tr>
      <tr>
        <th>
          Land
        </th>
        <th v-if="items.adressdaten && items.adressdaten.land">
          {{items.adressdaten.land}}
        </th>
        <th v-else="">
        </th>
      </tr>
      <tr>
        <th>
          Email
        </th>
        <th>
          {{items.mail}}
        </th>
      </tr>
      <tr>
        <th>
          Telefon
        </th>
        <th v-if="items.telefonnummer">
          {{items.telefonnummer}}
        </th>
        <th v-else="">
        </th>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DetailTable',

  props: {
    personIndex: String
  },
  data () {
    return {
      items: [],
      id: null
    }
  },
  mounted: function () {
    this.id = this.personIndex
    if (this.personIndex !== null && this.personIndex !== '') {
      fetch('http://localhost:8080/addressbook/addresses/' + this.personIndex, {
        method: 'get'
      })
        .then((response) => {
          return response.json()
        })
        .then((jsonData) => {
          this.items = jsonData.valueOf()
        })
    }
  }
}
</script>

<style scoped>

</style>
