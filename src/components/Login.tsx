import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FacebookLoginButton from '@greatsumini/react-facebook-login';
import { setUser } from '../store/userSlice';
import { FaFacebookF, FaUserPlus, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import {httpAuth} from "../http";
import getUser from "../api/getUser";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [firstname, setFirstname] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isRegistering, setIsRegistering] = useState<boolean>(false);

    const dispatch = useDispatch();

    const handleResponse = async (response: any) => {
        const { email, name, picture } = response;

        try {
           await httpAuth.post('/auth/facebook', {
                email,
                name,
                picture: picture.data.url
            });

            dispatch(setUser({ email, name, picture }));

        } catch (error) {
            console.error('Error saving Facebook user:', error);
            setError('Failed to authenticate with Facebook. Please try again.');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (isRegistering) {
            if (password !== passwordConfirm) {
                setError('Passwords do not match.');
                setLoading(false);
                return;
            }

            try {
                await httpAuth.post('/auth/register', {
                    email,
                    password,
                    firstname,
                    surname
                });

                await getUser(setError, dispatch);

            } catch (error: any) {
                console.error('Registration error:', error);
                setError('Failed to register. Please try again.');
            } finally {
                setLoading(false);
            }
        } else {
            try {
                await httpAuth.post('/auth/login', {
                    email,
                    password
                });

                await getUser(setError, dispatch);

            } catch (error: any) {
                console.error('Login error:', error);
                setError('Failed to login. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    const toggleRegister = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-body p-4">
                            <h3 className="card-title text-center mb-4">
                                {isRegistering ? 'Create an Account' : 'Welcome Back'}
                            </h3>
                            <p className="text-center text-muted mb-4">
                                {isRegistering ? 'Register to get started' : 'Sign in to continue'}
                            </p>
                            <div className="d-grid gap-2 mb-4">
                                <FacebookLoginButton
                                    appId="1031187395350633"
                                    onFail={(error) => console.error('Login failed:', error)}
                                    onProfileSuccess={handleResponse}
                                    render={({ onClick }) => (
                                        <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center" onClick={onClick}>
                                            <FaFacebookF className="me-2" /> Login with Facebook
                                        </button>
                                    )}
                                />
                            </div>
                            <hr />
                            <form onSubmit={handleSubmit}>
                                {isRegistering && (
                                    <>
                                        <div className="mb-3">
                                            <label htmlFor="firstname" className="form-label">First Name</label>
                                            <div className="input-group">
                                                <span className="input-group-text"><FaUser /></span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="firstname"
                                                    placeholder="Enter your first name"
                                                    value={firstname}
                                                    onChange={(e) => setFirstname(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="surname" className="form-label">Surname</label>
                                            <div className="input-group">
                                                <span className="input-group-text"><FaUser /></span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="surname"
                                                    placeholder="Enter your surname"
                                                    value={surname}
                                                    onChange={(e) => setSurname(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><FaEnvelope /></span>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><FaLock /></span>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                {isRegistering && (
                                    <div className="mb-3">
                                        <label htmlFor="passwordConfirm" className="form-label">Confirm Password</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><FaLock /></span>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="passwordConfirm"
                                                placeholder="Confirm your password"
                                                value={passwordConfirm}
                                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                )}
                                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? (isRegistering ? 'Registering...' : 'Signing In...') : (isRegistering ? 'Register' : 'Sign In')}
                                </button>
                            </form>
                            <div className="text-center mt-4">
                                <button
                                    className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                                    onClick={toggleRegister}
                                >
                                    <FaUserPlus className="me-2" /> {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
