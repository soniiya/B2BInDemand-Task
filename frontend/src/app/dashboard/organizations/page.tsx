"use client";

import { useState, useEffect, useCallback } from "react";
import {
  fetchAllOrgs,
  updateOrg,
} from "../../lib/api";
import {
  Organizations as organizations,
  getStatusColor,
} from "../../lib/utils";
import { OrgType } from "../../lib/utils";

export default function Orgs() {
  const [Orgs, setOrgs] = useState<OrgType[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingOrg, setEditingOrg] = useState<OrgType | null>(null);
  const [selectedOrg, setSelectedOrg] = useState("");

//   const getAllOrgs = useCallback(async () => {
//     try {
//       const res = await fetchAllOrgs();
//       setOrgs(res);
//     } catch (error) {
//       console.error("Failed to fetch Orgs:", error);
//     }
//   }, [setOrgs]);

//   useEffect(() => {
//     getAllOrgs();
//   }, [getAllOrgs]);


  const handleEdit = (id: string) => {
    const orgToEdit = organizations.find((org) => org._id === id);
    if (orgToEdit) {
        setEditingOrg(orgToEdit as OrgType); 
        setEditingId(id); 
    } else {
        console.error(`Organization with ID ${id} not found.`);
    }
  };

  const handleUpdateOrg = async () => {
    if (!editingId || !editingOrg) return;

    try {
      const payload = {
        name: editingOrg.name,
        status: editingOrg.status,
        client: editingOrg.client,
      };

      await updateOrg(editingId, payload);

      setEditingId(null);
      setEditingOrg(null);

      fetchAllOrgs();
    } catch (error) {
      console.error("Failed to update Org:", error);
    }
  };

  return (
    <>
      <div className="space-y-6 p-4">
        <h1 className="text-2xl font-bold">Orgnizations</h1>

        <div className="p-4 md:p-8 bg-gray-50 rounded-xl shadow-lg">
          <div className="mb-8 p-6 bg-white rounded-xl shadow-md border border-indigo-100">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative">
                <select
                  onChange={(e) => setSelectedOrg(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm"
                >
                  <option value="">Select Organization</option>
                  {organizations.map((org: any) => (
                    <option key={org._id} value={org._id}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <select
                  onChange={(e) => setSelectedOrg(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm"
                >
                  <option value="">Select Status</option>
                  {organizations.map((org: any) => (
                    <option key={org._id} value={org._id}>
                      {org.status}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>
        </div>

        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Org Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {organizations.map((p: any) => (
                <tr
                  key={p._id}
                  className="hover:bg-indigo-50 transition duration-150"
                >
                  {editingOrg?._id === p._id ? (
                    <td colSpan={4} className="p-4">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <input
                          value={editingOrg?.name}
                          onChange={(e) => {
                            if (editingOrg) {
                              setEditingOrg({
                                ...editingOrg,
                                name: e.target.value,
                              });
                            }
                          }}
                          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto"
                        />
                        
                        <button
                          onClick={handleUpdateOrg}
                          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-150"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingOrg(null)}
                          className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-lg transition duration-150"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  ) : (
                    <>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {p.name}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs Orging-5 font-semibold rounded-full ${getStatusColor(
                            p.status
                          )}`}
                        >
                          {p.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => handleEdit(p._id)}
                            className="text-indigo-600 hover:text-indigo-900 transition duration-150 font-semibold"
                          >
                            Update
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

