import Card from './vue-card.js'

export default {
    name: 'GameView',
    props: ['gameId', 'user'],
    components: {
        Card
    },
    data(){
        return {
            timer: {},

            game: {},
            nowTimeCopy: 0,

            timerPid: null,
            taskCheckPid: null,
            roundIsActive: false,

            cardsSharedWithMe: [],

            playerRole: 'player',
            playerTeam: 'red'
        }
    },
    mounted(){
      this.timer = new ProgressBar.Circle("#progress", {color: '#FFC107'});

      this.timer.set(1);
      //Must call setText here, or setting the innerHTML in timeLeft's watcher doesn't work
      this.timer.setText('');

      this.checkGameState();
    },
    methods: {
        checkGameState(){
            const vm = this;
            if(this.gameId){
                fetch(`/services/getGameStatus?gameId=${this.gameId}`)
                    .then(resp => resp.json())
                    .then(g => {
                        if(g.data){
                            this.game = g.data;
                        }
                    });
            }
        },

        checkForTasks(){
            const vm = this;
            if(this.gameId && this.game && this.game.round){
                fetch(`/services/getTasksForUser?gameId=${this.gameId}&round=${this.game.round.currentRound}&username=${this.user.username}`)
                    .then(resp => resp.json())
                    .then(tasks => {
                        const cardShares = tasks.filter(task => task.task === "Card Share");
                        const leaderNominations = tasks.filter(task => task.task === "Leader Nomination");

                        cardShares.forEach(share => {   
                            //Check if this player is already shared, if so, don't bother the server with it
                            if(!vm.cardsSharedWithMe.some(c => c.username === share.username)){
                                this.getPlayerInfo(share.username)}
                            }
                        );
                    });
            }
        },

        getPlayerInfo(requestedUsername){
            const vm = this;
            if(this.gameId){
                fetch(`/services/seePlayerInfo?gameId=${this.gameId}&username=${requestedUsername}`)
                    .then(resp => resp.json())
                    .then(player => {
                        const slimmedPlayer = {
                            username: player.username,
                            playerTeam: player.team,
                            playerRole: player.role
                        };
                        if(!vm.cardsSharedWithMe.includes(slimmedPlayer)){
                            vm.cardsSharedWithMe.push(slimmedPlayer);
                        }
                    });
            }
        },

        startTimer(){
            this.timerPid = setInterval(_ => {this.nowTimeCopy = Date.now()}, 1000);
        },

        stopTimer(){
            clearInterval(this.timerPid);
            this.timerPid = null;
        },

        startTaskChecking(){
            this.taskCheckPid = setInterval(this.checkForTasks, 1000);
        },

        stopTaskChecking(){
            clearInterval(this.taskCheckPid);
            this.taskCheckPid = null;
        }
    },
    computed: {
        maxSecondsInCurrentRound(){
            if(this.game && this.game.round){
                var currentRound = this.game.round.currentRound;

                switch(currentRound){
                    case 1:
                        return 3*60;
                    case 2:
                        return 2*60;
                    case 3:
                        return 1*60;
                    default:
                        return 0;
                }
            }
            else{
                return 0;
            }
        },

        roundEndTime(){
            if(this.game && this.game.round){
                var roundStart = new Date(this.game.round.startTime);
                return new Date(roundStart.getTime() + this.maxSecondsInCurrentRound*1000);
            }
            else{
                return new Date(); //If the game doesn't exist, just tell the client that the game ends right now
            }
        },

        secondsLeftInRound(){
            return (this.roundEndTime.getTime() - this.nowTimeCopy) / 1000;
        },

        timeLeft(){
            var minutes = Math.floor(this.secondsLeftInRound / 60);
            var seconds = Math.floor(this.secondsLeftInRound % 60);

            if(seconds < 10){
                return `${minutes}:0${seconds}`;
            }
            else{
                return `${minutes}:${seconds}`;
            }
        }
    },
    watch: {
        secondsLeftInRound(newVal){
            if(newVal <= 1){ //Stopping at one, because after it stops, there will be one last one queued, and we want it to stop at 0, not -1
                this.stopTimer();
                this.stopTaskChecking();
                this.roundIsActive = false;
            }
            else if(this.timerPid === null && this.taskCheckPid === null){
                this.startTimer();
                this.startTaskChecking();
                this.roundIsActive = true;
            }
        },
        timeLeft(){
            this.timer.text.innerHTML = `<h3>${this.timeLeft}</h3>`;

               this.timer.set(this.secondsLeftInRound/this.maxSecondsInCurrentRound); //Reset where the progress bar is, just to make sure it stays where it should be
               this.timer.animate(0, { //Tell the progress bar to work towards zero over the duration of the round
                   duration: (this.secondsLeftInRound * 1000) //Duration needs to be in ms
               });
        }
    },
    template: `
        <div id="game-view-header">
            <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#cardModal">Show Card</button>
                <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#shareModal">Card Share</button>
            </div>
        </div>
        <div id="game-view-body" class="d-flex justify-content-center mt-5">
            <div id="progress" class="h-100 w-100"></div>
        </div>
        <div id="game-view-footer">
        </div>

        <div class="modal" style="background-color:black" id="cardModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" style="background-color:black">
                    <div class="modal-body">
                        <Card :player-role="playerRole" :player-team="playerTeam"></Card>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" style="background-color:black" id="shareModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" style="background-color:black">
                    <div class="modal-body" style="background-color:grey">
                        <div v-for="share in cardsSharedWithMe">
                            <span>{{ share.username }} is a {{ share.playerRole }} for the {{ share.playerTeam }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    `
}