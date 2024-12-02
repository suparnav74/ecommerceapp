'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateRequest } from "@/lib/auth";
import getRole from '@/lib/getRole';
import Cookies from 'js-cookie';

export default function AdminPage() {
    const [role, setRole] = useState<string|null>(null);
    const router = useRouter();

    useEffect(() => {
        // Fetch the user's role (via an API or local storage)
        const fetchRole = async () => {
            const session = Cookies.get('session');

            if (session) {
            // Assuming the session is a JSON string with user data, parse it
            const parsedSession = JSON.parse(session);

            const userRole = parsedSession?.role;
            setRole(userRole);

            // Redirect if not admin
            if (await role !== 'admin') {
                router.push('/'); // Redirect to the homepage or another route
            }
         } };
        fetchRole();
    }, [router]);

    if (role === null) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-600" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin  Page</h1>
            <p className="text-xl text-gray-600 mb-6">Welcome, Admin! Here’s your admin dashboard.</p>

            <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Information</h2>
                <p className="text-gray-500 mb-4">Here you can manage every account.</p>
                <div className='flex justify-center'>
                    <button className="mt-4 bg-green-600 text-white font-semibold py-2 px-3 rounded hover:bg-green-700 transition duration-200" onClick={() => router.push('/admin/table')}>
                        Admin Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

