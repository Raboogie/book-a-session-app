import {createContext, useContext, useEffect, useState} from "react";
import { api, setAccessToken } from "./api"
export type User = {
    userId: number;
    name: string;
    email: string;
}

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context){ throw new Error('useAuth should not be null!'); }
    return context;
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // ON MOUNT: Try to refresh token
    useEffect(() => {
        const persistLogin = async () => {
            try {
                // Verify if we have a valid refresh cookie
                const response = await api.post('/auth/refresh-token');
                const { accessToken, user: userData } = response.data;

                setAccessToken(accessToken);
                if (userData) setUser(userData);

            } catch (error) {
                console.log("User not authenticated or session expired");
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        persistLogin();
    }, []);


    const login = (newUser: User, newToken: string) => {
        setUser(newUser);
        setAccessToken(newToken);
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (e) {
            console.error("Logout failed", e);
        } finally {
            setUser(null);
            setAccessToken(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
