import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';

export default function PersistLogin() {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        window.onbeforeunload = () => sessionStorage.setItem('pageRefreshed', true);

        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.accessToken && (persist || sessionStorage.getItem('pageRefreshed')) ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, []);

    return (
        <>
            {!persist && !sessionStorage.getItem('pageRefreshed')
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    );
}