const axios = require('axios');

const BASE_URL = `http://localhost:8080/api`;

module.exports = {
    createGame: (username) => axios({
        method: 'POST',
        url: BASE_URL + '/game',
        headers: {
            "content-type":"application/json"
        },
        data: {
            'active': false,
            'owner':{
                'username': username
            }
        }
    }),

    joinGame: (username, roomCode) => axios({
        method: 'PUT',
        url: `${BASE_URL}/joinGame?gameCode=${roomCode}&username=${username}`,
        headers: {
            'content-type':'application/json'
        }
    }),

    leaveGame: (username, gameId) => axios({
        method: 'PUT',
        url: `${BASE_URL}/setupGame/${gameId}?action=removePlayer`,
        headers: {
            'content-type':'application/json'
        },
        data: {
            'username': username
        }
    }),

    listPlayersInGame: (gameId) => axios({
        method: 'GET',
        headers: {
            'content-type':'application/json'
        },
        url: `${BASE_URL}/game/${gameId}?action=listPlayers`
    }),

    startGame: (gameId) => axios({
        method: 'PUT',
        url: `${BASE_URL}/game/${gameId}?action=startGame`,
        headers: {
            'content-type': 'application/json'
        }
    }),

    getGameStatus: (gameId) => axios({
        method: 'GET',
        headers: {
            'content-type':'application/json'
        },
        url: `${BASE_URL}/game/${gameId}?action=gameStatus`
    }),

    getPendingTasks: (gameId, round) => axios({
        method: 'GET',
        url: `${BASE_URL}/tasks?gameId=${gameId}&round=${round}&status=Pending`,
        headers: {
            'content-type':'application/json'
        }
    })
}