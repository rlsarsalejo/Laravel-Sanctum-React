import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';

const UpdateMemberModal = ({ isOpen, onClose, onUpdate, member }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        role: '',
        phoneNumber: '',
    });

    useEffect(() => {
        if (member) {
            setFormData({
                name: member.name || '',
                email: member.email || '',
                address: member.address || '',
                role: member.role || '',
                phoneNumber: member.phoneNumber || '',
            });
        }
    }, [member]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onUpdate(member.id, formData);
            onClose();
        } catch (err) {
            console.error('Error updating member:', err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                <div className='flex items-center gap-2 mb-4'>
                    <h2 className="text-lg font-bold">Update Member</h2>
                    <Pencil className='h-6 w-6' />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className='border p-2 w-full'
                            required
                        >
                            <option value="" disabled>Select role</option>
                            <option value="Simbalay Leader">Simbalay Leader</option>
                            <option value="Cell Leader">Cell Leader</option>
                            <option value="Primary Leader">Primary Leader</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateMemberModal;
