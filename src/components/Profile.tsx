import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { FaEdit, FaUserPlus, FaSave, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AppRoutes from '../routes';
import {editUser} from "../store/userSlice";

interface IProps {
    page: string;
}

const Profile: React.FC<IProps> = ({ page }: IProps) => {
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch(); // Assume we have some dispatch logic for updating the user
    const [isEditing, setIsEditing] = useState(false);

    const initialEditUSerState = {
        firstname: user.firstname,
        surname: user.surname,
        attributes: {
            bio: user.attributes.bio || '',
            picture: user.attributes.picture || '',
            location: user.attributes.location || '',
            gender: user.attributes.gender || '',
            age: user.attributes.age || '',
        }
    };
    const [editedUser, setEditedUser] = useState(initialEditUSerState);

    const profilePlaceholder = '/profile-fallback.png';
    const bannerPlaceholder = '/profile-background.png';

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'firstname' || name === 'surname') {
            setEditedUser((prev) => ({
                ...prev,
                [name]: value,
            }));
        } else {
            setEditedUser((prev) => ({
                ...prev,
                attributes: {
                    ...prev.attributes,
                    [name]: value,
                }
            }));
        }
    };

    const handleSave = () => {
        // Dispatch action to save user profile details
        dispatch(editUser(editedUser));
        setIsEditing(false);
        //todo: update the edit user endpoint
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedUser(initialEditUSerState);
    };

    return (
        <>
            <div className="card shadow-lg mb-4">
                <div className="card-header position-relative p-0">
                    <img
                        src={bannerPlaceholder}
                        alt="Profile banner"
                        className="img-fluid"
                        style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                    />
                    <div className="position-absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <img
                            src={editedUser.attributes.picture || profilePlaceholder}
                            alt="Profile"
                            className="rounded-circle border border-3 border-light"
                            style={{ width: '80px', height: '80px' }}
                        />
                    </div>
                </div>
                <div className="card-body text-center mt-2">
                    {!isEditing ? (
                        <>
                            <h5 className="card-title">{`${user.firstname} ${user.surname}`}</h5>
                            {!!user.attributes && !!user.attributes.bio && (<p className="card-text text-muted">{user.attributes.bio}</p>)}
                            {!!user.attributes && !!user.attributes.location && (<p className="card-text text-muted">{user.attributes.location}</p>)}
                            {!!user.attributes && !!user.attributes.gender && (<p className="card-text text-muted">{user.attributes.gender}</p>)}
                            {!!user.attributes && !!user.attributes.age && (<p className="card-text text-muted">{user.attributes.age}</p>)}
                            {page === "/profile" && (
                                <button onClick={() => setIsEditing(true)} className="btn btn-outline-secondary">
                                    <FaEdit className="me-2" /> Edit Profile
                                </button>
                            )}
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                name="firstname"
                                value={editedUser.firstname}
                                onChange={handleInputChange}
                                className="form-control mb-2"
                                placeholder="First Name"
                            />
                            <input
                                type="text"
                                name="surname"
                                value={editedUser.surname}
                                onChange={handleInputChange}
                                className="form-control mb-2"
                                placeholder="Surname"
                            />
                            <textarea
                                name="bio"
                                value={editedUser.attributes.bio}
                                onChange={handleInputChange}
                                className="form-control mb-2"
                                placeholder="Bio"
                            />
                            <input
                                type="text"
                                name="location"
                                value={editedUser.attributes.location}
                                onChange={handleInputChange}
                                className="form-control mb-2"
                                placeholder="Location"
                            />
                            <input
                                type="text"
                                name="gender"
                                value={editedUser.attributes.gender}
                                onChange={handleInputChange}
                                className="form-control mb-2"
                                placeholder="Gender"
                            />
                            <input
                                type="number"
                                name="age"
                                value={editedUser.attributes.age}
                                onChange={handleInputChange}
                                className="form-control mb-2"
                                placeholder="Age"
                            />
                            <div className="d-flex justify-content-center gap-2">
                                <button onClick={handleSave} className="btn btn-outline-success">
                                    <FaSave className="me-2" /> Save
                                </button>
                                <button onClick={handleCancel} className="btn btn-outline-danger">
                                    <FaTimes className="me-2" /> Cancel
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {page === AppRoutes.home && (
                <button
                    type="button"
                    className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                    data-bs-toggle="modal"
                    data-bs-target="#postModal"
                >
                    <FaUserPlus className="me-2" /> Search for a friend
                </button>
            )}
        </>
    );
};

export default Profile;
