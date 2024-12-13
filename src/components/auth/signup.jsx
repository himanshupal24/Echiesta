import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';
import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
} from 'firebase/firestore';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

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

    const notify = (msg) => {
        toast(msg, {
            closeOnClick: true,
            position: 'bottom-right',
            autoClose: 5000,
            theme: 'dark',
        });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            notify('Passwords do not match!');

            return;
        }

        try {
            // Firebase email and password sign-up
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            await addUserToFirestore(user); // Add user to Firestore
            axios.post('https://smtp.echiesta.com/send-email', {
                email: user.email,
                subject: `Welcome to Echiesta`,
                text: `Hello, ${
                    user.email.split('@')[0]
                }! Welcome to Echiesta. We are excited to have you on board. Please feel free to explore the brochure for the events.\nBrochure: https://echiesta.com/Brochure.pdf\nRules: https://echiesta.com/Rule_Book.pdf\n\nBest Regards,\nEchiesta Team`,
            }); // Send email
            navigate('/'); // Redirect to home page after successful sign-up
        } catch (error) {
            console.error('Error signing up:', error);
            notify(error.message);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            // Firebase Google sign-up
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            await addUserToFirestore(user); // Add user to Firestore
            axios.post('https://smtp.echiesta.com/send-email', {
                email: user.email,
                subject: `Welcome to Echiesta`,
                text: `Hello, ${user.displayName}! Welcome to Echiesta. We are excited to have you on board. Please feel free to explore the brochure for the events.\nBrochure: https://echiesta.com/Brochure.pdf\nRules: https://echiesta.com/Rule_Book.pdf\n\nBest Regards,\nEchiesta Team`,
            });
            navigate('/'); // Redirect to home page after successful sign-up
        } catch (error) {
            console.error('Error signing up with Google:', error);
            notify(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

                <form onSubmit={handleSignUp}>
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

                    <div className="mb-4">
                        <label className="block mb-2">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-gray-600 mb-2">or sign up with</p>
                    <button
                        onClick={handleGoogleSignUp}
                        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Sign Up with Google
                    </button>
                </div>

                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <a
                            href="/login"
                            className="text-blue-500 hover:underline"
                        >
                            Log in
                        </a>
                    </p>
                </div>
            </div>
            <ToastContainer limit={1} />
        </div>
    );
};

export default SignUp;
