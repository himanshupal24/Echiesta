import QRCode from 'qrcode';
import axios from 'axios';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const QRCodeGenerator = {
    sendQR: async (registration) => {
        const db = getFirestore();
        try {
            const qrData = {
                email: registration.email,
                teamName: registration.teamName,
                college: registration.college,
                mobile: registration.mobile,
                event: registration.selectedEvent.name,
            };

            const qrString = JSON.stringify(qrData);

            const qrCodeURL = await QRCode.toDataURL(qrString);

            const registrationDocRef = doc(
                db,
                'registrations',
                registration.id
            );

            await updateDoc(registrationDocRef, {
                qrCodeURL,
            });

            console.log(registration);

            // Optionally, you could also send an email with the QR code (if needed)
            await axios.post('https://smtp.echiesta.com/send-email', {
                email: registration.email,
                subject: `Ticket for Echiesta Event: ${registration.selectedEvent.name}`,
                text: `Hello, ${
                    registration.teamName
                }! Here is your QR code for the event ${
                    registration.selectedEvent.name
                }.\n\nEvent Details:\nEvent Name: ${
                    registration.selectedEvent.name
                }\nDate: ${
                    registration.selectedEvent.Dates || 'Not Defined'
                }\nTime: ${
                    registration.selectedEvent.time || 'Not Defined'
                }\nVenue: ${
                    registration.selectedEvent.venue ||
                    'Echelon Institute of Technology'
                }\n\nPlease present this QR code at the event venue for entry.\n\nBest Regards,\nEchiesta Team`,
                imagePath: qrCodeURL,
            });
        } catch (error) {
            console.error('Error generating and sending QR code:', error);
            throw new Error('Error generating and sending QR code');
        }
    },
};

export default QRCodeGenerator;
