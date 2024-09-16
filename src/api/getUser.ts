import {setUser} from "../store/userSlice";
import http from "../http";

export default async (setError: (a: string) => void, dispatch: (s: any) => void) => {
    try {
        const token = await sessionStorage.getItem("token");
        const userResponse = await http.get(`/user`, {
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                // @ts-ignore
                "Authorization": token
            }
        });
        dispatch(setUser(userResponse.data));
        console.log("I have a token", userResponse.data)
    } catch (error: any) {
        console.error('Failed to fetch user data:', error);
        setError('Failed to retrieve user data. Please try again.');
    }
};