import axios from "axios";

export default class GitHubApiService {
    constructor() {
    }

    get(_url, _apiKey) {
        return axios.get(_url, {
            responseType: 'text',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `token ${_apiKey}`
            }
        }).then(result => result.data);
    }

    post(_url, _body, _apiKey) {
        return axios.post(_url, _body, {
            responseType: 'text',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `token ${_apiKey}`
            }
        }).then(result => result.data);
    }
}