import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../store';
import Profile from "../components/Profile";
import PostItem from "../components/PostItem";
import http from "../http";
import {setAllPost} from "../store/postSlice";
import AppRoutes from "../routes";
const FindFriend: React.FC = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const postsResponse = await http.get('/posts');
                if (postsResponse.status === 200) {
                    dispatch(setAllPost(postsResponse.data));
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);



    const { posts, currentPage, postsPerPage } = useSelector((state: RootState) => state.posts);

    const startIndex = (currentPage - 1) * postsPerPage;
    const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);



    return (
        <div className="row">
            <div className="col-md-4">
                <Profile page={AppRoutes.home}/>
            </div>
            <div className="col-md-8">
                <div >
                    {currentPosts.map((post) => (
                        <PostItem key={post.id} {...post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FindFriend;
