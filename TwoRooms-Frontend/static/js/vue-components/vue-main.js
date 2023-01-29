//===Imports===
import Lobby from './vue-lobby.js';
import Login from './vue-login.js';
import GameView from './vue-gameview.js';
import UserHome from './vue-userhome.js';

//===CONSTANTS===
//Active Component Constants
const LOBBY = 'lobby';
const LOGIN = 'login';
const GAMEVIEW = 'gameview';
const USERHOME = 'userhome';

//===Component definition===
export default {
    name: 'VueMain',
    components: {
        Lobby,
        Login,
        GameView,
        UserHome
    },
    data(){
        return {
            activeComponent: LOGIN,
            user: {},
            joinedGameId: ''
        }
    },
    methods: {
        //EVENT HANDLERS
        userLoggedIn(newUser){            
            this.user = Object.assign({}, newUser);

            //Determine where to send the user
            //i.e. if they've joined a game, send them to the lobby. Otherwise, take them to their homepage.
            //      *Note: The lobby will check if the game has started yet. In which case, it will send them to game view
            const gameId = sessionStorage.getItem('gameId');
            if(gameId && gameId.length > 0){
                this.userJoinedGame(gameId);
            }
            else{
                this.activeComponent = USERHOME;
            }
        },
        userLoggedOut(){
            this.user = {};
            this.activeComponent = LOGIN;
        },

        userJoinedGame(newGameId){
            this.joinedGameId = newGameId;
            this.activeComponent = LOBBY;
        },
        userLeftGame(){
            this.joinedGameId = '';
            this.activeComponent = USERHOME;
        },

        gameStarted(){
            this.activeComponent = GAMEVIEW;
        },
        gameEnded(){
            this.activeComponent = USERHOME;
        }
    },
    template: `
    <Lobby @game-left="userLeftGame()" @game-started="gameStarted" v-if="activeComponent === 'lobby'" :game-id="joinedGameId" :user="user"></Lobby>
    <Login @logged-in="userLoggedIn" v-if="activeComponent === 'login'"></Login>
    <GameView :user="user" :game-id="joinedGameId" v-if="activeComponent === 'gameview'"></GameView>
    <UserHome @logged-out="userLoggedOut" @game-joined="userJoinedGame" :user="user" v-if="activeComponent === 'userhome'"></UserHome>
    `
}