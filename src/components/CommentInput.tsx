import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addComment } from '../store/postSlice';
import {RootState} from "../store";

interface CommentInputProps {
    postId: number;
}

const CommentInput: React.FC<CommentInputProps> = ({ postId }) => {
    const user = useSelector((state: RootState) => state.user.user);

    const [ownerId, setOwnerId] = useState(user._id);
    const [name, setName] = useState(`${user.firstname} ${user.surname}`);
    const [picture, setPicture] = useState(user.attributes.picture);
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {

        if (text.trim()) {
            dispatch(addComment({ postId, ownerId, picture, text }));
            setOwnerId('');
            setName('');
            setPicture('');
            setText('');
        }
    };

    return (
        <div className="mt-3">
            <div className="input-group mb-2">
                <input
                    type="text"
                    className="form-control"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a comment..."
                />
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>
                Comment
            </button>
        </div>
    );
};

export default CommentInput;
