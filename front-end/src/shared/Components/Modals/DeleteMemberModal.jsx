import React from 'react';

const DeleteMemberModal = ({ isOpen, onClose, onDelete, memberId }) => {
    const handleDelete = async () => {
        try {
            await onDelete(memberId);
            onClose();
        } catch (err) {
            console.error('Error deleting member:', err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Delete Member</h2>
                <p className="mb-4">Are you sure you want to delete this member?</p>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteMemberModal;
