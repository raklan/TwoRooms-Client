const axios = require('axios');

const BASE_URL = `http://localhost:8080/api`;

module.exports = {
    login: (username, password) => axios({
        method: 'POST',
        url: BASE_URL + '/user/login',
        headers: {
            "content-type":"application/json"
        },
        data: {
            'username': username,
            'password': password
        }
    })
}