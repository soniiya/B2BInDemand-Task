"use client"

import { logout } from "@/app/lib/api";
import { useRouter } from "next/navigation";

export const Header = () => {
    const router = useRouter()
    const handleLogout = async () => {
        await logout()
        router.push('/auth/login')
    }

    return (
        <header className="bg-white flex justify-between items-center shadow p-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <button
                className="bg-indigo-600 p-3 rounded-xl text-white font-medium cursor-pointer hover:bg-indigo-700 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
        </header>
    );
}