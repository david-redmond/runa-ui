import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/post';

interface PostState {
    posts: Post[];
    currentPage: number;
    postsPerPage: number;
}

const initialState: PostState = {
    posts: [],
    currentPage: 1,
    postsPerPage: 20,
};

interface AddPostPayload extends Post {}

interface AddCommentPayload {
    postId: number;
    ownerId: string;
    title?: string;
    picture: string;
    text: string;
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setAllPost: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
        },
        addPost: (state, action: PayloadAction<AddPostPayload>) => {
            const newPost: Post = {
                ...action.payload
            };
            state.posts.unshift(newPost);
        },
        addComment: (state, action: PayloadAction<AddCommentPayload>) => {
            console.log(action.payload)
            const { postId, ownerId, title, picture, text } = action.payload;
            const post = state.posts.find((p) => p.id === postId);
            if (post) {
                post.comments.push({ id: Date.now(), ownerId, title, picture, text });
            }
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
    },
});

export const { addPost, addComment, setPage, setAllPost } = postSlice.actions;

export default postSlice.reducer;
