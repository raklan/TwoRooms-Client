//TODO: Get Room Code text box to automatically fix formatting

//===Component Definition===
export default {
    props: ['user'],
    data(){
        return {
            roomCode: ''
        }
    },
    methods:{
        logout(){
            //Clear the auto-login info
            sessionStorage.clear();

            this.$emit("logged-out");
        },
        createGame(){
            const vm = this;
            const reqBody = {
                username: this.user.username
            };

            fetch('/services/createGame', 
                {
                    headers: {
                        'content-type':'application/json'
                    },
                    body: JSON.stringify(reqBody),
                    method: 'POST'
                }
            )
            .then(resp => resp.json())
            .then(game => {
                //console.log(game);
                vm.roomCode = game.data.gameCode;
                vm.joinGame();
            });
        },
        joinGame(){
            fetch(`/services/joinGame/?username=${this.user.username}&roomCode=${this.roomCode}`)
            .then(resp => resp.json())
            .then(joinReq => {
                //console.log(joinReq);
                if(joinReq.status === 200){
                    //Setting this key implies the user is ALREADY IN THE GAME AND DOES NOT NEED TO JOIN AGAIN IF CONNECTION IS LOST
                    sessionStorage.setItem('gameId', joinReq.data.gameId); 
                    this.$emit('game-joined', joinReq.data.gameId);
                }
                else{
                    console.error('Something went wrong...are you already in that game?',joinReq);
                }
            });
        }
    },
    template:`
        <div>
            <div class="m-2">
                <button type="button" class="btn btn-outline-danger" v-on:click="logout">Log Out</button>
            </div>
            <div class="row d-flex justify-content-between m-2">
                <div class="col-6">
                    <input class="form-control form-control-sm" type="text" v-model="roomCode" placeholder="Enter EXACT room code"/>
                </div>
                <button type="button" class="btn btn-outline-success col-6" v-on:click="joinGame">Join Game</button>
            </div>
            <div class="m-2 d-flex justify-content-center">
                <h3 style="color:white">OR</h3>
            </div>
            <div class="row d-flex justify-content-center m-2">
                <button type="button" class="btn btn-outline-warning" v-on:click="createGame">Host Game</button>
            </div>
        </div>
    `
}