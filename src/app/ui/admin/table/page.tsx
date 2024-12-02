'use client';
import { useEffect, useState } from 'react';
import { SA_User } from '@/lib/schema';

export default function AdminTable() {
    const [users, setUsers] = useState<SA_User[]>([]);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const roleResponse = await fetch('http://localhost:3000/api/auth/getRole');
            const roleData = await roleResponse.json();
            setRole(roleData.role);

            if (roleData.role === 'admin') {
                const userResponse = await fetch('http://localhost:3000/api/users');
                const userData = await userResponse.json();
                setUsers(userData);
            }
        };
        fetchUsers();
    }, []);

    if (role === null) {
        return <div>Loading...</div>;
    }

    if (role !== 'admin') {
        return <div>Unauthorized</div>;
    }

    return (
        <div className="flex justify-center h-screen py-20">
            <div className="w-3/4 bg-white rounded-lg shadow-md p-4">
                <h1 className="text-2xl font-bold mb-4">User Management</h1>
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border border-gray-300">Email</th>
                            <th className="px-4 py-2 border border-gray-300">Role</th>
                            <th className="px-4 py-2 border border-gray-300">Created</th>
                            <th className="px-4 py-2 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border border-gray-300">
                                <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                                <td className="px-4 py-2 border border-gray-300">{user.role}</td>
                                {/* <td className="px-4 py-2 border border-gray-300 text-center">{user.created}</td> */}
                                <td className="px-4 py-2 border border-gray-300 text-center">
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}