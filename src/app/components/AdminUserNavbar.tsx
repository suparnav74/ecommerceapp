'use client'; // Enables client-side interactivity
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const AdminUserNavbar = () => {
    const [role, setRole] = useState(null);
    const router = useRouter();

    // Fetch the user's role
    useEffect(() => {
        const fetchRole = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/auth/getRole');
                const data = await response.json();
                setRole(data.role);
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };
        fetchRole();
    }, []);

    // Handle logout
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/logout', { method: 'POST' });
            if (response.ok) {
                router.push('/login'); // Redirect to login page after logout
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div>
    <header className="absolute inset-x-0 top-0 z-50">
    <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div className="flex lg:flex-1">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img className="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt=""/>
        </a>
      </div>
      <div className="flex lg:hidden">
        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
          <span className="sr-only">Open main menu</span>
          <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
        <a href="#" className="text-sm/6 font-semibold text-gray-900">Home</a>
        <a href="#" className="text-sm/6 font-semibold text-gray-900">About</a>
        <a href="#" className="text-sm/6 font-semibold text-gray-900">Features</a>
        <a href="#" className="text-sm/6 font-semibold text-gray-900">Contact</a>
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
      <ul className="nav-links flex items-center space-x-4 mx-3 md:mt-0 mt-5">
                    {role === 'admin' && (
                        <li>
                            <Link
                                href="/admin"
                                className="bg-white hover:bg-[#16a34a] text-black font-bold py-2 px-4 rounded transition duration-300"
                            >
                                Admin
                            </Link>
                        </li>
                    )}
                    {role === 'user' && (
                        <li>
                            <Link
                                href="/ui/user"
                                className="bg-white hover:bg-[#16a34a] text-black font-bold py-2 px-4 rounded transition duration-300"
                            >
                                User
                            </Link>
                        </li>
                    )}

                    <li>
                        <button
                            onClick={handleLogout}
                            className="bg-white hover:bg-red-700 text-black font-bold py-2 px-4 rounded transition duration-300"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
      </div>
      
    </nav>
  </header>
  </div>
    );
};

export default AdminUserNavbar;