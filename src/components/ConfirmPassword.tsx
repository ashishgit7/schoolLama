import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation';
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const ConfirmPassword = ({ email }: { email: string }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (newPassword.length < 8 || !/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(newPassword)) {
            setError('Password must be at least 8 characters long and contain both letters and numbers');
            setSuccess('');
        } else if (confirmPassword && newPassword !== confirmPassword) {
            setError('Passwords do not match');
            setSuccess('');
        } else {
            setError('');
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);

        if (newConfirmPassword !== password) {
            setError('Passwords do not match');
            setSuccess('');
        } else {
            setError('');
        }
    };

    const handleSubmit = async () => {
        if (!error && password && confirmPassword) {
            const res = await fetch(`${baseURL}/api/password-recovery/password-update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newPassword: password }),
            });

            if (res.ok) {
                setSuccess('Password updated successfully');
                setError('');
                router.push('/');
            } else {
                const data = await res.json();
                setError(data.message || 'Something went wrong');
                setSuccess('');
            }
            
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="w-full max-w-xs">
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="mt-1 block w-50 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            </div>
            <div className="w-full max-w-xs">
            <label className="block text-sm font-medium text-gray-700">Confirm Password:</label>
            <Input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="mt-1 block w-50 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <button 
            onClick={handleSubmit} 
            className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            Enter
            </button>
        </div>
    );
};

export default ConfirmPassword;