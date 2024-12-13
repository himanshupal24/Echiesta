// Modal Component
const Modal = ({ message, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-black bg-opacity-50 absolute inset-0"></div>
        <div className="bg-white p-8 rounded-lg shadow-lg z-10 max-w-md w-full">
            <p className="text-lg">{message}</p>
            <button
                onClick={onClose}
                className="bg-violet-900 text-white px-4 py-2 rounded-lg mt-4 w-full"
            >
                Close
            </button>
        </div>
    </div>
);

export default Modal;
