// src/components/Auth.tsx
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

// Define the expected props for this component
interface AuthProps {
    onAuthSuccess: (token: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
    const [authView, setAuthView] = useState<'login' | 'register'>('register');

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
            <div className="w-full">
                <nav className="flex justify-center mb-6">
                    <button
                        onClick={() => setAuthView('register')}
                        className={`px-4 py-2 font-semibold transition-colors duration-200 ${
                            authView === 'register' 
                                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400' 
                                : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                        }`}
                    >
                        Register
                    </button>
                    <button
                        onClick={() => setAuthView('login')}
                        className={`px-4 py-2 font-semibold transition-colors duration-200 ${
                            authView === 'login' 
                                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400' 
                                : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                        }`}
                    >
                        Login
                    </button>
                </nav>
                {authView === 'register' ? (
                    <Register onRegisterSuccess={() => setAuthView('login')} />
                ) : (
                    <Login onLoginSuccess={onAuthSuccess} />
                )}
            </div>
        </div>
    );
};

export default Auth;