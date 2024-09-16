import Stencil from "./Stencil";
import React, {useEffect} from "react";
import {IOtherUser, setOtherUser} from "../store/otherUserSlice";
import getOtherUserData from "../api/getOtherUserData";
import {useDispatch, useSelector} from "react-redux";
import {IUser} from "../store/userSlice";
import {FaEdit} from "react-icons/fa";

const humanTime = (timestamp: string) => {
    const date = new Date(timestamp);

    // Convert to a human-readable format
    const humanReadableDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short', // Use 'short' for abbreviated month names (e.g., Sep)
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        // second: 'numeric',
        hour12: true // Set to true for 12-hour format, false for 24-hour format
    });

    return humanReadableDate
}

interface IProps {
    creator: string;
    createdAt: string;
    isComment?: boolean;
    editParent: () => void;
}

export default ({creator, createdAt, isComment = false, editParent}: IProps) => {
    const dispatch = useDispatch();
    const user: IUser = useSelector((state: any) => state.user.user);
    const canEditPost = useSelector((state: any): boolean => state.user.user._id === creator);
    const author: IOtherUser = useSelector((state: any) => state.otherUser[creator]);
    // Function to fetch other user data
    const fetchOtherUser = async () => {
        // If the current user can edit the post, no need to fetch author details
        if (canEditPost) {
            dispatch(setOtherUser({
                firstname: user.firstname,
                surname: user.surname,
                picture: user.attributes.picture,
                creator: creator
            }))
            return;
        }

        try {
            const data = await getOtherUserData(creator);
            if (data) {
                dispatch(setOtherUser({
                    firstname: data.firstname,
                    surname: data.surname,
                    picture: data.attributes.picture || '',
                    creator: creator
                }));
            }
        } catch (error) {
            console.error('Error fetching other user data:', error);
        }
    };
    // useEffect to run the fetch function on component mount
    useEffect(() => {
        fetchOtherUser();
    }, []); // Adding dependencies to run effect when creator or canEditPost changes

    if (!author || !author.firstname) {
        return <Stencil/>
    }

    const marginBottom = isComment ? "6px" : "20px";
    const nameSize = isComment ? "12px" : "16px";
    const dateSize = isComment ? "10px" : "12px";
    const profilePlaceholder = '/profile-fallback.png';

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: marginBottom,
            width: "100%"
        }}>
            <img
                src={author.picture || profilePlaceholder}
                alt={`${author.firstname} ${author.surname}`}
                className="rounded-circle me-3"
                style={{ width: "40px", height: "40px" }}
            />
            <div className={"flex-grow-1"}>
                <strong style={{fontSize: nameSize}}>{`${author.firstname} ${author.surname}`}</strong>
                <p className="mb-0 text-muted" style={{fontSize: dateSize}}>{humanTime(createdAt)}</p>
            </div>
            {canEditPost && <FaEdit className={"me-0"} style={{cursor: "pointer"}} onClick={editParent} />}
        </div>
    )
}