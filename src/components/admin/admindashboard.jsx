import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Firestore instance

const AdminDashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Check if the user is authenticated and is an admin
    useEffect(() => {
        const checkAdminStatus = async (user) => {
            if (user) {
                try {
                    // Get user document from Firestore
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        if (userData.isAdmin) {
                            setIsAdmin(true); // Set as admin
                        } else {
                            navigate('/'); // Redirect to home if not admin
                        }
                    } else {
                        navigate('/'); // Redirect if user document doesn't exist
                    }
                } catch (err) {
                    console.error('Error fetching user document: ', err);
                    setError('Failed to fetch user data.'); // Set error message
                }
            } else {
                navigate('/login'); // Redirect to login if not logged in
            }
            setLoading(false); // Stop loading
        };

        // Listen to auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            checkAdminStatus(user);
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center text-lg font-semibold">
                    Loading...
                </div>
            </div>
        ); // Center loading message
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen text-red-500 text-lg">
                {error}
            </div>
        ); // Display error message
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            {isAdmin ? (
                <div className="w-full max-w-4xl p-8 bg-white shadow-md rounded-lg">
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        Admin Dashboard
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Manage Users Section */}
                        {/* <div
                            onClick={() =>
                                navigate('/admin-dashboard/manageusers')
                            } // Redirect to manage users
                            className="bg-blue-500 text-white p-6 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                        >
                            <h2 className="text-2xl mb-4">Manage Users</h2>
                            <p>View and manage registered users.</p>
                            <button
                                onClick={() =>
                                    navigate('/admin-dashboard/manageusers')
                                }
                                className="mt-4 bg-white text-blue-500 py-2 px-4 rounded-lg hover:bg-gray-100"
                            >
                                Go to Users
                            </button>
                        </div> */}

                        {/* concert registration */}
                        <div
                            onClick={() =>
                                navigate('/admin-dashboard/concertdetails')
                            }
                            className="bg-gray-500 text-white p-6 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                        >
                            <h2 className="text-2xl mb-4">
                                Concert Registrations
                            </h2>

                            <button
                                onClick={() =>
                                    navigate('/admin-dashboard/concertdetails')
                                }
                                className="mt-4 bg-white text-blue-500 py-2 px-4 rounded-lg hover:bg-gray-100"
                            >
                                concert Registrations{' '}
                            </button>
                        </div>
                        {/* Event Registrations Section */}
                        <div
                            onClick={() =>
                                navigate(
                                    '/admin-dashboard/registrationsdetails'
                                )
                            } // Redirect to event registrations
                            className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                        >
                            <h2 className="text-2xl mb-4">
                                Event Registrations
                            </h2>
                            <p>Manage event registrations and their details.</p>
                            <button
                                onClick={() =>
                                    navigate(
                                        '/admin-dashboard/registrationsdetails'
                                    )
                                }
                                className="mt-4 bg-white text-yellow-500 py-2 px-4 rounded-lg hover:bg-gray-100"
                            >
                                Manage Registrations
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-red-500 text-lg">
                    You do not have access to this page.
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
