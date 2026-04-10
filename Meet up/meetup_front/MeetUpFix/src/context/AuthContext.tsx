import { createContext, useContext, useEffect, useState } from "react";
import SecureStorage, {ACCESSIBLE} from 'react-native-fast-secure-storage';
import { ApiService } from "../services/ApiService";

interface AuthProps {
    authState?: {token: string | null, authenticated: boolean | null};
    onRegister?: (email: string, username: string, password: string,) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
};

const TOKEN_KEY = 'token';
const USER_KEY = 'user'
const apiService = new ApiService();

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext)
};

export const AuthProvider = ({children}: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null,
        authenticated: boolean | null
    }>({token: null, authenticated: null})

    useEffect(() => {
        const loadToken = () => {
            const token = SecureStorage.getItemSync(TOKEN_KEY)
            if (token) {
                setAuthState({token: token, authenticated: true})
            }
        }
        loadToken()
    }, [])

    const register = async (email: string, username: string, password: string) => {
        try {
            const result = await apiService.post('register/', {'email': email, 'password': password, 'first_name': username})
            const data = await result.json()
            if (result.ok) {
                setAuthState({token: data.token, authenticated: true});
                SecureStorage.setItemSync(TOKEN_KEY, data.token);
                SecureStorage.setItemSync(USER_KEY, JSON.stringify({first_name: data.user.first_name, email: data.user.email,
                    username: data.user.username
                }))
            } else {
                const error = (data.first_name ? data.first_name[0] : null) || (data.email ? data.email[0] : null) || (data.password ? data.password[0] : null)
                return { error: true, msg: error}
            }
            return result
        } catch (e) {
            return { error: true, msg: (e as any)}
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const result = await apiService.post('login/', {email: email, password: password})
            const data = await result.json()
            if (result.ok){
                setAuthState({token: data.token, authenticated: true})
                SecureStorage.setItemSync(TOKEN_KEY, data.token)
                SecureStorage.setItemSync(USER_KEY, JSON.stringify({first_name: data.user.first_name, email: data.user.email}))
                return result
            } else {
                return { error: true, msg: data.error}
            }
        } catch (e) {
            return { error: true, msg: (e as any)}
        }
    }

    const logout = async () => {
        try {
            const result = await apiService.post('logout/', {})
            if (result.ok){
                setAuthState({token: null, authenticated: false})
                SecureStorage.removeItemSync(TOKEN_KEY)
                SecureStorage.removeItemSync(USER_KEY)
            }

        } catch (e) {
            console.log(e)
            return { error: true, msg: (e as any)}
        }
    }

    const value  = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}