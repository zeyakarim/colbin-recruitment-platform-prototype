// src/App.tsx
import React, { useState } from 'react';
import Profile from './components/Profile';
import Auth from './components/Auth'; // Import the new Auth component

const App: React.FC = () => {
    // Read token from localStorage on initial render
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
        <div className="min-h-screen">
            {/* Conditional rendering based on the token state */}
            {!token ? (
                <Auth onAuthSuccess={handleAuthSuccess} />
            ) : (
                <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
                    <header className="flex justify-end p-4 bg-white dark:bg-gray-800 shadow">
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                        >
                            Logout
                        </button>
                    </header>
                    <main className="flex-grow">
                        <Profile />
                    </main>
                </div>
            )}
        </div>
    );
};

export default App;