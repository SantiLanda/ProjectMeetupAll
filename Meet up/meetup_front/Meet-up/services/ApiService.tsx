import { fetch } from 'expo/fetch'
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'token';

export class ApiService {
    API_URL: string | undefined = '';
    token: string | undefined | null = '' 
    constructor () {
        this.API_URL = process.env.EXPO_PUBLIC_API_URL;
    }

    get = async (url: string, params: any = null) => {
        this.token = SecureStore.getItem(TOKEN_KEY)
        let queryString = ''
        if (params) {
            queryString = new URLSearchParams(params).toString()
        }
        return await fetch(this.API_URL + url + queryString, {method: 'GET', headers: {Authorization: `Token ${this.token}`}})
    }

    post = async (url: string, body: any) => {
        this.token = SecureStore.getItem(TOKEN_KEY)
        return await fetch(this.API_URL + url, {method: 'POST',
            headers: {
                "Authorization": `Token ${this.token}`,
                "Content-Type": 'application/json'
            }, body: JSON.stringify(body)})
    }
}