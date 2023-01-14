<template>
   <Game v-if="this.activeComponent === 'Game'"></Game>
   <Login v-if="this.activeComponent === 'Login'"></Login>
   <button type="button" class="btn btn-secondary" v-on:click="test">Test</button>
   <p>{{ testText }}</p>
</template>

<script>
   import Game from './components/Game.vue';
   import Login from './components/Login.vue';

   const GAME = 'Game';
   const LOGIN = 'Login'

   export default {
      name: 'App',
      components: {
         Game,
         Login
      },
      data() {
         return {
            activeComponent: GAME,
            testText: '',
         }
      },
      methods: {
         test() {
            fetch('https://192.168.100.52:44337/api/game/getGameState').then(resp => { this.testText = "Getting game..."; return resp.json() }).then(apiObj => { this.testText = apiObj; console.log(apiObj); })
         }
      }
   }
</script>

<style>
   #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
   }
</style>
