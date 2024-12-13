import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig.js';
import EVENTS from '../../data/events.json';
import { onAuthStateChanged } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../loader/Loader';
import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    getDocs,
} from 'firebase/firestore';

import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm = () => {
    const db = getFirestore();
    const [formData, setFormData] = useState({
        teamName: '',
        teammates: [],
        email: '',
        mobile: '',
        college: '',
        selectedEvent: null, // Store only one selected event
    });
    const [teamMateCount, setTeamMateCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [totalFee, setTotalFee] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null); // Store selected category
    const [showModal, setShowModal] = useState(false); // Control modal visibility
    const [selectedSubEvent, setSelectedSubEvent] = useState(null); // State to track the selected sub-event
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to track dialog visibility

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                navigate('/signup');
            }
        });
        return () => unsubscribe();
    }, [navigate, teamMateCount]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTeamMateChange = (index, value) => {
        const updatedTeammates = [...formData.teammates];
        updatedTeammates[index] = value;
        setFormData({ ...formData, teammates: updatedTeammates });
    };

    const addTeamMate = () => {
        setTeamMateCount((prevCount) => {
            const newCount = prevCount + 1;
            const entryFee = formData.selectedEvent?.entryFees || 0; // Default to 0 if no event or entry fees is undefined
            setTotalFee(entryFee * newCount); // Update totalFee with the new count
            return newCount;
        });
    };

    const removeTeamMate = (index) => {
        const updatedTeammates = [...formData.teammates];
        updatedTeammates.splice(index, 1);
        updatedTeammates.push('');
        setFormData({ ...formData, teammates: updatedTeammates });
        setTeamMateCount((prevCount) => {
            const newCount = prevCount - 1 > 0 ? prevCount - 1 : 1; // Ensures teammates count doesn't go below 1
            const entryFee = formData.selectedEvent?.entryFees || 0; // Default to 0 if no event or entry fees is undefined
            setTotalFee(entryFee * newCount); // Update totalFee with the new count
            return newCount;
        });
    };

    const handleCategorySelect = (event) => {
        setSelectedCategory(event); // Set the selected category
        setFormData({ ...formData, selectedEvent: null }); // Reset selected event
        setShowModal(true); // Open the modal when a category is selected
    };

    const handleEventSelect = (event, subEvent = null) => {
        const selected = subEvent || event;
        setFormData({ ...formData, selectedEvent: selected });
        setTotalFee(selected.entryFees * teamMateCount);
        setShowModal(false); // Close modal on event selection
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close modal when the user clicks the "X" button
    };

    const handleMoreDetails = (subEvent) => {
        setSelectedSubEvent(subEvent); // Set the selected sub-event for the dialog
        setIsDialogOpen(true); // Open the dialog
    };

    // Function to handle closing the dialog
    const handleCloseDialog = () => {
        setIsDialogOpen(false); // Close the dialog
    };

    const notify = (msg) => {
        toast(msg, {
            closeOnClick: true,
            position: 'bottom-right',
            autoClose: 5000,
            theme: 'dark',
        });
    };

    const checkEmailExists = async (email) => {
        const q = query(
            collection(db, 'registrations'),
            where('email', '==', email)
        );
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty; // Returns true if email exists
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const emailExists = await checkEmailExists(formData.email);
        if (emailExists) {
            notify('This email is already in use. Please use a different one.');
            setFormData({ ...formData, email: '' });
            setLoading(false);
            return;
        }
        if (formData.selectedEvent === null) {
            notify('Please select an event to register.');
            setLoading(false);
        } else {
            if (formData.teammates.filter(Boolean).length === 0) {
                setLoading(false);
                notify('Please add at least one teammate.');
                return;
            }

            if (!currentUser) {
                setLoading(false);
                notify('You must be logged in to register.');
                return;
            }

            if (totalFee === 0) {
                try {
                    // Save payment details and user registration data to Firestore in a single collection
                    await addDoc(collection(db, 'registrations'), {
                        ...formData, // Spread the registration data
                        transactionId: 'Free Event', // Add the transaction ID
                        screenshotUrl: '', // Add the screenshot URL
                        category: selectedCategory.title,
                        userId: currentUser.uid,
                        registrationDate: new Date().toISOString(),
                        timestamp: new Date(), // Add the current timestamp
                    });
                    setLoading(false);

                    setShowPopup(true);
                    setTimeout(() => {
                        setShowPopup(false);
                        navigate('/');
                    }, 5000);
                } catch (error) {
                    setLoading(false);

                    console.error('Error processing request:', error);
                    notify(
                        'Failed to process Registration. Please try again later.'
                    );
                }
            } else {
                // Save registration data to localStorage
                localStorage.setItem(
                    'registrationData',
                    JSON.stringify({
                        userId: currentUser.uid,
                        ...formData,
                        category: selectedCategory.title,
                        totalFee: totalFee,
                        registrationDate: new Date().toISOString(),
                    })
                );
                setLoading(false);

                // Redirect to payment page
                navigate('/payment');
            }
            // try {
            //     await axios.post(
            //         'https://smtp.echiesta.com/send-sms',
            //         {
            //             Phno: formData.mobile,
            //             Msg: `Thank%20you%20for%20registering%20for%20Echiesta%202024.%20Your%20OTP%20is%20${otp}.%20Echelon%20Institute%20of%20Technology%21%20visit%20www.eitfaridabad.com%20or%20call%20%2B919999753763%20for%20more%20updates.`,
            //             TemplateID: '1707173028506376365',
            //         }
            //     );
            // } catch (error) {
            //     console.error(error);
            // }
        }
    };

    return (
        <>
            {loading && <Loader />}
            <div className="p-8 isolate aspect-video rounded-xl bg-gray/20 shadow-lg ring-1 ring-black/5">
                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-4 text-blue-600">
                                🎉 Registration Success!
                            </h2>
                            <p className="text-lg">
                                Your registration has been completed!
                            </p>
                            <p className="mt-2">
                                Entry pass will be send after verification to
                                your email.
                            </p>
                            <p className="mt-2">See you at the event!</p>
                        </div>
                    </div>
                )}
                <h1 className="text-6xl text-white font-heading mb-6">
                    Team Registration Form
                </h1>
                {currentUser ? (
                    <form
                        onSubmit={handleSubmit}
                        className="p-6 rounded-lg shadow-md"
                    >
                        {/* Team Name */}
                        <div className="mb-4">
                            <label
                                htmlFor="teamName"
                                className="block text-white mb-2"
                            >
                                Team Name
                            </label>
                            <input
                                type="text"
                                id="teamName"
                                name="teamName"
                                value={formData.teamName}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 rounded-md bg-gray-700 text-white"
                            />
                        </div>

                        {/* Teammates */}
                        <div className="mb-4">
                            <label className="block text-white mb-2">
                                Teammates
                            </label>
                            {Array.from(
                                { length: teamMateCount },
                                (_, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center mb-2"
                                    >
                                        <input
                                            type="text"
                                            value={
                                                formData.teammates[index] || ''
                                            }
                                            onChange={(e) =>
                                                handleTeamMateChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            className="w-full p-2 rounded-md bg-gray-700 text-white"
                                            placeholder={`Teammate ${
                                                index + 1
                                            }`}
                                            required={index < teamMateCount}
                                        />
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeTeamMate(index)
                                                }
                                                className="ml-2 bg-red-600 text-white px-2 py-1 rounded-lg"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                )
                            )}
                            {teamMateCount < 30 && (
                                <button
                                    type="button"
                                    onClick={addTeamMate}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2"
                                >
                                    + Add Teammate
                                </button>
                            )}
                        </div>
                        {/* Email Field */}
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-white mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="example@example.com"
                                className="w-full p-2 rounded-md bg-gray-700 text-white"
                                required
                            />
                        </div>

                        {/* Mobile Field */}
                        <div className="mb-4">
                            <label
                                htmlFor="mobile"
                                className="block text-white mb-2"
                            >
                                Mobile Number
                            </label>
                            <input
                                type="tel"
                                pattern="[1-9][0-9]{9}"
                                id="mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                maxLength={10}
                                placeholder="XXXXX XXXXX"
                                className="w-full p-2 rounded-md bg-gray-700 text-white"
                                required
                            />
                        </div>

                        {/* College Field */}
                        <div className="mb-4">
                            <label
                                htmlFor="college"
                                className="block text-white mb-2"
                            >
                                College
                            </label>
                            <input
                                type="text"
                                id="college"
                                name="college"
                                value={formData.college}
                                onChange={handleInputChange}
                                placeholder="My College Name"
                                className="w-full p-2 rounded-md bg-gray-700 text-white"
                                required
                            />
                        </div>
                        {/* Event Category Selection */}
                        <div className="mb-4">
                            <label className="block text-white mb-2">
                                Select Event Category
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {EVENTS.map((event) => (
                                    <button
                                        type="button"
                                        key={event.id}
                                        onClick={() =>
                                            handleCategorySelect(event)
                                        }
                                        className={`p-4 text-white bg-gray-700 rounded-md ${
                                            selectedCategory?.id === event.id
                                                ? 'bg-blue-500'
                                                : ''
                                        }`}
                                    >
                                        {event.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sub-Event Selection */}
                        {/* Modal for Sub-Event Selection */}
                        {showModal && selectedCategory && (
                            <div className="fixed inset-0 flex items-center justify-center z-[500] bg-black bg-opacity-50">
                                <div className="relative bg-gray-800 rounded-lg shadow-lg w-4/5 max-w-2xl p-8 overflow-y-auto">
                                    {/* Close Button */}
                                    <button
                                        onClick={handleCloseModal}
                                        className="absolute top-2 right-2 text-white-400 hover:text-gray-200 bg-red-600 px-2 py-2 rounded-sm cursor-pointer"
                                    >
                                        X
                                    </button>

                                    {/* Modal Content - Sub-Event Selection */}
                                    <div className="mb-4">
                                        <label className="text-3xl md:text-6xl font-heading border-b-2 border-red-600 text-center mb-6 md:mb-8 block">
                                            <span className="text-white">
                                                Select
                                            </span>{' '}
                                            <span className="text-red-500">
                                                Event
                                            </span>{' '}
                                        </label>
                                        <div className="h-[80vh] grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-y-scroll">
                                            {selectedCategory.subEvents.map(
                                                (subEvent, index) => (
                                                    <div
                                                        key={index}
                                                        className="mb-4"
                                                    >
                                                        {subEvent.subSubEvents ? (
                                                            <>
                                                                {/* Sub-Event Heading */}
                                                                <h3 className="text-xl text-white font-semibold mb-2">
                                                                    {
                                                                        subEvent.EventTitle
                                                                    }
                                                                </h3>

                                                                {/* List for Sub-Sub Events (Points) */}
                                                                <ul className="list-none space-y-4">
                                                                    {subEvent.subSubEvents.map(
                                                                        (
                                                                            e,
                                                                            i
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    i
                                                                                }
                                                                                onClick={() =>
                                                                                    handleEventSelect(
                                                                                        e
                                                                                    )
                                                                                }
                                                                                className="flex items-center px-1 space-x-4 bg-gray-600 rounded cursor-pointer"
                                                                            >
                                                                                {/* Radio Button on the left */}
                                                                                <input
                                                                                    type="radio"
                                                                                    id={
                                                                                        e.name
                                                                                    }
                                                                                    name="selectedEvent"
                                                                                    value={
                                                                                        e.name
                                                                                    }
                                                                                    checked={
                                                                                        formData
                                                                                            ?.selectedEvent
                                                                                            ?.name ===
                                                                                        e.name
                                                                                    }
                                                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
                                                                                />

                                                                                {/* Event Details Container */}
                                                                                <div className="flex flex-col space-y-1">
                                                                                    {/* Event Name */}
                                                                                    <label
                                                                                        htmlFor={
                                                                                            e.name
                                                                                        }
                                                                                        className="text-lg font-semibold cursor-pointer text-white"
                                                                                    >
                                                                                        {
                                                                                            e.name
                                                                                        }
                                                                                    </label>

                                                                                    {/* Entry Fees and Details */}
                                                                                    <div className="flex items-center justify-between">
                                                                                        {/* Price */}
                                                                                        <span className="text-gray-300 px-3">
                                                                                            ₹
                                                                                            {
                                                                                                e.entryFees
                                                                                            }
                                                                                        </span>

                                                                                        {/* Details Button */}
                                                                                        <button
                                                                                            onClick={() =>
                                                                                                handleMoreDetails(
                                                                                                    e
                                                                                                )
                                                                                            }
                                                                                            className="bg-red-600 text-white px-3 py-1 rounded-lg cursor-pointer"
                                                                                        >
                                                                                            Details
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </>
                                                        ) : (
                                                            /* Fallback for when no subSubEvents exist */
                                                            <div
                                                                onClick={() =>
                                                                    handleEventSelect(
                                                                        subEvent
                                                                    )
                                                                }
                                                                className="flex items-center space-x-4 bg-gray-600 rounded p-4 cursor-pointer"
                                                            >
                                                                {/* Radio Button on the left */}
                                                                <input
                                                                    type="radio"
                                                                    id={
                                                                        subEvent.name
                                                                    }
                                                                    name="selectedEvent"
                                                                    value={
                                                                        subEvent.name
                                                                    }
                                                                    checked={
                                                                        formData
                                                                            ?.selectedEvent
                                                                            ?.name ===
                                                                        subEvent.name
                                                                    }
                                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                />

                                                                {/* Event Details Container */}
                                                                <div className="flex flex-col space-y-1">
                                                                    {/* Event Name */}
                                                                    <label
                                                                        htmlFor={
                                                                            subEvent.name
                                                                        }
                                                                        className="text-lg font-semibold cursor-pointer text-white"
                                                                    >
                                                                        {
                                                                            subEvent.name
                                                                        }{' '}
                                                                        {subEvent.entryFees ===
                                                                        '0'
                                                                            ? '(Free)'
                                                                            : `(₹${subEvent.entryFees})`}
                                                                    </label>

                                                                    {/* Details Button */}
                                                                    <button
                                                                        onClick={() =>
                                                                            handleMoreDetails(
                                                                                subEvent
                                                                            )
                                                                        }
                                                                        className="bg-red-600 text-white px-3 py-1 rounded-lg cursor-pointer"
                                                                    >
                                                                        Details
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Total Fee Display */}
                        <div className="mb-4">
                            <h3 className="text-white text-lg">
                                Selected Event:
                                <span
                                    className={`w-min p-2 rounded-md bg-gray-700 text-green-500 text-center ${
                                        !formData.selectedEvent?.name
                                            ? 'hidden'
                                            : ''
                                    }`}
                                >
                                    {formData.selectedEvent?.name}
                                </span>
                            </h3>
                            <h3 className="text-white text-lg">
                                Total Fee: ₹{totalFee}
                            </h3>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Register
                        </button>
                    </form>
                ) : (
                    <p className="text-red-500">
                        You must be logged in to register.
                    </p>
                )}
                <ToastContainer />

                {/* More Details Dialouge Box */}
                {isDialogOpen && selectedSubEvent && (
                    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
                        <div className="p-6 md:p-10 w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-gray-800 rounded-lg text-white ">
                            <h1 className="text-3xl md:text-6xl font-heading border-b-2 border-red-600 text-center mb-6 md:mb-8">
                                {selectedSubEvent.name.split(' ')[0]}{' '}
                                <span className="text-red-500">
                                    {selectedSubEvent.name.split(' ')[1]}
                                </span>{' '}
                                Event
                            </h1>

                            {selectedSubEvent.image && (
                                <img
                                    src={selectedSubEvent.image}
                                    alt={selectedSubEvent.name}
                                    className="mb-4 mx-auto max-w-full h-auto rounded-lg"
                                />
                            )}
                            <h1 className="text-2xl md:text-4xl font-bold mb-4">
                                Details
                            </h1>
                            {selectedSubEvent.Dates && (
                                <p className="mb-2">
                                    <strong>Event Date:</strong>{' '}
                                    {selectedSubEvent.Dates}
                                </p>
                            )}
                            {selectedSubEvent.entryFees && (
                                <p className="mb-2">
                                    <strong>Entry Fees:</strong>{' '}
                                    {selectedSubEvent.entryFees}
                                </p>
                            )}
                            {selectedSubEvent.TeamSize && (
                                <p className="mb-4">
                                    <strong>Participants :</strong>{' '}
                                    {selectedSubEvent.TeamSize}{' '}
                                    <strong> main </strong>
                                    {selectedSubEvent.Reserve && (
                                        <strong>
                                            {' '}
                                            + {selectedSubEvent.Reserve} reserve
                                        </strong>
                                    )}
                                </p>
                            )}
                            {selectedSubEvent.cashPrize && (
                                <div className="mb-2">
                                    <strong>Cash Prizes:</strong>
                                    <ul>
                                        {Object.keys(
                                            selectedSubEvent.cashPrize
                                        ).map((prizeKey, idx) => (
                                            <li key={idx}>
                                                {prizeKey}: ₹{' '}
                                                {
                                                    selectedSubEvent.cashPrize[
                                                        prizeKey
                                                    ]
                                                }
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {selectedSubEvent.details && (
                                <div className="mt-4 text-left">
                                    {selectedSubEvent.details
                                        .teamComposition && (
                                        <p>
                                            <strong>Team Composition:</strong>{' '}
                                            {
                                                selectedSubEvent.details
                                                    .teamComposition
                                            }
                                        </p>
                                    )}
                                    {selectedSubEvent.details.scoring && (
                                        <p>
                                            <strong>Scoring:</strong>{' '}
                                            {selectedSubEvent.details.scoring}
                                        </p>
                                    )}
                                    {selectedSubEvent.details.gameDuration && (
                                        <p>
                                            <strong>Game Duration:</strong>{' '}
                                            {
                                                selectedSubEvent.details
                                                    .gameDuration
                                            }
                                        </p>
                                    )}
                                </div>
                            )}
                            {selectedSubEvent.members && (
                                <p className="mb-4">
                                    <strong>Members:</strong>{' '}
                                    {selectedSubEvent.members}
                                </p>
                            )}

                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={handleCloseDialog}
                                    className="bg-white text-black px-4 py-2 rounded-lg"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default RegistrationForm;
