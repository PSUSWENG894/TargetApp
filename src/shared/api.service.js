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
}