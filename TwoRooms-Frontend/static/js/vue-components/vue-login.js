//Component definition
export default {
    name: 'Login',
    data(){
        return {
            accountName: '',
            accountPassword: ''
        }
    },
    mounted(){
        const vm = this;
        //Automatically log the user in if they refresh the page without logging out
        const previousAccountName = sessionStorage.getItem('accountName');
        const previousAccountPassword = sessionStorage.getItem('accountPassword'); 

        if(previousAccountName && previousAccountName.length > 0 && previousAccountPassword && previousAccountPassword.length > 0){
            console.info(`Detected previously logged in user. Automatically logging in User '${previousAccountName}'`);
            this.accountName = previousAccountName;
            this.accountPassword = previousAccountPassword;
            this.login();
        }

        //Move focus appropriately when the user presses enter
        this.$refs.usernameBox.addEventListener("keyup", function(event){
            if(event.key === 'Enter'){
                vm.$refs.passwordBox.focus();
            }
        });
        this.$refs.passwordBox.addEventListener("keyup", function(event){
            if(event.key === 'Enter'){
                vm.login();
            }
        });
    },
    methods: {
        login(){
            //console.log(`Logging in for account ${this.accountName} and password ${this.accountPassword}`);
            const reqBody = {
                'accountName': this.accountName,
                'accountPassword': this.accountPassword
            };
            fetch(`/services/login`,
                {
                    headers: {'content-type':'application/json'},
                    body: JSON.stringify(reqBody),
                    method: "POST"
                }
            )
            .then(resp => resp.json())
            .then(login => {                
                //console.info(login);
                if(login.status === 200 || login.status === 201){
                    //Save user's info to automatically log them back in if they happen to refresh the page
                    sessionStorage.setItem('accountName', this.accountName);
                    sessionStorage.setItem('accountPassword', this.accountPassword);
                    //Tell main component who the currently logged-in user is
                    this.$emit("logged-in", login.data);
                }
                else{
                    console.error(login.message);
                }
            });
        }
    },
    template: `
        <div>
            <input ref="usernameBox" tabindex="1" type="text" class="form-control form-control-sm m-2" v-model="accountName" placeholder="Username" />
            <input ref="passwordBox" tabindex="2" type="password" class="form-control form-control-sm m-2" v-model="accountPassword" placeholder="Password" />

            <div class="d-flex justify-content-center">
                <button tabindex="3" type="button" class="btn btn-outline-primary" v-on:click="login">Log In</button>
            </div>
        </div>
    `
}