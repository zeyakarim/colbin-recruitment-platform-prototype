import { useMutation } from "@tanstack/react-query";
import { fetcher } from "./index"; // Assuming fetcher is correctly typed

// This custom hook handles authentication logic using React Query
export const useLoginMutation = () => {
    return useMutation({
        mutationFn: async (payload: any) => {
            const res = await fetcher('/auth/login', 'POST', payload);
            
            // Explicitly check that a token exists before returning it
            if (!res || typeof res.token !== 'string') {
                throw new Error('API response did not contain a valid token.');
            }
            
            return res.token;
        },
        onSuccess: (token: string) => {
            localStorage.setItem('token', token);
            console.log("✅ Login successful");
        },
        onError: (error: any) => {
            console.error("❌ Login failed:", error.message);
            throw error;
        }
    });
};

export const useSignupMutation = () => {
    return useMutation({
        mutationFn: async (payload: any) => {
            const res = await fetcher('/auth/register', 'POST', payload);
            return res;
        },
        onSuccess: () => {
            console.log("✅ Signup successful");
        },
        onError: (error: any) => {
            console.error("❌ Signup failed:", error.message);
            throw error;
        }
    });
};