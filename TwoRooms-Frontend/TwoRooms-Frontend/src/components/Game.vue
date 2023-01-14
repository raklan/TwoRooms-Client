<template>
   <div id="game-view-header">
      <div class="d-flex justify-content-between">
         <button type="button" class="btn btn-outline-warning">Show Card</button>
         <button type="button" class="btn btn-outline-warning">Rules</button>
      </div>
   </div>
   <div id="game-view-body" class="d-flex justify-content-center">
      <div id="progress"></div>
      <Card team="blue" player-role="player"></Card>
   </div>
   <div id="game-view-footer" class="d-flex justify-content-center" valign="bottom">
      <h4>{{ leaderName }} is the Leader</h4>
   </div>
</template>

<script>
   var ProgressBar = require('progressbar.js');
   import Card from '.\src\components\Card.vue';

   export default {
      name: 'Game',
      components: {
         Card
      },
      data() {
         return {
            leaderName: 'No One',
            timer: {},
            timeLeft: '',

            player: {
               role: 'player',
               team: 'blue'
            }
         }
      },
      mounted() {
         this.timer = new ProgressBar.Circle('#progress', {
            color: '#FFC107'
         });

         this.timer.set(1);
         //Have to call setText before ever updating timeLeft (and subsequently
         // triggering the watch for it) because
         // timer.text does not exist until you call setText.
         this.timer.setText('');

         //this.checkGameState();
      },
      watch: {
         timeLeft() {
            this.timer.text.innerHTML = `<h3>${this.timeLeft}</h3>`;
         }
      },
      methods: {
         checkGameState() {
            fetch('/api/game/getGameState') //TODO: Figure this out for node.js
               .then(resp => resp.json())
               .then(apiObj => {
                  let minutes = Math.floor(apiObj.secondsLeft / 60);
                  let seconds = apiObj.secondsLeft % 60;

                  if (seconds !== 0) {
                     this.timeLeft = `${minutes}:${seconds}`;
                  }
                  else {
                     this.timeLeft = `${minutes}:00`;
                  }

                  this.timer.stop();
                  this.timer.set(apiObj.secondsLeft / apiObj.seconds);
                  this.timer.animate(0, { duration: apiObj.secondsLeft * 1000 });
               })
               .finally(_ => {
                  console.clear(); //Clearing the console to keep all the errors from .animate from piling up
                  //I know it's bad, but y'know, I don't care
                  setTimeout(this.checkGameState, 1000);
               });

         }
      }
   }
</script>

<style scoped>
   #app{
      background-color: black;
   }
</style>