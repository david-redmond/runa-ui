import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IOtherUser {
    firstname: string;
    surname: string;
    picture: string;
}

export interface IActionPayloadSetOtherUser extends IOtherUser {
    creator: string;
}

interface IOtherUserState {
    [key: string]: IOtherUser;
}

const initialState: IOtherUserState = {};

const otherUserSlice = createSlice({
    name: 'otherUser',
    initialState,
    reducers: {
        setOtherUser: (state: IOtherUserState, action: PayloadAction<IActionPayloadSetOtherUser>) => {
            state[action.payload.creator] = action.payload;
        }
    },
});

export const { setOtherUser } = otherUserSlice.actions;

export default otherUserSlice.reducer;
