<template>
  <div>
    <b-jumbotron bg-variant="dark" text-variant="white" link-variant="white">
      <template><h2>InMediasP</h2></template>
      <b-link router-link to="/">
        Home
        <br>
        <br>
      </b-link>
      <div v-if="filterBar === 'true'">
        <b-form-input v-model="text" placeholder="Filtersuche" v-on:keyup.enter="filtersearch"></b-form-input>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
import Home from '../views/Home'

export default {
  name: 'Header',
  props: {
    filterBar: String
  },
  data () {
    return {
      text: ''
    }
  },
  methods: {
    filtersearch: function () {
      Home.methods.filtersearch(this.text)
    }
  }
}</script>

<style scoped>
  .jumbotron {
    width: 1500px;
    height: 240px;
    margin-left: -20px;
  }
</style>
