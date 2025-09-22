// src/App.tsx
import React, { useState } from 'react';
import Profile from './components/Profile';
import Auth from './components/Auth';
import { Toaster } from 'react-hot-toast'; // Import Toaster

const App: React.FC = () => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const handleAuthSuccess = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <Toaster position="top-center" reverseOrder={false} />
            
            {!token ? (
                <Auth onAuthSuccess={handleAuthSuccess} />
            ) : (
                <div className="flex flex-col min-h-screen">
                    <header className="flex justify-between items-center p-6 bg-gray-800 shadow-lg">
                        <h1 className="text-2xl font-bold text-blue-400">User Dashboard</h1>
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md"
                        >
                            Logout
                        </button>
                    </header>
                    <main className="flex-grow container mx-auto p-6">
                        <Profile />
                    </main>
                    <footer className="p-4 bg-gray-800 text-center text-gray-400 text-sm">
                        © 2025 Your App. All rights reserved.
                    </footer>
                </div>
            )}
        </div>
    );
};

export default App;