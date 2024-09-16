import React, {useState} from 'react';
import { Post } from '../types/post';
import {FaRegComments, FaMapMarkerAlt, FaHeart, FaCommentDots, FaFacebook} from 'react-icons/fa';
import CommentInput from '../components/CommentInput';
import PostComment from "./PostComment";
import AuthorDetails from "./AuthorDetails";

const PostItem: React.FC<Post> = (post: Post) => {
    const { id, title, description, images, comments, attributes } = post;
    const [likes, setLikes] = useState<number>(0);
    const [liked, setLiked] = useState<boolean>(false);
    const [showComments, setShowComments] = useState<boolean>(false);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(attributes.lastLocation)}`;

    const sharePostOnFacebook = () => {
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(
            `Check out this post about ${title},  ${description}`
        )}`;
        window.open(facebookShareUrl, '_blank');
    };

    const toggleLike = () => {
        setLiked(!liked);
        setLikes(likes + (liked ? -1 : 1));
    };

    const toggleComments = () => {
        setShowComments(!showComments);
    };
    const editPost = () => {
        alert(`Edit post ${post.id}`);
    };

    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-body">
                <AuthorDetails creator={post.creator}
                               createdAt={post.createdAt}
                               editParent={editPost}
                />
                <h5 className="card-title">Looking for: <strong>{title}</strong></h5>
                <h6 className="card-subtitle mb-2 text-muted" style={{display: "flex", alignItems: "center", cursor: "pointer"}}>
                    <FaMapMarkerAlt className="me-1" />
                    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-decoration-none" style={{color: "inherit"}}>
                        {attributes.lastLocation}
                    </a>
                </h6>
                <p className="card-text">{description}</p>

                {/* Image Carousel if there are multiple images */}
                {images && images.length > 0 && (
                    <div id={`carousel-${id}`} className="carousel slide mb-3" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {images.map((image, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <img src={image} className="d-block w-100 img-fluid" alt={`Post ${index}`} />
                                </div>
                            ))}
                        </div>
                        {images.length > 1 && (
                            <>
                                <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${id}`} data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${id}`} data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </>
                        )}
                    </div>
                )}
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <p>Likes ({likes})</p>
                    <p>Comments ({comments.length})</p>
                </div>

                {/* Like, Facebook Share, and Share Buttons */}
                <div className="d-flex justify-content-between align-items-center mb-3 py-2" style={{borderTop: "1px solid #ccc", borderBottom: "1px solid #ccc"}}>
                    <button className='me-2' onClick={toggleLike} style={{backgroundColor: "transparent", color: "#eb4848", border: "none", display: "flex", alignItems: "center"}}>
                        <FaHeart className={`me-2`} /> Like
                    </button>
                    <button className="me-2 text-primary" onClick={sharePostOnFacebook} style={{backgroundColor: "transparent", border: "none", display: "flex", alignItems: "center"}}>
                        <FaFacebook className="me-2" /> Share on Facebook
                    </button>
                    <button className="d-flex align-items-center" onClick={toggleComments} style={{backgroundColor: "transparent", border: "none", display: "flex", alignItems: "center"}}>
                        <FaRegComments className="me-2" /> Comments
                    </button>
                </div>

                {showComments && (
                <div>
                    <h6>
                        <FaCommentDots className="me-1" /> Comments ({comments.length})
                    </h6>
                    {comments.length > 0 && (
                        <ul className="list-group mb-2">
                            {comments.map((comment) => (
                                <PostComment comment={comment} />
                            ))}
                        </ul>
                    )}
                    <CommentInput postId={id} />
                </div>
                )}
            </div>
        </div>
    );
};

export default PostItem;
