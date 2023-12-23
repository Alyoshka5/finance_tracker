import axios from 'axios';
import useAuth from './useAuth';

export default function useRefreshToken() {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true
        });

        setAuth(prev => {
            return { ...prev, userId: response.data.userId, accessToken: response.data.accessToken }
        });
        
        return response.data.accessToken;
    }

    return refresh;
}