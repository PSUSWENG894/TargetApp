import axios from 'axios';

export default class TravisApiService {
    constructor() {}

    get(_url, _apiKey) {
        return axios.get(_url, {
            responseType: 'text',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Travis-API-Version': '3',
                'Authorization': `token ${_apiKey}`
            }
        }).then(result => result.data);
    }

    getWithHeaders(_url, _apiKey) {
        return axios.get(_url, {
            responseType: 'text',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Travis-API-Version': '3',
                'Authorization': `token ${_apiKey}`
            }
        }).then(result => {result.data, result.headers});
    }
    
    post(_url, _body, _apiKey) {
        return axios.post(_url, _body, {
            responseType: 'text',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Travis-API-Version': '3',
                'Authorization': `token ${_apiKey}`
            }
        }).then(result => result.data);
    }
}
