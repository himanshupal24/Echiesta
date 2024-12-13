import QRCode from 'qrcode';
import axios from 'axios';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const QRCodeGeneratorforconcert = {
    sendQR: async (registration) => {
        const db = getFirestore();
        try {
            // Create data for the QR code
            const qrData = {
                email: registration.email,
                name: registration.name,
                fatherName: registration.fatherName,
                phoneNumber: registration.phoneNumber,
                city: registration.city,
                event: 'Concert', // You can change this if needed
            };

            // Convert the data to a JSON string and generate QR code
            const qrString = JSON.stringify(qrData);
            const qrCodeURL = await QRCode.toDataURL(qrString);

            // Update Firestore with the QR code URL
            const registrationDocRef = doc(
                db,
                'concertRegistrations',
                registration.id
            );
            await updateDoc(registrationDocRef, {
                qrCodeURL,
            });

            // Send an email with the QR code using your email API
            await axios.post('https://smtp.echiesta.com/send-email', {
                email: registration.email,
                subject: `Entry Pass for Concert`,
                text: `Hello ${registration.name},\n\nThank you for registering for the Echiesta Concert event. Here is your QR code for entry.\n\nEvent: Concert\nVenue: Echelon Institute of Technology\nTicket: "https://echiesta.com/dashboard/"\n\nPlease present this QR code at the event venue for entry.\n(Important! Bring your aadhar card)\n\nBest Regards,\Echiesta Team`,
                imagePath: qrCodeURL,
            });

            // console.log('QR code generated and email sent successfully');
        } catch (error) {
            // console.error('Error generating and sending QR code:', error);
            throw new Error('Error generating and sending QR code');
        }
    },
};

export default QRCodeGeneratorforconcert;
