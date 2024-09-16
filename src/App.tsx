import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import Profile from './components/Profile';
import PostModal from './components/PostModel';
import Login from "./components/Login";
import Navbar from "./components/Navbar"; // Adjust the import path based on your project structure
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import MakeFriend from './pages/MakeFriend';
import MoreThanFriends from './pages/MoreThanFriends';
import UseToken from "./hooks/useToken";
import http from "./http";
import {setUser} from "./store/userSlice";
import AppRoutes from "./routes";

let isFetching: boolean = false;

const useSessionStorageListener = (key: string) => {
    const [token, setToken] = useState<string | null>(sessionStorage.getItem(key));
    const navigate = useNavigate();

    React.useEffect(() => {
        const handleTokenChange = () => {
            const newToken = sessionStorage.getItem(key);
            if (newToken !== token) {
                setToken(newToken); // Update token state to trigger re-render
                window.location.reload(); // Or use navigate('/') to re-route instead of a full page reload
            }
        };

        // Listen for cross-tab storage changes
        const onStorageChange = (e: any) => {
            if (e.key === key) {
                handleTokenChange();
            }
        };

        window.addEventListener('storage', onStorageChange);

        // Poll for same-tab token changes
        const intervalId = setInterval(handleTokenChange, 1000);

        return () => {
            window.removeEventListener('storage', onStorageChange);
            clearInterval(intervalId);
        };
    }, [key, token, navigate]);
};

const App: React.FC = () => {

    useSessionStorageListener('token'); // Pass your token key


    const dispatch = useDispatch();
    const { token } = UseToken();
    const [hasUser, setHasUser] = useState<boolean>(false);

    React.useEffect(() => {
        !!token && fetchUser();
    }, []);

    const fetchUser = async () => {
        if (isFetching) {
            return;
        }
        isFetching = true;
        const response = await http.get("/user");
        if (!!response && !!response.data) {
            dispatch(setUser(response.data));
        }
        setHasUser(true);
        isFetching = false;
    };

    if (!hasUser) {
        return <Login />;
    }

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <Routes>
                    <Route path={AppRoutes.home} element={<Home />} />
                    <Route path="/make-a-friend" element={<MakeFriend />} />
                    <Route path="/more-than-friends" element={<MoreThanFriends />} />
                    <Route path={AppRoutes.profile} element={<Profile page={AppRoutes.profile} />} />
                    <Route path="/sign-in" element={<Login />} />
                </Routes>
            <PostModal />
        </div>
            </>
    );
};

export default App;
