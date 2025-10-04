"use client"

export const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
            B2B Indemand
        </div>
        <nav className="mt-4">
            <ul>
                <li className="px-4 py-2 hover:bg-gray-700">
                    <a href="/dashboard">Dashboard</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-700">
                    <a href="/dashboard/leads">Leads</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-700">
                    <a href="/dashboard/tasks">Tasks</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-700">
                    <a href="/dashboard/projects">Projects</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-700">
                    <a href="/dashboard/organizations">Organization</a>
                </li>
            </ul>
        </nav>
    </div>
  );
}