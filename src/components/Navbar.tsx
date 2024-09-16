import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import AppRoutes from '../routes';
import App from "../App";

const Navbar: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);

    const handleSignOut = () => sessionStorage.removeItem("token");

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to={AppRoutes.home}>
                    Old Friends
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                    {/*    <li className="nav-item">*/}
                    {/*        <Link className="nav-link" to="/make-a-friend">*/}
                    {/*            Make a Friend*/}
                    {/*        </Link>*/}
                    {/*    </li>*/}
                    {/*    <li className="nav-item">*/}
                    {/*        <Link className="nav-link" to="/more-than-friends">*/}
                    {/*            More Than Friends*/}
                    {/*        </Link>*/}
                    {/*    </li>*/}
                        {user ? (
                            <>
                            <li className="nav-item">
                                <Link className="nav-link" to={AppRoutes.profile}>
                                    Profile
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={handleSignOut}>
                                    Sign Out
                                </button>
                            </li>
                                </>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to={AppRoutes.signIn}>
                                    Sign In
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
