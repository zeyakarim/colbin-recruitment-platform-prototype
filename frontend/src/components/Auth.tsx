// src/components/Auth.tsx
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

interface AuthProps {
    onAuthSuccess: (token: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
    const [authView, setAuthView] = useState<'login' | 'register'>('register');

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 p-8 space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-blue-400 mb-2">Welcome</h1>
                    <p className="text-gray-300">Secure access to your professional dashboard</p>
                </div>
                <nav className="flex justify-center space-x-6 border-b border-gray-700 pb-4 mb-6">
                    <button
                        onClick={() => setAuthView('register')}
                        className={`px-6 py-2 font-medium transition-all duration-300 ${
                            authView === 'register'
                                ? 'border-b-2 border-blue-500 text-blue-400'
                                : 'text-gray-400 hover:text-blue-400'
                        }`}
                    >
                        Register
                    </button>
                    <button
                        onClick={() => setAuthView('login')}
                        className={`px-6 py-2 font-medium transition-all duration-300 ${
                            authView === 'login'
                                ? 'border-b-2 border-blue-500 text-blue-400'
                                : 'text-gray-400 hover:text-blue-400'
                        }`}
                    >
                        Login
                    </button>
                </nav>
                <div className="flex flex-col items-center">
                    {authView === 'register' ? (
                        <Register onRegisterSuccess={() => setAuthView('login')} />
                    ) : (
                        <Login onLoginSuccess={onAuthSuccess} setView={() => setAuthView('register')} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Auth;