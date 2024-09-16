import React from "react";
import AuthorDetails from "./AuthorDetails";

interface IProps {
    comment: any;
}

export default ({comment}: IProps) => {
    const editComment = () => {
        alert(`Edit Comment ${comment._id}`);
    }
    return (
        <li key={comment.id} className="list-group-item">
            <div className="d-flex align-items-center flex-column">
                <AuthorDetails creator={comment.creator}
                               createdAt={comment.createdAt}
                               isComment
                               editParent={editComment}
                />
                <div style={{textAlign: "left", width: "100%"}}>
                    <strong>{comment.name}</strong>
                    <p className="mb-0">{comment.text}</p>
                </div>
            </div>
        </li>
    )
}