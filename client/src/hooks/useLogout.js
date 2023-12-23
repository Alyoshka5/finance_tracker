import axios from 'axios';
import useAuth from './useAuth';

export default function useLogout() {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        
        try {
            await axios.post('/auth/logout');
        } catch (err) {
            console.error(err);
        }
    }
    
    return logout;
}