'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminUserNavbar from '@/app/components/AdminUserNavbar';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { validateRequest } from "@/lib/auth";
import Cookies from 'js-cookie';

export default function AdminLayout({children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [role, setRole] = useState<string|null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const session = Cookies.get('session');

                if (session) {
                // Assuming the session is a JSON string with user data, parse it
                const parsedSession = JSON.parse(session);
    
                const userRole = parsedSession?.role;
                setRole(userRole);
                
                // Redirect if not admin
                if (role !== 'admin') {
                    router.push('/ui/login');
                }}
            } catch (error) {
                console.error('Error fetching role:', error);
                router.push('/ui/login');
            }
          };
        fetchRole();
    }, [router]);

    if (role === null) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-black" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (role !== 'admin') {
        return <div>Unauthorized</div>; // Fallback if the redirect doesn't work
    }

    return (
        <div>
            <Navbar role ={role} isAuthenticated={true}/>
            <main>{children}</main>
            <Footer/>
        </div>
    );
}
