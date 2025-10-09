"use client";

import { useState, useEffect, useCallback } from "react";
import {
  createOrg,
  fetchAllOrgs,
  fetchOrgById,
  updateOrg,
  deleteOrg,
} from "../../lib/api";
import {
  Organizations as organizations,
  getStatusColor,
} from "../../lib/utils";
import { CreateOrgType, OrgStatusType, OrgType } from "@/app/lib/type";
import Pagination from "@/app/components/Pagination/page";
import { usePagination } from "@/app/hooks/usePagination";

export default function Orgs() {
  const [Orgs, setOrgs] = useState<OrgType[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingOrg, setEditingOrg] = useState<OrgType | null>(null);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [newOrg, setNewOrg] = useState<CreateOrgType>({
    name: "",
    domain: "",
    status: "active",
  });

  const [filters, setFilters] = useState({
    name: "",
    status: "",
    domain: "",
    updatedAfter: "",
    updatedBefore: "",
  });

  const [searchResults, setSearchResults] = useState<OrgType[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const {
    data: paginatedOrgs,
    refetch,
    pagination,
    isLoading,
    handlePageChange,
  } = usePagination(fetchAllOrgs);

  const displayOrgs = isSearching ? searchResults : paginatedOrgs;

  const handlecreateOrg = async () => {
    await createOrg(newOrg);
    refetch();
    alert("organization created");
  };

  const handleEdit = async (id: string) => {
    const res = await fetchOrgById(id);
    setEditingOrg(res);
    setEditingId(id);
  };

  const handleUpdateOrg = async () => {
    if (!editingId || !editingOrg) return;

    try {
      const payload = {
        name: editingOrg.name,
        status: editingOrg.status,
        domain: editingOrg.domain,
      };

      await updateOrg(editingId, payload);
      refetch();

      setEditingId(null);
      setEditingOrg(null);
    } catch (error) {
      console.error("Failed to update Org:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Org?")) {
      return;
    }
    try {
      await deleteOrg(id);
      // setOrgs((prev) => prev.filter((org) => org._id !== id));
      refetch();
      setEditingId(null);
      setEditingOrg(null);
    } catch (error) {
      console.error("Failed to delete Org:", error);
    }
  };

  return (
    <>
      <div className="space-y-6 p-4">
        <h1 className="text-2xl font-bold">Orgnizations</h1>

        <div className="p-4 md:p-8 bg-gray-50 rounded-xl shadow-lg">
          <div className="mb-8 p-6 bg-white rounded-xl shadow-md border border-indigo-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                placeholder="Org Name"
                value={newOrg.name}
                onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm"
                suppressHydrationWarning={true}
              />

              <input
                placeholder="Org Domian"
                value={newOrg.domain}
                onChange={(e) =>
                  setNewOrg({ ...newOrg, domain: e.target.value })
                }
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm"
                suppressHydrationWarning={true}
              />

              <div className="relative">
                <select
                  suppressHydrationWarning={true}
                  value={newOrg.status}
                  onChange={(e) =>
                    setNewOrg({
                      ...newOrg,
                      status: e.target.value as OrgStatusType,
                    })
                  }
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <button
                className="bg-indigo-600 p-3 rounded-xl text-white font-medium cursor-pointer hover:bg-indigo-700 transition"
                onClick={handlecreateOrg}
              >
                Create Organization
              </button>
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
                  Domain
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
              {displayOrgs?.map((p: any) => (
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

                        <input
                          placeholder="Org Domian"
                          value={editingOrg?.domain}
                          onChange={(e) => {
                            if (editingOrg) {
                              setEditingOrg({
                                ...editingOrg,
                                domain: e.target.value,
                              });
                            }
                          }}
                          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm"
                          suppressHydrationWarning={true}
                        />

                        <div className="relative">
                          <select
                            suppressHydrationWarning={true}
                            value={editingOrg?.status}
                            onChange={(e) => {
                              if (editingOrg) {
                                setEditingOrg({
                                  ...editingOrg,
                                  status: e.target.value as OrgStatusType,
                                });
                              }
                            }}
                            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>

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

                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {p.domain}
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
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="text-red-600 hover:text-red-900 transition duration-150 font-semibold"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            page={pagination.page}
            pageSize={pagination.page_size}
            total={pagination.total}
            totalPages={pagination.total_pages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}
