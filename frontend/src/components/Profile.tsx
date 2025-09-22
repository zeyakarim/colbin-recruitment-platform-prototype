// src/components/Profile.tsx
import React from 'react';
import { useProfileData } from '../api/profile';

interface UserProfile {
  id: number;
  email: string;
}

const Profile: React.FC = () => {
    const { data, isLoading, isError, error } = useProfileData();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px] bg-gray-800 rounded-2xl shadow-lg text-gray-300">
                <svg className="animate-spin h-8 w-8 mr-3 text-blue-500" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading Profile...
            </div>
        );
    }

    if (isError) {
        const errorMessage = (error as Error)?.message || 'Failed to fetch profile data.';
        return (
            <div className="flex items-center justify-center min-h-[400px] bg-red-500/20 rounded-2xl shadow-lg text-red-300">
                Error: {errorMessage}
            </div>
        );
    }

    const userProfileData: UserProfile = data as UserProfile;

    return (
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-8 max-w-2xl mx-auto">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-blue-400">Your Profile</h2>
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md">
                    {userProfileData?.email?.charAt(0).toUpperCase()}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-700/50 rounded-lg border border-gray-600/50">
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">Email Address</h3>
                    <p className="text-white break-all">{userProfileData?.email}</p>
                </div>
                <div className="p-6 bg-gray-700/50 rounded-lg border border-gray-600/50">
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">Account ID</h3>
                    <p className="text-white">{userProfileData?.id}</p>
                </div>
            </div>
            <div className="text-center text-gray-400 text-sm mt-6">
                Last updated: {new Date().toLocaleDateString()}
            </div>
        </div>
    );
};

export default Profile;