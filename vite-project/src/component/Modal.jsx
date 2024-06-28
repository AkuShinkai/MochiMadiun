import React from 'react';

const Modal = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
                    <div className="px-4 py-3 border-b border-gray-200">
                        <button
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                    <div className="p-4">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
