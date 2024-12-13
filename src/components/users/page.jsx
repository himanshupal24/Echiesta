import React, { useState, useEffect } from 'react';
import { auth } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const Users = () => {
    const navigate = useNavigate();
    const [userConcert, setConcertUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (!currentUser) {
                navigate('/login');
            } else {
                try {
                    const q = query(
                        collection(db, 'concertRegistrations'),
                        where('email', '==', currentUser.email)
                    );
                    const queryEmailSnapshot = await getDocs(q);

                    const q1 = query(
                        collection(db, 'registrations'),
                        where('email', '==', currentUser.email)
                    );
                    const queryEventEmailSnapshot = await getDocs(q1);

                    if (!queryEmailSnapshot.empty) {
                        setConcertUser(queryEmailSnapshot.docs[0].data());
                    }
                    if (
                        queryEmailSnapshot.empty &&
                        queryEventEmailSnapshot.empty
                    ) {
                        navigate('/concert');
                    }
                } catch (error) {
                    navigate('/');
                } finally {
                    setLoading(false);
                }
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen flex flex-col items-center bg-blue-50 py-8 px-4 sm:px-6 lg:px-8 select-none">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Welcome {userConcert.name}
            </h1>
            {userConcert && (
                <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
                    <div className="space-y-4">
                        <div className="text-sm">
                            <span className=" font-black ">Father's Name:</span>
                            <span className="text-gray-800">
                                {' '}
                                {userConcert.fatherName}
                            </span>
                        </div>
                        <div className="text-sm">
                            <span className="font-black ">Email:</span>
                            <span className="text-gray-800">
                                {' '}
                                {userConcert.email}
                            </span>
                        </div>
                        <div className="text-sm">
                            <span className="font-black ">Phone Number:</span>
                            <span className="text-gray-800">
                                {' '}
                                {userConcert.phoneNumber}
                            </span>
                        </div>
                        <div className="text-sm">
                            <span className="font-black ">Date of Birth:</span>
                            <span className="text-gray-800">
                                {' '}
                                {userConcert.dateOfBirth}
                            </span>
                        </div>
                        <div className="text-sm">
                            <span className="font-black ">Aadhar Number:</span>
                            <span className="text-gray-800">
                                {' '}
                                {userConcert.aadharNumber}
                            </span>
                        </div>
                        <div className="text-sm">
                            <span className="font-black ">Address:</span>
                            <span className="text-gray-800">
                                {' '}
                                {userConcert.address}
                            </span>
                        </div>
                        <div className="text-sm">
                            <span className="font-black ">City:</span>
                            <span className="text-gray-800">
                                {' '}
                                {userConcert.city}
                            </span>
                        </div>
                        {userConcert.registrationType === 'EIT Student' && (
                            <div className="text-sm">
                                <span className="font-black ">
                                    Roll Number:
                                </span>
                                <span className="text-gray-800">
                                    {' '}
                                    {userConcert.rollNumber}
                                </span>
                            </div>
                        )}
                        {userConcert.registrationType ===
                            'Other College Student' && (
                            <div className="text-sm">
                                <span className="font-black ">
                                    College Name:
                                </span>
                                <span className="text-gray-800">
                                    {' '}
                                    {userConcert.collegeName}
                                </span>
                            </div>
                        )}
                        {userConcert.registrationType === 'School Student' && (
                            <div className="text-sm">
                                <span className="font-black ">
                                    School Name:
                                </span>
                                <span className="text-gray-800">
                                    {' '}
                                    {userConcert.schoolName}
                                </span>
                            </div>
                        )}
                        {userConcert.registrationType === 'Alumni' && (
                            <div className="text-sm">
                                <span className="font-black ">
                                    Passing Year:
                                </span>
                                <span className="text-gray-800">
                                    {' '}
                                    {userConcert.passingYear}
                                </span>
                            </div>
                        )}

                        <div className="text-sm">
                            <span className="font-black ">Event:</span>
                            <span className="text-gray-800">
                                {' '}
                                {userConcert.event}
                            </span>
                        </div>
                        <div className="text-sm">
                            <span className="font-black ">
                                Registration Type:
                            </span>
                            <span className="text-gray-800">
                                {' '}
                                {userConcert.registrationType}
                            </span>
                        </div>
                    </div>
                    {userConcert.qrCodeURL && (
                        <div className="mt-6">
                            <div className="text-center">
                                <img
                                    src={userConcert.qrCodeURL}
                                    alt="Echiesta Concert Ticket"
                                    className="w-50 h-50 mx-auto"
                                />
                                <p className="text-center text-sm text-gray-500 mt-2">
                                    Please present this Entry Pass at the event
                                    venue for entry.
                                </p>
                                <b className="text-center  mt-2">
                                    Bring your aadhar card
                                </b>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {!userConcert && (
                <p className="text-gray-600">No user data available</p>
            )}
        </div>
    );
};

export default Users;
