import React, { useState, useEffect } from 'react';
 // Assuming a file named useAuth.ts
import { AxiosError } from 'axios';
import { useSignupMutation } from '../api/auth';

interface RegisterProps {
    onRegisterSuccess: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const { mutate, isPending, isSuccess, isError, error } = useSignupMutation();

    useEffect(() => {
        if (isSuccess) {
            setMessage("✅ Signup successful!");
            onRegisterSuccess();
        }
        if (isError) {
            const axiosError = error as AxiosError<{ message: string }>;
            setMessage(axiosError.response?.data?.message || 'Registration failed.');
        }
    }, [isSuccess, isError, error, onRegisterSuccess]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ email, password });
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit" disabled={isPending}>
                    {isPending ? 'Registering...' : 'Register'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;