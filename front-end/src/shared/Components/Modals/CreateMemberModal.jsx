import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { addMember } from '../../Utils/apiMemberService';

const CreateMemberModal = ({ isOpen, onClose, onAddMember }) => {
  const initialState = {
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    role: '',
    password: '',
    passwordConfirmation: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setValidationErrors({});

    if (formData.password !== formData.passwordConfirmation) {
      setValidationErrors({ passwordConfirmation: ['Passwords do not match'] });
      return;
    }

    try {
      await addMember({
        ...formData,
        password_confirmation: formData.passwordConfirmation,
      });
      onAddMember();
      onClose();
      setFormData(initialState);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setValidationErrors(err.response.data.errors);
      } else {
        setError(err.message || 'An error occurred');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50'>
      <div className='relative p-4 w-full max-w-md max-h-full'>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add New Leader
            </h3>

            <button 
              onClick={onClose} 
              type="button" 
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <X className='h-5 w-5' />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className='p-4 md:p-5'>
            <form onSubmit={handleSubmit}>
              {/* Name & Email Field */}
              <div className='flex  items-center gap-2 '>
                <div className='w-full'>
                  <label htmlFor="name" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Leader Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`bg-gray-50 border ${validationErrors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                    placeholder="John Doe"
                    required
                  />
                  {validationErrors.name && (
                    <span className='text-red-500 mt-2 text-xs'>
                      {validationErrors.name[0]}
                    </span>
                  )}
                </div>

                <div className='w-full'>
                  <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`bg-gray-50 border ${validationErrors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                    placeholder="JohnDoe@gmail.com"
                    required
                  />
                  {validationErrors.email && (
                    <span className='text-red-500 mt-2 text-xs'>
                      {validationErrors.email[0]}
                    </span>
                  )}
                </div>
              </div>

              <div className='w-full'>
                  <label htmlFor="address" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Address</label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`bg-gray-50 border ${validationErrors.address ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                    placeholder="123 Main St"
                    required
                  />
                  {validationErrors.address && (
                    <span className='text-red-500 mt-2 text-xs'>
                      {validationErrors.address[0]}
                    </span>
                  )}
                </div>
                
              {/* PhoneNumber & Role Field */}
              <div className='flex  gap-2 mt-2'>
              

                <div className='w-full'>
                  <label htmlFor="phoneNumber" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Phone Number</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`bg-gray-50 border ${validationErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                    placeholder="09097878751"
                    required
                  />
                  {validationErrors.phoneNumber && (
                    <span className='text-red-500 mt-2 text-xs'>
                      {validationErrors.phoneNumber[0]}
                    </span>
                  )}
                </div>

                <div className='w-full'>
                  <label htmlFor="role" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Role</label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`bg-gray-50 border ${validationErrors.role ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                    required
                  >
                    <option value="" disabled>Select role</option>
                    <option value="Simbalay Leader">Simbalay Leader</option>
                    <option value="Cell Leader">Cell Leader</option>
                    <option value="Primary Leader">Primary Leader</option>
                  </select>
                  {validationErrors.role && (
                    <span className='text-red-500 mt-2 text-xs'>
                      {validationErrors.role[0]}
                    </span>
                  )}
                </div>
              </div>

              {/* Password & Confirm Password Field */}
              <div className='w-full mt-2'>
                <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`bg-gray-50 border ${validationErrors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                  placeholder="********"
                  required
                />
                {validationErrors.password && (
                  <span className='text-red-500 mt-2 text-xs'>
                    {validationErrors.password[0]}
                  </span>
                )}
              </div>

              <div className='w-full mt-2'>
                <label htmlFor="passwordConfirmation" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Confirm Password</label>
                <input
                  type="password"
                  id="passwordConfirmation"
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
                  className={`bg-gray-50 border ${validationErrors.passwordConfirmation ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                  placeholder="********"
                  required
                />
                {validationErrors.passwordConfirmation && (
                  <span className='text-red-500 mt-2 text-xs'>
                    {validationErrors.passwordConfirmation[0]}
                  </span>
                )}
              </div>

              <div className='flex mt-5 gap-2'>
                <button 
                  type="submit" 
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create Leader
                </button>
                <button 
                  onClick={onClose} 
                  type="button" 
                  className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Cancel
                </button>
              </div>
            </form>
            {error && (
              <div className='text-red-500 mt-2 text-xs'>
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMemberModal;
