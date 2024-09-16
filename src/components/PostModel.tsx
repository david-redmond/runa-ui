import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import http from "../http";

const PostModal: React.FC = () => {
    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [maidenName, setMaidenName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [lastLocation, setLastLocation] = useState('');
    const [schoolWorkplace, setSchoolWorkplace] = useState('');
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const modalElement = document.getElementById('postModal') as HTMLDivElement;
        const modalInstance = new (window as any).bootstrap.Modal(modalElement);

        if (isModalOpen) {
            modalInstance.show();
        } else {
            modalInstance.hide();
        }
    }, [isModalOpen]);

    const handleSubmit = async () => {
        if (firstname.trim() && surname.trim() && age.trim() && lastLocation.trim() && schoolWorkplace.trim()) {
            setIsSubmitting(true);

            let title = '';
            if (!!firstname) title = title + " " + firstname;
            if (!!surname) title = title + " " + surname;
            if (!!maidenName) title = title + " nee " + maidenName;

            const formData = {
                title,
                description: message,
                attributes: {
                    firstname,
                    surname,
                    maidenName: !!maidenName ? maidenName : null,
                    gender,
                    age,
                    lastLocation,
                    schoolWorkplace,
                }
            };

            try {
                await http.post('/posts', formData);
                setFirstname('');
                setSurname('');
                setMaidenName('');
                setGender('');
                setAge('');
                setLastLocation('');
                setSchoolWorkplace('');
                setMessage('');
                setIsModalOpen(false);
                dispatch({ type: 'ADD_POST' });
            } catch (error) {
                console.error('Failed to submit post:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const Genders = ['male', 'female', 'other'];

    const AgeGroups = [
        {id: '<=35', title: 'Under 35'},
        {id: '35-45', title: '35 - 45'},
        {id: '45-55', title: '45 - 55'},
        {id: '55-65', title: '55 - 65'},
        {id: '65-75', title: '65 - 75'},
        {id: '75-85', title: '75 - 85'},
        {id: '85+', title: 'Over 85'}
    ];

    return (
        <div
            className="modal fade"
            id="postModal"
            tabIndex={-1}
            aria-labelledby="postModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="postModalLabel">
                            Find an old friend
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => setIsModalOpen(false)}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Gender</label>
                            <div className="flex-row flex">
                                {Genders.map(_gender => (
                                    <div className="form-check mx-auto d-inline-flex">
                                        <input
                                            type="checkbox"
                                            id={_gender}
                                            className="form-check-input"
                                            checked={gender === _gender}
                                            onChange={() => setGender(_gender)}
                                            disabled={isSubmitting}
                                        />
                                        <label htmlFor={_gender} className="form-check-label text-capitalize ms-2 me-4">{_gender}</label>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="firstname" className="form-label">First Name</label>
                            <input
                                type="text"
                                id="firstname"
                                className="form-control"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                placeholder="First Name"
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="surname" className="form-label">Surname</label>
                            <input
                                type="text"
                                id="surname"
                                className="form-control"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                placeholder="Surname"
                                disabled={isSubmitting}
                            />
                        </div>
                        {(gender === 'female' || gender === 'other') && (
                            <div className="mb-3">
                                <label htmlFor="maidenName" className="form-label">Maiden Name</label>
                                <input
                                    type="text"
                                    id="maidenName"
                                    className="form-control"
                                    value={maidenName}
                                    onChange={(e) => setMaidenName(e.target.value)}
                                    placeholder="Maiden Name"
                                    disabled={isSubmitting}
                                />
                            </div>
                        )}
                        <div className="mb-3">
                            <label className="form-label mb-2 d-block">Approximate Age</label>
                            {AgeGroups.map((group) => (
                                <div className="form-check mx-auto d-inline-flex flex-lg-wrap" key={group.id}>
                                    <input
                                        type="radio"
                                        id={group.id}
                                        className="form-check-input"
                                        checked={age === group.id}
                                        onChange={() => setAge(group.id)}
                                        disabled={isSubmitting}
                                    />
                                    <label htmlFor={group.id} className="form-check-label ms-2 me-4">{group.title}</label>
                                </div>
                            ))}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastLocation" className="form-label">Last Known Location</label>
                            <input
                                type="text"
                                id="lastLocation"
                                className="form-control"
                                value={lastLocation}
                                onChange={(e) => setLastLocation(e.target.value)}
                                placeholder="Last Known Location"
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="schoolWorkplace" className="form-label">School/Workplace</label>
                            <input
                                type="text"
                                id="schoolWorkplace"
                                className="form-control"
                                value={schoolWorkplace}
                                onChange={(e) => setSchoolWorkplace(e.target.value)}
                                placeholder="School or Workplace"
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea
                                id="message"
                                className="form-control"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Enter your message"
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setIsModalOpen(false)}
                            disabled={isSubmitting}
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={
                                !firstname.trim() ||
                                !surname.trim() ||
                                !age.trim() ||
                                !lastLocation.trim() ||
                                !schoolWorkplace.trim() ||
                                isSubmitting
                            }
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostModal;