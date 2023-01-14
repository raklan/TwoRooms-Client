<template>
   <input type="text" class="form-control m-2" v-model="accountName" placeholder="Email" />
   <input type="password" class="form-control m-2" v-model="accountPassword" placeholder="Password" />

   <div class="d-flex justify-content-center">
      <button type="button" class="btn btn-outline-dark" v-on:click="login">Log In</button>
   </div>
</template>

<script>
   export default {
      name: 'Login',
      data() {
         return {
            accountName: '',
            accountPassword: ''
         }
      },
      methods: {
         login() {
            console.log(`logging in for account '${this.accountName}' and password '${this.accountPassword}'`)

            fetch("http://localhost:8080/api/game/23?action=viewPlayers", { mode: 'no-cors' })
               .then(resp => {
                  console.log('resp', resp);
                  return resp.json();
               })
               .then(apiObj => {
                  console.log('apiObj', apiObj)
               });

         }
      }
   }
</script>

<style scoped>
</style>