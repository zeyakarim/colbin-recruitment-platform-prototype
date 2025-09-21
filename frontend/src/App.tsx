import { useState } from 'react';
import Profile from './components/Profile';
import Register from './components/Register';
import Login from './components/Login';

type Props = {
    onAuthSuccess: (token: string) => void;
}

const Auth = ({ onAuthSuccess }: Props) => {
    const [authView, setAuthView] = useState<'login' | 'register'>('register');

    return (
        <div>
            <nav>
                <button onClick={() => setAuthView('register')}>Register</button>
                <button onClick={() => setAuthView('login')}>Login</button>
            </nav>
            {authView === 'register' ? (
                <Register onRegisterSuccess={() => setAuthView('login')} />
            ) : (
                <Login onLoginSuccess={onAuthSuccess} />
            )}
        </div>
    );
};

function App() {
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
        <div className="container">
            {!token ? (
                <Auth onAuthSuccess={handleAuthSuccess} />
            ) : (
                <>
                    <button onClick={handleLogout}>Logout</button>
                    <Profile />
                </>
            )}
        </div>
    );
}

export default App;