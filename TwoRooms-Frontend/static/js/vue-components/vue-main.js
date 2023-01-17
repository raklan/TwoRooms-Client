//===Imports===
import Lobby from './vue-lobby.js';
import Login from './vue-login.js'
import UserHome from './vue-userhome.js';

//===CONSTANTS===
//Active Component Constants
const LOGIN = 'login';
const USERHOME = 'userhome';
const LOBBY = 'lobby';

//===Component definition===
export default {
    name: 'VueMain',
    components: {
        Lobby,
        Login,
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
            //i.e. if they've joined a game, send them to the lobby. Otherwise, take them to their homepage
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
        }
    },
    watch: {
        user(){
            //console.log("User Changed: ", this.user);
        }
    },
    template: `
    <Login @logged-in="userLoggedIn" v-if="activeComponent === 'login'"></Login>
    <UserHome @logged-out="userLoggedOut" @game-joined="userJoinedGame" :user="user" v-if="activeComponent === 'userhome'"></UserHome>
    <Lobby @game-left="userLeftGame()" v-if="activeComponent === 'lobby'" :game-id="joinedGameId" :user="user"></Lobby>
    `
}