//===Imports===
import Login from './vue-login.js'
import UserHome from './vue-userhome.js';

//===CONSTANTS===
//Active Component Constants
const LOGIN = 'login'
const USERHOME = 'userhome'

//===Component definition===
export default {
    name: 'VueMain',
    components: {
        Login,
        UserHome
    },
    data(){
        return {
            activeComponent: LOGIN,
            user: {}
        }
    },
    methods: {
        //EVENT HANDLERS
        userLoggedIn(newUser){            
            this.user = Object.assign({}, newUser);
            this.activeComponent = USERHOME;
        },
        userLoggedOut(){
            this.user = {};
            this.activeComponent = LOGIN;
        }
    },
    watch: {
        user(){
            //console.log("User Changed: ", this.user);
        }
    },
    template: `
    <Login @logged-in="userLoggedIn" v-if="activeComponent === 'login'"></Login>
    <UserHome @logged-out="userLoggedOut" :user="user" v-if="activeComponent === 'userhome'"></UserHome>
    `
}