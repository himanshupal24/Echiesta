import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig'; // Adjust the import based on your firebase config
import { collection, getDocs } from 'firebase/firestore';
import * as XLSX from 'xlsx';
import Loader from '../loader/Loader';

const ConcertDetails = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filterType, setFilterType] = useState(''); // State for filter type

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const querySnapshot = await getDocs(
                    collection(db, 'concertRegistrations')
                );
                const regData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setRegistrations(regData);
            } catch (err) {
                console.error('Error fetching registrations:', err);
                setError('Failed to fetch registrations. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchRegistrations();
    }, []);

    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    };

    const handleDownloadExcel = () => {
        const dataToDownload = filteredRegistrations.map(
            (registration, index) => ({
                'Serial No': index + 1,
                Name: registration.name || 'N/A',
                'Father Name': registration.fatherName || 'N/A',
                'Phone Number': registration.phoneNumber || 'N/A',
                Email: registration.email || 'N/A',
                'Registration Type': registration.registrationType || 'N/A',
                'Date of Birth': registration.dateOfBirth || 'N/A',
                City: registration.city || 'N/A',
                Address: registration.address || 'N/A',
                Entered: registration.entered || 'N/A',
                'College Name': registration.collegeName || 'N/A',
                'Passing Year': registration.passingYear || 'N/A',
                'Roll No': registration.rollNumber || 'N/A',
                'School Name': registration.schoolName || 'N/A',
                'Aadhar Number': registration.aadharNumber || 'N/A',
            })
        );

        // Create a worksheet and set column widths
        const worksheet = XLSX.utils.json_to_sheet(dataToDownload);
        const workbook = XLSX.utils.book_new();

        // Setting column widths
        worksheet['!cols'] = [
            { wch: 10 }, // Serial No
            { wch: 20 }, // Name
            { wch: 20 }, // Father Name
            { wch: 15 }, // Phone Number
            { wch: 25 }, // Email
            { wch: 20 }, // Registration Type
            { wch: 15 }, // Date of Birth
            { wch: 20 }, // City
            { wch: 30 }, // Address
            { wch: 15 }, // Entrance
            { wch: 25 }, // College Name
            { wch: 15 }, // Passing Year
            { wch: 15 }, // Roll No
            { wch: 25 }, // School Name
        ];

        // Append worksheet to workbook and set the sheet name
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

        // Format the header row
        const headerRow = Object.keys(dataToDownload[0]);
        headerRow.forEach((header, index) => {
            const cellRef = XLSX.utils.encode_cell({ r: 0, c: index });
            if (worksheet[cellRef]) {
                worksheet[cellRef].s = {
                    font: { bold: true, color: { rgb: 'FFFFFF' } },
                    fill: { fgColor: { rgb: '4F81BD' } },
                };
            }
        });

        // Write the file
        XLSX.writeFile(workbook, 'Concert_Registrations.xlsx');
    };

    if (error) {
        return <div className="text-red-500 text-center text-lg">{error}</div>;
    }

    const filteredRegistrations = filterType
        ? registrations.filter(
              (registration) => registration.registrationType === filterType
          )
        : registrations;

    // Calculate the total entered
    const totalEntered = filteredRegistrations.filter(
        (registration) => registration.entered === true
    ).length;

    return (
        <>
            {loading && <Loader />}
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 rounded-lg shadow-lg">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center text-purple-600">
                    Concert Registrations
                </h2>
                <p className="text-md sm:text-lg text-center mb-6 text-gray-600">
                    Total Registrations: {filteredRegistrations.length} | Total
                    Entered: {totalEntered}
                </p>

                <div className="mb-4 flex flex-col sm:flex-row items-center">
                    <label
                        htmlFor="filter"
                        className="mr-2 text-sm sm:text-base"
                    >
                        Filter by Registration Type:
                    </label>
                    <select
                        id="filter"
                        value={filterType}
                        onChange={handleFilterChange}
                        className="border rounded px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base w-full sm:w-auto"
                    >
                        <option value="">All</option>
                        <option value="EIT Student">EIT Student</option>
                        <option value="Alumni">Alumni</option>
                        <option value="School Student">School Student</option>
                        <option value="Other College Student">
                            Other College Student
                        </option>
                    </select>
                    <button
                        onClick={handleDownloadExcel}
                        className="mt-2 sm:mt-0 sm:ml-4 px-4 py-2 bg-blue-500 text-white rounded text-sm sm:text-base"
                    >
                        Download Excel
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        <thead className="bg-blue-600 text-white text-xs sm:text-sm lg:text-base">
                            <tr>
                                <th className="py-2 px-4 border-b">
                                    Serial No
                                </th>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">
                                    Phone Number
                                </th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">
                                    Registration Type
                                </th>
                                <th className="py-2 px-4 border-b">
                                    Date of Birth
                                </th>
                                <th className="py-2 px-4 border-b">City</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRegistrations.map(
                                (registration, index) => (
                                    <tr
                                        key={registration.id}
                                        className="hover:bg-gray-100 text-xs sm:text-sm lg:text-base"
                                    >
                                        <td className="py-2 px-4 border-b text-center">
                                            {index + 1}
                                        </td>
                                        <td className="py-2 px-4 border-b text-center">
                                            {registration.name || 'N/A'}
                                        </td>
                                        <td className="py-2 px-4 border-b text-center">
                                            {registration.phoneNumber || 'N/A'}
                                        </td>
                                        <td className="py-2 px-4 border-b text-center">
                                            {registration.email || 'N/A'}
                                        </td>
                                        <td className="py-2 px-4 border-b text-center">
                                            {registration.registrationType ||
                                                'N/A'}
                                        </td>
                                        <td className="py-2 px-4 border-b text-center">
                                            {registration.dateOfBirth || 'N/A'}
                                        </td>
                                        <td className="py-2 px-4 border-b text-center">
                                            {registration.city || 'N/A'}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ConcertDetails;
