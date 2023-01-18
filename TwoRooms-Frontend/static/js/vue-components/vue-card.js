export default {
    name: 'Card',
    props: ['playerRole', 'playerTeam'],
    data(){
        return {}
    },
    computed: {
        imageSource(){
            if(this.playerRole && this.playerRole.length > 0 && this.playerTeam && this.playerTeam.length > 0){
                return `/images/cards/${this.playerTeam}/${this.playerRole}.PNG`;
            }
            else{
                return '';
            }
        }
    },
    template: `
        <div class="d-flex justify-content-center">
            <img :src="imageSource" style="height:90%; width:90%"/>
        </div>
    `
}