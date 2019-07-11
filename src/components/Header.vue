<template>
  <div>
    <b-jumbotron bg-variant="dark" text-variant="white" link-variant="white">
      <template><h2>InMediasP</h2></template>
      <label class="homeLink" @click="routeToHome()">
        Home
      </label>
    </b-jumbotron>
  </div>
</template>

<script>

export default {
  name: 'Header',
  methods: {
    routeToHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .jumbotron {
    width: 100%;
    height: 160px;
    margin-left: -20px;
  }

  .homeLink {
    color: white;
  }

  .homeLink:hover{
    cursor: pointer;
  }
</style>
