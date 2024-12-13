import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import axios from 'axios';
import QRCodeGenerator from './QRCodeGeneratorforconcert';
import Modal from './Modal';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../loader/Loader';

const Concert = () => {
    const [formData, setFormData] = useState({
        name: '',
        fatherName: '',
        phoneNumber: '',
        email: '',
        address: '',
        city: '',
        dateOfBirth: '',

        registrationType: '', // New field for registration type
        rollNumber: '',
        passingYear: '',
        schoolName: '',
        collegeName: '',
        aadharNumber: '',
        event: 'Concert',
    });
    const [verify, setVerify] = useState(false);
    const [OTP, setOTP] = useState({
        generatedOTP: '',
        enteredOTP: '',
    });
    const [Countdown, setCountdown] = useState(59);
    const [isCounting, setCounting] = useState(false);
    const [verifiedSuccesfully, setVerifiedSuccesfully] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [modalMessage, setModalMessage] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) setUser(currentUser);
            else navigate('/signup');
        });
        return () => unsubscribe();
    }, [navigate]);

    const notify = (msg) => {
        toast(msg, {
            closeOnClick: true,
            position: 'bottom-right',
            autoClose: 5000,
            theme: 'dark',
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.fatherName.trim())
            newErrors.fatherName = "Father's Name is required";
        if (
            !formData.phoneNumber.trim() ||
            !/^\d{10}$/.test(formData.phoneNumber)
        )
            newErrors.phoneNumber = 'Valid 10-digit phone number is required';
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = 'Valid email is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.dateOfBirth)
            newErrors.dateOfBirth = 'Date of Birth is required';

        if (!formData.registrationType)
            newErrors.registrationType = 'Select registration type';

        if (!formData.aadharNumber.trim()) {
            newErrors.aadharNumber = 'Aadhar Number is required';
        }

        if (
            formData.registrationType === 'EIT Student' &&
            !formData.rollNumber.trim()
        )
            newErrors.rollNumber = 'Roll Number is required for EIT Students';
        if (
            formData.registrationType === 'Alumni' &&
            !formData.passingYear.trim()
        )
            newErrors.passingYear = 'Passing Year is required for Alumni';
        if (
            formData.registrationType === 'School Student' &&
            !formData.schoolName.trim()
        )
            newErrors.schoolName =
                'School Name is required for School Students';
        if (
            formData.registrationType === 'Other College Student' &&
            !formData.collegeName.trim()
        )
            newErrors.collegeName =
                'College Name is required for College Students';
        if (OTP.enteredOTP !== OTP.generatedOTP)
            newErrors.OTP = 'OTP does not match';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const checkEmailExists = async (email, phone) => {
        const q = query(
            collection(db, 'concertRegistrations'),
            where('email', '==', email)
        );
        const queryEmailSnapshot = await getDocs(q);

        const q1 = query(
            collection(db, 'concertRegistrations'),
            where('phoneNumber', '==', phone)
        );
        const queryPhoneSnapshot = await getDocs(q1);

        const emailExists = !queryEmailSnapshot.empty;
        const phoneExists = !queryPhoneSnapshot.empty;

        let msg = '';
        if (emailExists && phoneExists) {
            msg = 'email and phone number';
        } else if (emailExists) {
            msg = 'email';
        } else if (phoneExists) {
            msg = 'phone number';
        }

        // Return msg and true if either exists
        return [msg, emailExists || phoneExists];
    };

    const generateOTP = () => {
        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        setOTP((prevOTP) => ({ ...prevOTP, generatedOTP: OTP }));
        return OTP;
    };

    const handleChangeOTP = (e) => {
        setOTP({
            ...OTP,
            enteredOTP: e.target.value,
        });
    };

    const handleSendOTP = async (e) => {
        if (verifiedSuccesfully) {
            notify('Phone number already verified!');
            setCountdown(59);
            return;
        }
        e.preventDefault();
        if (
            !formData.phoneNumber.trim() ||
            !/^\d{10}$/.test(formData.phoneNumber)
        ) {
            return setErrors({
                ...errors,
                phoneNumber: 'Valid 10-digit phone number is required',
            });
        }

        if (isCounting) {
            notify(`Please wait for ${Countdown} seconds before sending OTP.`);
            return;
        }

        let otp = generateOTP();
        setErrors({
            ...errors,
            phoneNumber: '',
        });

        try {
            const response = await axios.post(
                'https://smtp.echiesta.com/send-sms',
                {
                    Phno: formData.phoneNumber,
                    Msg: `Thank%20you%20for%20registering%20for%20Echiesta%202024.%20Your%20OTP%20is%20${otp}.%20Echelon%20Institute%20of%20Technology%21%20visit%20www.eitfaridabad.com%20or%20call%20%2B919999753763%20for%20more%20updates.`,
                    TemplateID: '1707173028506376365',
                }
            );

            if (response.data.Status === 'OK') {
                setModalMessage(`OTP send to ${formData.phoneNumber}.`);
                setModalVisible(true);
                setVerify(true);
            } else {
                setModalMessage(`Network Issue, try again`);
                setModalVisible(true);
            }
        } catch (error) {
            console.error(error);
            setModalMessage(`${error}.`);
            setModalVisible(true);
        }
        setCounting(true);
        let timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown === 0) {
                    setCounting(false);
                    clearInterval(timer);
                    return 59;
                }
                return prevCountdown - 1;
            });
        }, 1000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        if (!validateForm()) return;
        setLoading(true);

        if (!verify) {
            setErrors({
                ...errors,
                phoneNumber: 'Please verify your phone number',
            });
            setLoading(false);
            return;
        }

        if (OTP.enteredOTP !== OTP.generatedOTP) {
            setErrors({
                ...errors,
                OTP: 'OTP does not match',
            });
            setLoading(false);
            return;
        }

        const date = new Date(formData.dateOfBirth);

        if (date > new Date()) {
            setErrors({
                ...errors,
                dateOfBirth: 'Date of Birth cannot be in the future',
            });
            setLoading(false);
            return;
        }

        if (date.getFullYear() < 1900) {
            setErrors({
                ...errors,
                dateOfBirth: 'Invalid Date of Birth',
            });
            setLoading(false);
            return;
        }

        if (date.getFullYear() > 2009) {
            setErrors({
                ...errors,
                dateOfBirth: 'You must be at least 15 years old',
            });
            setLoading(false);
            return;
        }

        try {
            const [msg, emailExists] = await checkEmailExists(
                formData.email,
                formData.phoneNumber
            );

            if (emailExists) {
                setModalMessage(
                    `This ${msg} is already registered for entry passes!`
                );
                setModalVisible(true);
                setLoading(false);
                return;
            }

            const docRef = await addDoc(
                collection(db, 'concertRegistrations'),
                formData
            );

            await QRCodeGenerator.sendQR({
                ...formData,
                id: docRef.id,
            });
            setModalMessage(
                'Form submitted successfully. Check your email for the entry pass.'
            );
            setModalVisible(true);
            setFormData({
                name: '',
                fatherName: '',
                phoneNumber: '',
                email: '',
                address: '',
                city: '',
                dateOfBirth: '',
                registrationType: '',
                rollNumber: '',
                passingYear: '',
                schoolName: '',
                collegeName: '',
                aadharNumber: '',
            });
            setVerifiedSuccesfully(false);
            setTimeout(() => {
                navigate('/dashboard');
            }, 10000);
        } catch (error) {
            setModalMessage('Error submitting form, please try again.');
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen flex justify-center items-center bg-custom-blue p-4 overflow-y-hidden">
            {/* Wrapper for Image and Form Sections */}
            {loading && <Loader />}

            <div className="flex flex-col lg:flex-row items-center max-w-4xl w-full gap-8">
                {/* Form Section */}
                <div className="lg:w-1/2 w-full p-8 bg-white shadow-lg rounded flex flex-col justify-center lg:h-[95vh] flex-grow overflow-y-auto">
                    <h1 className="text-5xl md:text-6xl font-heading border-b-2 border-red-600 text-center mb-2">
                        Echiesta<span className="text-red-500"> 2K24</span>
                    </h1>
                    <h2 className="text-2xl md:text-4xl font-heading text-center mb-6 md:mb-8">
                        <span className="text-red-500">Concert</span>{' '}
                        Registration
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <InputField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <InputField
                            label="Father's Name"
                            name="fatherName"
                            value={formData.fatherName}
                            onChange={handleChange}
                            error={errors.fatherName}
                        />
                        {/* Registration Type Dropdown */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Registration Type
                            </label>
                            <select
                                name="registrationType"
                                value={formData.registrationType}
                                onChange={handleChange}
                                className={`w-full p-2 border ${
                                    errors.registrationType
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                } rounded mt-1`}
                            >
                                <option value="">Select</option>
                                <option value="EIT Student">
                                    Echelon Institute of Technology
                                </option>
                                <option value="Alumni">EIT Alumni</option>
                                <option value="School Student">
                                    School Student
                                </option>
                                <option value="Other College Student">
                                    Others
                                </option>
                            </select>
                            {errors.registrationType && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.registrationType}
                                </p>
                            )}
                        </div>
                        {/* Conditionally Rendered Fields */}
                        {formData.registrationType === 'EIT Student' && (
                            <InputField
                                label="Roll Number"
                                name="rollNumber"
                                value={formData.rollNumber}
                                onChange={handleChange}
                                error={errors.rollNumber}
                            />
                        )}
                        {formData.registrationType === 'Alumni' && (
                            <InputField
                                label="Passing Year"
                                name="passingYear"
                                value={formData.passingYear}
                                onChange={handleChange}
                                error={errors.passingYear}
                            />
                        )}
                        {formData.registrationType === 'School Student' && (
                            <InputField
                                label="School Name"
                                name="schoolName"
                                value={formData.schoolName}
                                onChange={handleChange}
                                error={errors.schoolName}
                            />
                        )}
                        {formData.registrationType ===
                            'Other College Student' && (
                            <InputField
                                label="College Name"
                                name="collegeName"
                                value={formData.collegeName}
                                onChange={handleChange}
                                error={errors.collegeName}
                            />
                        )}
                        <div className="w-full space-y-2">
                            <InputFieldWithButton
                                label="Phone Number"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                handleClick={handleSendOTP}
                                disabled={verifiedSuccesfully}
                                error={errors.phoneNumber}
                                buttonText={
                                    Countdown === 59 ? 'Send' : Countdown
                                }
                            />

                            {/* OTP Field */}
                            {verify && !verifiedSuccesfully && (
                                <>
                                    <InputFieldWithButton
                                        label="OTP"
                                        name="enteredOTP"
                                        value={OTP.enteredOTP}
                                        onChange={handleChangeOTP}
                                        handleClick={() => {
                                            if (
                                                OTP.enteredOTP ===
                                                OTP.generatedOTP
                                            ) {
                                                setVerifiedSuccesfully(true);
                                            } else {
                                                setErrors({
                                                    ...errors,
                                                    OTP: 'OTP does not match',
                                                });
                                            }
                                        }}
                                        buttonText="Verify"
                                        error={errors.OTP}
                                    />
                                    <p className="text-xs text-gray-500">
                                        Please verify your phone number by
                                        entering the OTP sent to your phone.
                                    </p>
                                </>
                            )}
                            {verifiedSuccesfully && (
                                <p className="text-green-500 text-xs">
                                    Phone number verified!
                                </p>
                            )}
                        </div>

                        <InputField
                            label="E-mail"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <InputField
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            error={errors.address}
                        />
                        <InputField
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            error={errors.city}
                        />
                        <InputField
                            label="Date of Birth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            error={errors.dateOfBirth}
                        />

                        <InputField
                            label="Aadhar Number"
                            name="aadharNumber"
                            value={formData.aadharNumber}
                            onChange={handleChange}
                            error={errors.aadharNumber}
                        />

                        <button
                            type="submit"
                            className="bg-violet-900 hover:bg-violet-600 text-white px-4 py-2 rounded w-full mt-4 transition-transform duration-300 ease-in-out transform hover:scale-105"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Get Your Entry Pass'}
                        </button>
                    </form>
                </div>

                {/* Modal Component */}
                {isModalVisible && (
                    <Modal
                        message={modalMessage}
                        onClose={() => setModalVisible(false)}
                    />
                )}

                {/* Image Section */}
                <div
                    className="lg:w-1/2 w-full h-[100vh] lg:h-[95vh] bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden relative flex-grow"
                    style={{ backgroundImage: 'url(/ag.webp)' }}
                >
                    {/* Optional Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50"></div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Concert;

// InputField Component
const InputField = ({ label, name, value, onChange, type = 'text', error }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full p-2 border ${
                error ? 'border-red-500' : 'border-gray-300'
            } rounded mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

// InputField Component
const InputFieldWithButton = ({
    label,
    name,
    value,
    onChange,
    type = 'text',
    handleClick,
    error,
    disabled,
    buttonText = 'Send',
}) => (
    <div>
        <div className="flex w-full gap-1 items-end">
            <div className="flex-[8]">
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`w-full px-2 h-10 border ${
                        error ? 'border-red-500' : 'border-gray-300'
                    } rounded mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                />
            </div>
            <div className="flex-[2]">
                <button
                    type="button"
                    className="w-full bg-violet-900 text-white text-center h-10 rounded text-sm"
                    onClick={handleClick}
                >
                    {buttonText}
                </button>
            </div>
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);
