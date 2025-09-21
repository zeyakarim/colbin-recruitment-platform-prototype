import React, { useState } from 'react';
import { useLoginMutation } from '../api/auth';
// import { toast } from 'react-toastify'; // Assuming you have toast imported

interface LoginProps {
    onLoginSuccess: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { mutate, isPending } = useLoginMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ email, password }, {
            onSuccess: (token) => {
                // toast.success("Login successful!");
                onLoginSuccess(token);
            },
            onError: (error) => {
                // toast.error(error.message || "Login failed");
            },
        });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit" disabled={isPending}>
                    {isPending ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;