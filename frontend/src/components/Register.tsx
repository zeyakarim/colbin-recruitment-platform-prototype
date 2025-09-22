// src/components/Register.tsx
import React, { useState } from 'react';
import { useSignupMutation } from '../api/auth';
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the icons

interface RegisterProps {
    onRegisterSuccess: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { mutate, isPending } = useSignupMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ email, password }, {
            onSuccess: () => {
                toast.success("Registration successful! Please log in.");
                onRegisterSuccess();
            },
            onError: (error) => {
                const errorMessage = (error as any).response?.data?.message || 'Registration failed.';
                toast.error(errorMessage);
            },
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
                <h2 className="text-3xl font-bold text-center text-white">Register</h2>
                <p className="text-sm text-center text-gray-400">
                    Create a new account to get started.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            required
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-black"
                        >
                            {/* Use the React Icons components directly */}
                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors disabled:bg-green-400"
                    >
                        {isPending ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing up...
                            </div>
                        ) : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;