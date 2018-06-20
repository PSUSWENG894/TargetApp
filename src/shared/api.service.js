import axios from 'axios';

export default class ApiService {
    constructor() {}

    get(_url, _apiKey) {
        return axios({
            method: 'GET',
            url: _url,
            responseType: 'text',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Travis-API-Version': '3',
                'Authorization': `token ${_apiKey}`
            }
        }).then(result => result.data)
    }
}