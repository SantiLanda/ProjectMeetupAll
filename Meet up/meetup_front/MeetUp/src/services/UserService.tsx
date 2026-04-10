import SecureStorage from 'react-native-fast-secure-storage';
import {Config} from 'react-native-config'

const USER_KEY = 'user'

export class UserService {
    async getUserAsync() {
        const user = await SecureStorage.getItem(USER_KEY)
        if (user){
            return JSON.parse(user)  
        } else {
            return {first_name: null, email: null}
        }
    }

    getUser() {
        const user = SecureStorage.getItemSync(USER_KEY)
        if (user){
            return JSON.parse(user)  
        } else {
            return {first_name: null, email: null}
        }
    }
}