import React, { useState } from 'react';
import { login } from  '../Utils/apiService';
import { useNavigate } from 'react-router-dom';
function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            // if the user input correct credentials
            const { token } = await login(email, password);
            localStorage.setItem('authToken', token);
            navigate('/dashboard');
        } catch (error) {
            // if the user input wrong credentials
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Invalid Credentials..');
            }
        }finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                   
                    <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
                    disabled={isSubmitting}
>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;