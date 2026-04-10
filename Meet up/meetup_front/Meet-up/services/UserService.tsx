import * as SecureStore from 'expo-secure-store';

const USER_KEY = 'user'

export class UserService {
    async getUserAsync() {
        const user = await SecureStore.getItemAsync(USER_KEY)
        if (user){
            return JSON.parse(user)  
        } else {
            return {first_name: null, email: null}
        }
    }

    getUser() {
        const user = SecureStore.getItem(USER_KEY)
        if (user){
            return JSON.parse(user)  
        } else {
            return {first_name: null, email: null}
        }
    }
}