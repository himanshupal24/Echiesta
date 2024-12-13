import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'; // For unique screenshot IDs

const PaymentPage = () => {
    const [transactionId, setTransactionId] = useState('');
    const [screenshot, setScreenshot] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [registrationData, setRegistrationData] = useState(null); // Store user registration data
    const navigate = useNavigate();
    const db = getFirestore();
    const storage = getStorage();

    useEffect(() => {
        // Fetch registration data from localStorage
        const storedData = JSON.parse(localStorage.getItem('registrationData'));
        if (!storedData) {
            navigate('/registration');
        } else {
            setRegistrationData(storedData);
        }
    }, [navigate]);

    const handleScreenshotChange = (e) => {
        setScreenshot(e.target.files[0]);
    };

    const uploadScreenshot = async (file) => {
        const uniqueFileName = `${uuidv4()}-${file.name}`;
        const storageRef = ref(storage, `screenshots/${uniqueFileName}`);

        try {
            const snapshot = await uploadBytes(storageRef, file);
            const downloadUrl = await getDownloadURL(snapshot.ref);
            return downloadUrl;
        } catch (error) {
            console.error('Error uploading screenshot:', error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null); // Clear previous errors

        if (!transactionId || !screenshot) {
            setErrorMessage('Please provide a Transaction ID and screenshot.');
            return;
        }

        setLoading(true);

        try {
            // Upload screenshot to Firebase Storage
            const screenshotUrl = await uploadScreenshot(screenshot);
            if (!screenshotUrl) {
                throw new Error('Screenshot upload failed');
            }

            // Save payment details and user registration data to Firestore in a single collection
            await addDoc(collection(db, 'registrations'), {
                ...registrationData, // Spread the registration data
                transactionId, // Add the transaction ID
                screenshotUrl, // Add the screenshot URL
                timestamp: new Date(), // Add the current timestamp
            });

            // Show success popup
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error('Error processing payment:', error);
            setErrorMessage('Failed to process payment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center m-20 p-4 bg-gray-600 rounded-lg text-center shadow-md">
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600">
                            🎉 Payment Success!
                        </h2>
                        <p className="text-lg">
                            Your payment has been processed!
                        </p>
                        <p className="mt-2">
                            Check your email for the entry pass. See you at the
                            event!
                        </p>
                    </div>
                </div>
            )}

            <h1 className="text-4xl mb-6 text-white">Payment Confirmation</h1>
            <div className="flex justify-center w-full h-full mb-4 ">
                {/* Static QR Code */}
                <img src="QR.png" alt="Static QR Code" width={400} />
            </div>
            <p className="mb-4 text-white">
                Please scan the QR code and complete your payment of{' '}
                <span className="text-green-500">
                    ₹{registrationData?.totalFee || 'Error! Register again'}
                </span>
            </p>

            {errorMessage && (
                <p className="text-red-500 mb-4">{errorMessage}</p>
            )}

            <form onSubmit={handleSubmit} className="mt-4 w-full max-w-md">
                <div className="mb-4">
                    <label className="block mb-2 text-white">
                        Paste the Transaction ID (12 characters)
                    </label>
                    <input
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-200"
                        required
                        placeholder="Enter your Transaction ID"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-white">
                        Upload Payment Screenshot
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleScreenshotChange}
                        className="w-full p-2 rounded-md bg-gray-200"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <svg
                                className="animate-spin h-5 w-5 mr-3 text-white"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                ></path>
                            </svg>
                            Processing...
                        </div>
                    ) : (
                        'Submit Payment Details'
                    )}
                </button>
            </form>
        </div>
    );
};

export default PaymentPage;
