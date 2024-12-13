/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import menuIcon from '../../assets/icons/menu-icon.png';
import close from '../../assets/icons/close.svg';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import signOut from Firebase
import { auth } from '../../firebaseConfig'; // Import Firebase config

const Navbar = ({ admin }) => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null); // Store user state
    const navigate = useNavigate(); // For navigation
    useEffect(() => {
        // Monitor authentication state
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Update user state when user logs in or logs out
        });

        return () => unsubscribe(); // Clean up on unmount
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out the user
            setUser(null); // Clear user state after logout
            navigate('/'); // Redirect to the home page
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <nav className="sticky w-full top-0 text-white z-[999]">
            <div className="font-bold flex py-2 px-4 bg-red-800 relative items-center">
                {/* Logo and Brand Name */}
                <div className="grow flex items-center">
                    <a href="/" className="text-2xl">
                        <img
                            src="/logo_transparent.webp"
                            alt="ECHIESTA Logo"
                            width={150}
                            height={150}
                            className="rounded-md"
                        />
                    </a>
                </div>

                {/* Primary Links */}
                <ul className="justify-center items-center hidden md:flex">
                    <li className="px-2 lg:px-4">
                        <a href="/">Home</a>
                    </li>
                    <li className="px-2 lg:px-4">
                        <a href="/#events">Events</a>
                    </li>

                    {user && (
                        <li className="px-2 lg:px-4">
                            <Link to="dashboard/">My Ticket</Link>
                        </li>
                    )}
                    {user && admin && (
                        <li className="px-2 lg:px-4">
                            <Link to="admin-dashboard/">Admin</Link>
                        </li>
                    )}

                    {/* Conditionally render Signup/Login or Register/Logout */}
                    {user ? (
                        <>
                            <li className="px-2 lg:px-4">
                                <Link to="/registration">Register</Link>
                            </li>
                            <li className="px-2 lg:px-4">
                                <a onClick={handleLogout}>Logout</a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="px-2 lg:px-4">
                                <Link to="/signup">Sign Up</Link>
                            </li>
                            <li className="px-2 lg:px-4">
                                <Link to="/login">Login</Link>
                            </li>
                        </>
                    )}
                </ul>

                {/* Mobile Menu Toggle */}
                <div className="flex items-center md:hidden">
                    <img
                        src={open ? close : menuIcon}
                        alt="menu-icon"
                        width={25}
                        height={25}
                        onClick={() => setOpen((cur) => !cur)}
                    />
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {open && (
                <div className="dropdown_menu -z-1 bg-black/80 w-full py-4 block md:hidden">
                    <ul className="flex flex-col justify-around items-center h-full text-lg text-white">
                        <li className="py-4 dropdown_item-1">
                            <Link to="/" onClick={() => setOpen(false)}>
                                Home
                            </Link>
                        </li>
                        <li className="py-4 dropdown_item-2">
                            <Link to="/#events" onClick={() => setOpen(false)}>
                                Events
                            </Link>
                        </li>
                        {user && admin && (
                            <li className="py-4 dropdown_item-3">
                                <Link to="admin-dashboard/">Admin</Link>
                            </li>
                        )}
                        {user && (
                            <li className="py-4 dropdown_item-3">
                                <Link to="dashboard/">My Ticket</Link>
                            </li>
                        )}

                        {user ? (
                            <>
                                <li className="py-4 dropdown_item-4">
                                    <Link
                                        to="/registration"
                                        onClick={() => setOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </li>
                                <li className="py-4 dropdown_item-5">
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setOpen(false);
                                        }}
                                        className="focus:outline-none"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="py-4 dropdown_item-6">
                                    <Link
                                        to="/login"
                                        onClick={() => setOpen(false)}
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li className="py-4 dropdown_item-6">
                                    <Link
                                        to="/signup"
                                        onClick={() => setOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
