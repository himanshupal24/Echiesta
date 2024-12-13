import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import RegistrationItem from './RegistrationItem';
import DownloadExcel from './DownloadExcel';

const RegistrationDetails = () => {
    const [registrations, setRegistrations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [filterDate, setFilterDate] = useState(null);
    const [tab, setTab] = useState('all');

    // Fetch registrations and categories from Firestore
    const fetchRegistrations = async () => {
        try {
            const registrationCollection = collection(db, 'registrations');
            const snapshot = await getDocs(registrationCollection);
            const registrationsList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setRegistrations(registrationsList);
            const uniqueCategories = [
                ...new Set(registrationsList.map((reg) => reg.category)),
            ];
            setCategories(uniqueCategories);
        } catch (error) {
            console.error('Error fetching registrations: ', error);
            setError('Failed to load registrations.');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchRegistrations();
            setLoading(false);
        };

        fetchData();
    }, []);

    // Filter registrations based on the selected date and category
    const filteredRegistrations = registrations.filter((registration) => {
        const matchesDate = filterDate
            ? new Date(registration.registrationDate).toLocaleDateString() ===
              new Date(filterDate).toLocaleDateString()
            : true;
        const matchesCategory = selectedCategory
            ? registration.category === selectedCategory
            : true;
        return matchesDate && matchesCategory;
    });

    const displayedRegistrations = filteredRegistrations.filter(
        (registration) => {
            if (tab === 'all') return true;
            return registration.status === tab;
        }
    );

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
                Registration Details
            </h1>

            {/* Category Dropdown Filter */}
            <div className="flex flex-col md:flex-row mb-4 space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-auto">
                    <label
                        htmlFor="categoryFilter"
                        className="block mb-2 font-bold"
                    >
                        Filter by Category:
                    </label>
                    <select
                        id="categoryFilter"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border p-2 rounded w-full"
                    >
                        <option value="">All Categories</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Filter by Date */}
                <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center">
                    <div>
                        <label
                            htmlFor="dateFilter"
                            className="block mb-2 font-bold"
                        >
                            Filter by Date:
                        </label>
                        <div className="flex">
                            <input
                                type="date"
                                id="dateFilter"
                                value={selectedDate}
                                onChange={(e) =>
                                    setSelectedDate(e.target.value)
                                }
                                className="border p-2 rounded w-full"
                            />
                            <button
                                className="mt-2 md:mt-0 md:ml-2 bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto"
                                onClick={() => setFilterDate(selectedDate)}
                            >
                                Filter
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Filters */}
            <div className="flex flex-col md:flex-row mb-4 text-sm md:text-base space-y-2 md:space-y-0 md:space-x-4">
                <button
                    className={`px-4 py-2 rounded w-full md:w-auto ${
                        tab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-400'
                    }`}
                    onClick={() => setTab('all')}
                >
                    All Registrations {registrations.length}
                </button>
                <button
                    className={`px-4 py-2 rounded w-full md:w-auto ${
                        tab === 'approved'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-400'
                    }`}
                    onClick={() => setTab('approved')}
                >
                    Approved{' '}
                    {
                        registrations.filter((reg) => reg.status === 'approved')
                            .length
                    }
                </button>
                <button
                    className={`px-4 py-2 rounded w-full md:w-auto ${
                        tab === 'rejected'
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-400'
                    }`}
                    onClick={() => setTab('rejected')}
                >
                    Rejected{' '}
                    {
                        registrations.filter((reg) => reg.status === 'rejected')
                            .length
                    }
                </button>
                <div className="px-4 py-2 rounded w-full md:w-auto">
                    <DownloadExcel data={displayedRegistrations} />
                </div>
            </div>

            {/* Display Registrations */}
            {loading ? (
                <p>Loading registrations...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : displayedRegistrations.length === 0 ? (
                <p className="text-gray-500">No registrations found.</p>
            ) : (
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
                    <div className="list-disc list-inside">
                        {displayedRegistrations.map((registration, index) => (
                            <div key={registration.id} className="mb-2">
                                <span className="font-bold">{index + 1}.</span>
                                <RegistrationItem registration={registration} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegistrationDetails;
