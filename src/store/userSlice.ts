import { createSlice } from '@reduxjs/toolkit';

export interface IUser {
    _id: string;
    firstname: string;
    surname: string;
    email: string;
    attributes: { [key: string]: any; }
}

interface UserState {
    user: IUser;
}

const initialState: UserState = {
    user: {
        _id: "",
        firstname: "",
        surname: "",
        email: "",
        attributes: {}
    },

};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        editUser: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload,
                attributes: {
                    ...state.user.attributes,
                    ...action.payload.attributes
                }
            };
        },
        clearUser: (state) => {
            state.user = initialState.user;
        }
    },
});

export const { setUser, clearUser, editUser } = userSlice.actions;

export default userSlice.reducer;
