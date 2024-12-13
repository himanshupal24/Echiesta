import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig'; // Firestore instance
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0); // New state for total users
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch users from Firestore
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userCollection = collection(db, 'users');
                const userDocs = await getDocs(userCollection);
                const userList = userDocs.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUsers(userList);
                setTotalUsers(userList.length); // Update total users count
            } catch (error) {
                console.error('Error fetching users: ', error);
                setError('Failed to load users.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Remove user function
    const removeUser = async (userId) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to remove this user?'
        );
        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, 'users', userId));
            setUsers(users.filter((user) => user.id !== userId));
            setTotalUsers((prev) => prev - 1); // Update total users count
            alert('User removed successfully!');
        } catch (error) {
            console.error('Error removing user: ', error);
            alert('Failed to remove user.');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center text-lg font-semibold">
                    Loading...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen text-red-500 text-lg">
                {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
                Manage Users
            </h1>
            <div className="text-lg md:text-xl font-medium mb-2">
                Total Users: {totalUsers}
            </div>
            <div className="w-full max-w-full md:max-w-4xl bg-white shadow-md rounded-lg p-4 md:p-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-4 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Admin
                            </th>
                            <th className="px-4 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm">
                                    {user.email}
                                </td>
                                <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm">
                                    {user.isAdmin ? 'Yes' : 'No'}
                                </td>
                                <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => removeUser(user.id)}
                                        className={`text-red-600 hover:text-red-900 ${
                                            user.isAdmin
                                                ? 'cursor-not-allowed opacity-50'
                                                : ''
                                        }`}
                                        disabled={user.isAdmin}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
