//TODO: Show room code in lobby

export default {
    name: 'Lobby',
    props: ['gameId','user'],
    data(){
        return {
            playersInLobby: [],
            currentPlayerIsHost: false
        }
    },
    mounted(){
        if(this.gameId){
            this.checkPlayersInLobby();
        }
    },
    methods: {
        leaveGame(){
            fetch(`/services/leaveGame?username=${this.user.username}&gameId=${this.gameId}`)
            .then(resp => resp.json())
            .then(leaveReq => {
                //console.log(leaveReq);

                //Remove auto-lobby-join schenanigans
                sessionStorage.removeItem('gameId');

                this.$emit('game-left');
            });
        },

        startGame(){
            fetch(`/services/startGame?gameId=${this.gameId}`)
                .then(resp => resp.json())
                .then(apiObj => {
                    
                });
        },

        checkPlayersInLobby(){
            fetch(`/services/listPlayers?gameId=${this.gameId}`)
            .then(resp => resp.json())
            .then(gameData => {
                //console.log(gameData);
                this.playersInLobby = gameData.data.players;

                this.currentPlayerIsHost = (gameData.data.ownerUserName === this.user.username);

                if(gameData.data.active === true){
                    this.$emit('game-started');
                }
                else{ //If the game isn't started, hang out in the lobby until it's time to refresh
                    setTimeout(this.checkPlayersInLobby, 5000);
                }

            });
        }
    },
    template: `
        <div style="color:white">
            <div class="m-2">
                <button type="button" class="btn btn-outline-danger" v-on:click="leaveGame">Leave Game</button>
            </div>
            <h3 class="row d-flex justify-content-center">Waiting for Game to Start...</h3>
            <div class="row">
                <h6 class="d-flex justify-content-center">Players in Lobby:</h6>
                <div class="d-flex justify-content-center">
                    <ul>
                        <li v-for="player in playersInLobby">{{ player.username }}</li>
                    </ul>
                </div>
            </div>
            <div class="row m-2">
                <button v-if="currentPlayerIsHost" v-on:click="startGame" type="button" class="btn btn-outline-success">Start Game</button>
            </div>
        </div>
    `
}