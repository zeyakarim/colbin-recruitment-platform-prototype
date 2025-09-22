// src/components/Login.tsx
import React, { useState } from 'react';
import { useLoginMutation } from '../api/auth';
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface LoginProps {
    onLoginSuccess: (token: string) => void;
    setView: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, setView }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { mutate, isPending } = useLoginMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        mutate({ email, password }, {
            onSuccess: (token) => {
                toast.success('Login successful!');
                onLoginSuccess(token);
            },
            onError: (error) => {
                const errorMessage = (error as any).response?.data?.message || 'Login failed.';
                setError(errorMessage);
            },
        });
    };

    return (
        <div className="w-full">
            {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center text-sm sm:text-base mb-6">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                <div className="space-y-3">
                    <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-300">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        autoComplete="off"
                        className="w-full px-4 py-3 sm:py-4 bg-gray-700/50 border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    />
                </div>
                <div className="space-y-3">
                    <label htmlFor="password" className="block text-sm sm:text-base font-medium text-gray-300">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            autoComplete="off"
                            className="w-full px-4 py-3 sm:py-4 bg-gray-700/50 border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-200 transition-colors"
                        >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full px-4 py-3 sm:py-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                    {isPending ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Logging In...
                        </div>
                    ) : 'Login'}
                </button>
            </form>
            <p className="text-center text-sm sm:text-base text-gray-400 mt-6">
                Don’t have an account?{' '}
                <a 
                    href="#"
                    className="text-blue-400 hover:text-blue-300 underline transition-colors"
                     onClick={(e) => {
                        e.preventDefault(); // This is the key change!
                        setView();
                    }}
                >
                    Register here
                </a>
                .
            </p>
        </div>
    );
};

export default Login;