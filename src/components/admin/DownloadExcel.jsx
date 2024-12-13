import React from 'react';
import * as XLSX from 'xlsx';

const DownloadExcel = ({ data }) => {
    const handleDownload = () => {
        // Define which fields you want to include in the download
        const selectedFields = data.map((reg) => ({
            'Team Name': reg.teamName,
            Teammates: reg.teammates ? reg.teammates.join(', ') : '',
            Category: reg.category,
            'Selected Events': Array.isArray(reg.selectedEvent)
                ? reg.selectedEvent.map((event) => event.name).join(', ')
                : reg.selectedEvent?.name || '',
            Email: reg.email,
            College: reg.college,
            'Mobile Number': reg.mobile,
            'Transaction ID': reg.transactionId,
            totalFee: reg.totalFee,
            'Registration Date': new Date(
                reg.registrationDate
            ).toLocaleDateString(),
        }));

        const worksheet = XLSX.utils.json_to_sheet(selectedFields);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

        XLSX.writeFile(workbook, 'Registration_Details.xlsx');
    };

    return (
        <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-4 py-2 rounded"
        >
            Download Excel
        </button>
    );
};

export default DownloadExcel;
