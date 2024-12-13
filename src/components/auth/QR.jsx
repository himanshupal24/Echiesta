import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    doc,
    updateDoc,
} from 'firebase/firestore';

const QRScannerComponent = () => {
    const db = getFirestore();
    const [scanResult, setScanResult] = useState(null);
    const [isScanning, setIsScanning] = useState(true);
    const scannerRef = useRef(null);
    const [collectionName, setCollectionName] = useState('');

    useEffect(() => {
        if (isScanning && !scannerRef.current) {
            const scanner = new Html5QrcodeScanner(
                'reader',
                { fps: 10, qrbox: { width: 250, height: 250 } },
                false
            );
            scannerRef.current = scanner;

            scanner.render(
                (result) => handleScanSuccess(result),
                (error) => console.warn(`QR Code scan error: ${error}`)
            );

            return () => {
                if (scannerRef.current) {
                    scannerRef.current.clear();
                    scannerRef.current = null;
                }
            };
        }
    }, [isScanning]);

    const checkEmailExists = async (email, event) => {
        const collectionToCheck =
            event === 'Concert' ? 'concertRegistrations' : 'registrations';
        const q = query(
            collection(db, collectionToCheck),
            where('email', '==', email)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docData = querySnapshot.docs[0];
            setCollectionName(collectionToCheck);
            return [true, { ...docData.data(), id: docData.id }];
        }

        return [false, null];
    };

    const entered = async (docId) => {
        if (collectionName) {
            const registrationDocRef = doc(db, collectionName, docId);
            await updateDoc(registrationDocRef, { entered: true });
        }
    };

    const handleScanSuccess = async (decodedText) => {
        try {
            const text = JSON.parse(decodedText);

            if (text.email && text.event) {
                const [emailExists, results] = await checkEmailExists(
                    text.email,
                    text.event
                );

                if (emailExists) {
                    setScanResult(results);
                } else {
                    setScanResult(0);
                }
            } else {
                setScanResult(0);
            }
        } catch (error) {
            console.error('Error parsing QR code:', error);
            setScanResult(0);
        } finally {
            stopScanning();
        }
    };

    const stopScanning = () => {
        setIsScanning(false);
        if (scannerRef.current) {
            scannerRef.current.clear();
        }
    };

    const handleResume = async (id) => {
        if (scanResult && scanResult.id) {
            await entered(scanResult.id);
        }
        setScanResult(null);
        setIsScanning(true);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-500 p-4">
            {isScanning ? (
                <div className="w-full max-w-lg text-center">
                    <h3 className="text-2xl font-semibold mb-4 text-white">
                        Scan a QR Code
                    </h3>
                    <div
                        id="reader"
                        className="mx-auto aspect-square border-4 border-dashed border-gray-400 rounded-lg"
                        style={{
                            width: '100%',
                            maxWidth: '300px',
                            height: '100%',
                            maxHeight: '300px',
                        }}
                    ></div>
                </div>
            ) : (
                <div className="w-full max-w-lg text-center">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                        QR Code Data:
                    </h3>

                    <div className="text-lg bg-white p-4 rounded-lg shadow mb-4 space-y-2">
                        {scanResult === 0 ? (
                            <p className="text-red-500 font-semibold">
                                Not Found
                            </p>
                        ) : scanResult.entered ? (
                            <div>
                                <p className="text-red-500 font-bold">
                                    EXPIRED
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-700">
                                        Email:
                                    </span>{' '}
                                    {scanResult.email}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-700">
                                        Aadhar:
                                    </span>{' '}
                                    {scanResult.aadharNumber}
                                </p>
                            </div>
                        ) : (
                            <div>
                                <p>
                                    <span className="font-semibold text-gray-700">
                                        Name:
                                    </span>{' '}
                                    {scanResult.teamName || scanResult.name}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-700">
                                        Email:
                                    </span>{' '}
                                    {scanResult.email}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-700">
                                        Phone:
                                    </span>{' '}
                                    {scanResult.mobile ||
                                        scanResult.phoneNumber}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-700">
                                        Event(s):
                                    </span>{' '}
                                    {scanResult.event}
                                </p>
                                {scanResult.selectedEvent?.name && (
                                    <p>
                                        <span className="font-semibold text-gray-700">
                                            Selected Event:
                                        </span>{' '}
                                        {scanResult.selectedEvent.name}
                                    </p>
                                )}
                                <p>
                                    <span className="font-semibold text-gray-700">
                                        Aadhar:
                                    </span>{' '}
                                    {scanResult.aadharNumber}
                                </p>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => handleResume(scanResult.id)}
                        className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition-colors"
                    >
                        Resume Scanning
                    </button>
                </div>
            )}
        </div>
    );
};

export default QRScannerComponent;
