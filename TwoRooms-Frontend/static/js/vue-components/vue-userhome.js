//===Component Definition===
export default {
    props: ['user'],
    data(){
        return {

        }
    },
    methods:{
        logout(){
            //Clear the auto-login info
            sessionStorage.clear();

            this.$emit("logged-out");
        }
    },
    template:`
        <div>
            <div class="m-2">
                <button type="button" class="btn btn-outline-danger" v-on:click="logout">Log Out</button>
            </div>
            <div class="row d-flex justify-content-center m-2">
                <button type="button" class="btn btn-outline-success">Join Game</button>
            </div>
            <div class="row d-flex justify-content-center m-2">
                <button type="button" class="btn btn-outline-warning">Host Game</button>
            </div>
        </div>
    `
}