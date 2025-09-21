import React from 'react';
import { useProfileData } from '../api/profile';

const Profile: React.FC = () => {
    // Use the custom hook to get the query state and data
    const { data, isLoading, isError, error } = useProfileData();

    if (isLoading) {
        return <div>Loading profile...</div>;
    }

    if (isError) {
        // You can access the error object thrown from the hook
        const errorMessage = (error as Error)?.message || 'Failed to fetch profile data.';
        return <div style={{ color: 'red' }}>Error: {errorMessage}</div>;
    }

    if (!data) {
        return <div>No profile data found.</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default Profile;