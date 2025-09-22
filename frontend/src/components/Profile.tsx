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
        return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-400">Loading profile...</div>;
    }

    if (isError) {
        const errorMessage = (error as Error)?.message || 'Failed to fetch profile data.';
        return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-500">Error: {errorMessage}</div>;
    }

    const userProfileData: UserProfile = data as UserProfile;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            <div className="w-full max-w-lg p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-white">User Profile</h2>
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        {userProfileData?.email?.charAt(0).toUpperCase()}
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="p-4 bg-gray-700 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-300">Email</h3>
                        <p className="text-gray-100">{userProfileData?.email}</p>
                    </div>
                    <div className="p-4 bg-gray-700 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-300">Account ID</h3>
                        <p className="text-gray-100">{userProfileData?.id}</p>
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default Profile;