import Card from './vue-card.js'

export default {
    name: 'GameView',
    components: {
        Card
    },
    data(){
        return {
            timer: {},
            timeLeft: '',

            playerRole: 'player',
            playerTeam: 'red'
        }
    },
    mounted(){
      this.timer = new ProgressBar.Circle("#progress", {color: '#FFC107'});

      this.timer.set(1);
      //Must call setText here, or setting the innerHTML in timeLeft's watcher doesn't work
      this.timer.setText('');
    },
    methods: {

    },
    watch: {
        timeLeft(){
            this.timer.text.innerHTML = `<h3>${this.timeLeft}</h3>`
        }
    },
    template: `
        <div id="game-view-header">
            <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#cardModal">Show Card</button>
                <button type="button" class="btn btn-outline-warning">Rules</button>
            </div>
        </div>
        <div id="game-view-body" class="d-flex justify-content-center">
            <div id="progress" style="width:30% ;height:30%;"></div>
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

    `
}