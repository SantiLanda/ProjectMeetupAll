import SecureStorage from 'react-native-fast-secure-storage';
import {Config} from 'react-native-config'

const TOKEN_KEY = 'token';

export class ApiService {
    API_URL: string | undefined = '';
    token: string | undefined | null = '' 
    constructor () {
        this.API_URL = Config.API_URL;
    }

    get = async (url: string, params: any = null) => {
        this.token = SecureStorage.getItemSync(TOKEN_KEY)
        let queryString = ''
        if (params) {
            queryString = new URLSearchParams(params).toString()
        }
        return await fetch(this.API_URL + url + queryString, {method: 'GET', headers: {Authorization: `Token ${this.token}`}})
    }

    post = async (url: string, body: any) => {
        this.token = SecureStorage.getItemSync(TOKEN_KEY)
        console.log(this.API_URL)
        return await fetch(this.API_URL + url, {method: 'POST',
            headers: {
                "Authorization": `Token ${this.token}`,
                "Content-Type": 'application/json'
            }, body: JSON.stringify(body)})
    }
}