import { lazy, Suspense, useEffect, useState } from 'react';
import 'aos/dist/aos.css';
import './App.css';
import Loader from './Loader';
import FloatingSocialIcons from './components/layout/FloatingSocialIcons';

import Navbar from './components/layout/Navbar';
import Background from './components/layout/Background';
import AOS from 'aos';
import { updateScrollPosition } from './utils/scroll';
// Import Firebase utilities
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Firestore instance

// Import routing libraries
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';

// Lazy-loaded components
const Home = lazy(() => import('./components/home/Home'));
const SubEvents = lazy(() => import('./components/events/SubEvents'));
const Registration = lazy(() => import('./components/events/Registration'));
const PaymentPage = lazy(() => import('./components/payment/paymentpage'));
const SignUp = lazy(() => import('./components/auth/signup'));
const Login = lazy(() => import('./components/auth/login'));
const Users = lazy(() => import('./components/users/page'));
const AdminDashboard = lazy(() => import('./components/admin/admindashboard'));
const ManageUsers = lazy(() => import('./components/admin/manageusers'));
const RegistrationDetails = lazy(() =>
    import('./components/admin/registrationdetails')
);
const QRScannerComponent = lazy(() => import('./components/auth/QR'));
const Concert = lazy(() => import('./components/concertTickets/page'));
const ConcertDetails = lazy(() => import('./components/admin/concertdetails'));

function App() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 300,
            once: true,
        });
    }, []);

    useEffect(() => {
        const checkAuthStatus = async () => {
            setLoading(false); // Stop loading once the check is complete
            updateScrollPosition(); // Scroll adjustment
        };

        // Check immediately if the document is ready, otherwise listen for the load event
        if (document.readyState === 'complete') {
            checkAuthStatus();
        } else {
            window.addEventListener('load', checkAuthStatus);
        }

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                // Fetch user data (Admin status)
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                if (userDoc.exists()) {
                    setIsAdmin(userDoc.data().isAdmin || false);
                } else {
                    setIsAdmin(false); // No user document found, not an admin
                }
            } else {
                setIsAdmin(false); // No user logged in
            }
        });
        // Cleanup function
        return () => {
            window.removeEventListener('load', checkAuthStatus);
            unsubscribe();
        };
    }, []);

    return (
        <>
            {loading && <Loader />}

            <Router>
                <Navbar admin={isAdmin} />
                <FloatingSocialIcons />
                <Background />

                <main className="App">
                    <Suspense fallback={<Loader />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/sub-events" element={<SubEvents />} />
                            <Route
                                path="/registration"
                                element={<Registration />}
                            />
                            <Route path="/event" element={<Home />} />
                            <Route path="/payment" element={<PaymentPage />} />
                            <Route
                                path="/signup"
                                element={
                                    user ? <Navigate to="/" /> : <SignUp />
                                }
                            />
                            <Route
                                path="/dashboard"
                                element={<Users user={user} />}
                            />
                            <Route
                                path="/login"
                                element={user ? <Navigate to="/" /> : <Login />}
                            />
                            <Route
                                path="/qr"
                                element={<QRScannerComponent />}
                            />
                            <Route path="/concert" element={<Concert />} />
                            {/* Admin Dashboard - Only accessible if user is an admin */}
                            <Route
                                path="/admin-dashboard"
                                element={
                                    isAdmin ? (
                                        <AdminDashboard />
                                    ) : (
                                        <Navigate to="/" />
                                    )
                                }
                            />
                            {/* Manage Users - Only accessible if user is an admin */}
                            <Route
                                path="/admin-dashboard/manageusers"
                                element={
                                    isAdmin ? (
                                        <ManageUsers />
                                    ) : (
                                        <AdminDashboard />
                                    )
                                }
                            />
                            <Route
                                path="/admin-dashboard/registrationsdetails"
                                element={
                                    isAdmin ? (
                                        <RegistrationDetails />
                                    ) : (
                                        <AdminDashboard />
                                    )
                                }
                            />
                            <Route
                                path="/admin-dashboard/concertdetails"
                                element={
                                    isAdmin ? (
                                        <ConcertDetails />
                                    ) : (
                                        <AdminDashboard />
                                    )
                                }
                            />
                            <Route path="*" element={<Home />} />
                        </Routes>
                    </Suspense>
                </main>
            </Router>
        </>
    );
}

export default App;
