import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    collection,
    query,
    where,
    getDocs,
    getDoc,
    setDoc,
    doc,
} from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Import Firestore instance
import Loader from '../loader/Loader';

const notify = (msg) => {
    toast(msg, {
        closeOnClick: true,
        position: 'bottom-right',
        autoClose: 5000,
        theme: 'dark',
    });
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Firebase Google login provider
    const googleProvider = new GoogleAuthProvider();

    const addUserToFirestore = async (user) => {
        try {
            const q = query(
                collection(db, 'users'),
                where('email', '==', user.email)
            );
            const queryEmailSnapshot = await getDocs(q);
            if (queryEmailSnapshot.empty) {
                try {
                    await setDoc(doc(db, 'users', user.uid), {
                        email: user.email,
                        isAdmin: false,
                        createdAt: new Date(),
                    });
                    notify('User added to Firestore');
                    console.log('User added to Firestore');
                } catch (error) {
                    notify(error.message);
                    console.error('Error adding user to Firestore:', error);
                }
            }
        } catch (error) {
            console.error('Error checking user role:', error);
            notify(error.message);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // Firebase email and password login
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            await addUserToFirestore(user);
            await checkUserRole(user.uid); // Check user role
        } catch (error) {
            console.error('Error logging in:', error);
            notify(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            // Firebase Google login
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            await addUserToFirestore(user);
            await checkUserRole(user.uid); // Check user role
        } catch (error) {
            console.error('Error logging in with Google:', error);
            notify(error.message);
        } finally {
            setLoading(false);
        }
    };

    const checkUserRole = async (userId) => {
        try {
            // Retrieve user document from Firestore
            const userDoc = await getDoc(doc(db, 'users', userId));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                if (userData.isAdmin) {
                    navigate('/admin-dashboard'); // Redirect to admin dashboard if the user is an admin
                } else {
                    navigate('/');
                }
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Error checking user role:', error);
            notify(error.message);
        }
    };

    return (
        <>
            {loading && <Loader />}
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                    <h1 className="text-2xl font-bold mb-4">Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Log In
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-gray-600 mb-2">or log in with</p>
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Log In with Google
                        </button>
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link
                                to="/signup"
                                className="text-blue-500 hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
                <ToastContainer limit={1} />
            </div>
        </>
    );
};

export default Login;
