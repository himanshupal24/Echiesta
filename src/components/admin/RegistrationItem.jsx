import React from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import QRCodeGenerator from './QRCodeGenerator';

const RegistrationItem = ({ registration }) => {
    // Handle Approve registration and generate QR Code
    const handleApprove = async () => {
        try {
            const registrationDoc = doc(db, 'registrations', registration.id);
            await updateDoc(registrationDoc, { status: 'approved' });

            // Send QR Code via Email
            QRCodeGenerator.sendQR(registration);

            alert(
                `Registration approved and entry pass sent to ${registration.email}`
            );
        } catch (error) {
            console.error('Error approving registration: ', error);
            alert('Failed to approve registration.');
        }
    };

    // Handle Reject registration
    const handleReject = async () => {
        try {
            const registrationDoc = doc(db, 'registrations', registration.id);
            await updateDoc(registrationDoc, { status: 'rejected' });

            alert(`Registration rejected for ${registration.email}`);
        } catch (error) {
            console.error('Error rejecting registration: ', error);
            alert('Failed to reject registration.');
        }
    };

    return (
        <li
            className={`mb-4 border-b pb-2 ${
                registration.status === 'approved'
                    ? 'bg-green-100'
                    : registration.status === 'rejected'
                    ? 'bg-red-100'
                    : ''
            }`}
        >
            <p>
                <strong>Email:</strong>{' '}
                {registration.email || 'Email not provided'}
            </p>
            <p>
                <strong>College:</strong>{' '}
                {registration.college || 'College not provided'}
            </p>
            <p>
                <strong>Mobile No:</strong>{' '}
                {registration.mobile || 'Mobile no. not provided'}
            </p>
            <p>
                <strong>TeamName:</strong>{' '}
                {registration.teamName || 'Not provided'}
            </p>
            <p>
                <strong>Category:</strong>{' '}
                {registration.category || 'Category not found'}
            </p>
            <p>
                <strong>Event:</strong>{' '}
                {registration.selectedEvent.name || 'Event not found'}
            </p>
            <p>
                <strong>TotalFee:</strong>{' '}
                {registration.totalFee || 'Not provided'}
            </p>
            {registration.teammates && registration.teammates.length > 0 && (
                <p>
                    <strong>Team Members:</strong>{' '}
                    {registration.teammates.join(', ')}
                </p>
            )}
            <p>
                <strong>Registration Date:</strong>{' '}
                {new Date(registration.registrationDate).toLocaleDateString()}
            </p>
            <>
                <p>
                    <strong>Transaction ID:</strong>{' '}
                    {registration.transactionId || 'Not provided'}
                </p>
                {registration.screenshotUrl && (
                    <img
                        src={registration.screenshotUrl}
                        alt="Payment Screenshot"
                        className="w-64 h-64 object-contain border mt-2"
                    />
                )}
                {/* Approve Button */}
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded mr-4"
                    onClick={handleApprove}
                >
                    Approve
                </button>
                {/* Reject Button */}
                <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                    onClick={handleReject}
                >
                    Reject
                </button>
            </>
        </li>
    );
};

export default RegistrationItem;
