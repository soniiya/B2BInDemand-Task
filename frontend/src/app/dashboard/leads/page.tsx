"use client";

import { useState, useEffect, useCallback } from "react";
import {
  createLead,
  fetchAllLeads,
  fetchSearchedLead,
  fetchLeadById,
  updateLead,
  deleteLead,
} from "../../lib/api";
import {
  CreateLeadType,
  LeadStatus,
  LeadType,
  SourceType,
} from "../../lib/type";
import {
  Organizations as organizations,
  getStatusColor,
} from "../../lib/utils";
import { usePagination } from "@/app/hooks/usePagination";
import Pagination from "@/app/components/Pagination/page";

export default function LeadsPage() {
  //const [Leads, setLeads] = useState<LeadType[]>([]);
  const [searchResults, setSearchResults] = useState<LeadType[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    updatedAfter: "",
    updatedBefore: "",
  });
  const [newLead, setNewLead] = useState<CreateLeadType>({
    title: "",
    company: "",
    contact_name: "",
    email: "",
    phone: "",
    source: "web",
    status: "new",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingLead, setEditingLead] = useState<LeadType | null>(null);
  // const [selectedOrg, setSelectedOrg] = useState("");

  const {
    data: paginatedLeads,
    refetch,
    pagination,
    isLoading,
    handlePageChange,
  } = usePagination(fetchAllLeads);

  const getsearchedLeads = async () => {
    // const query = new URLSearchParams(filters as any).toString();
    const res = await fetchSearchedLead(filters);
    const data = await res.json();
    setSearchResults(data);
    setIsSearching(true);
    refetch();
    //setLeads(data);
  };

  const displayLeads = isSearching ? searchResults : paginatedLeads;

  const handlecreateLead = async () => {
    await createLead(newLead);
    refetch();
    alert("Lead created successfully!");
  };

  const handleEdit = async (id: string) => {
    const res = await fetchLeadById(id);
    setEditingLead(res);
    setEditingId(id);
  };

  const handleUpdateLead = async () => {
    if (!editingId || !editingLead) return;

    try {
      const payload: CreateLeadType = {
        title: editingLead.title,
        company: editingLead.company,
        contact_name: editingLead.contact_name,
        email: editingLead.email,
        phone: editingLead.phone,
        source: editingLead.source,
        status: editingLead.status,
      };

      await updateLead(editingId, payload);
      refetch();
      alert("Lead updated successfully!");

      setEditingId(null);
      setEditingLead(null);
    } catch (error) {
      console.error("Failed to update Lead:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Lead?")) {
      return;
    }
    try {
      await deleteLead(id);
      // setLeads(prevLeads =>
      //     prevLeads.filter(lead => lead._id !== id)
      // );
      refetch();
      setEditingId(null);
      setEditingLead(null);
    } catch (error) {
      console.error("Failed to delete Lead:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Leads</h1>

      <div className="p-4 md:p-8 bg-gray-50 rounded-xl shadow-lg">
        <div className="mb-8 p-6 bg-white rounded-xl shadow-md border border-indigo-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            Create New Lead
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              placeholder="Lead Title"
              value={newLead.title}
              onChange={(e) =>
                setNewLead({ ...newLead, title: e.target.value })
              }
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm"
              suppressHydrationWarning={true}
            />

            <input
              placeholder="Company Name"
              value={newLead.company}
              onChange={(e) =>
                setNewLead({ ...newLead, company: e.target.value })
              }
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm"
              suppressHydrationWarning={true}
            />

            <input
              placeholder="Contact Name"
              value={newLead.contact_name}
              onChange={(e) =>
                setNewLead({ ...newLead, contact_name: e.target.value })
              }
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm"
              suppressHydrationWarning={true}
            />

            <input
              placeholder="Email Address"
              type="email"
              value={newLead.email}
              onChange={(e) =>
                setNewLead({ ...newLead, email: e.target.value })
              }
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm"
              suppressHydrationWarning={true}
            />

            <input
              placeholder="Phone Number"
              type="tel"
              value={newLead.phone}
              onChange={(e) =>
                setNewLead({ ...newLead, phone: e.target.value })
              }
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm"
              suppressHydrationWarning={true}
            />

            <div className="relative">
              <select
                value={newLead.source}
                onChange={(e) =>
                  setNewLead({
                    ...newLead,
                    source: e.target.value as SourceType,
                  })
                }
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm"
              >
                <option value="" disabled>
                  Select Source
                </option>
                <option value="email">Email</option>
                <option value="web">Web</option>
                <option value="phone">Phone</option>
                <option value="referral">Referral</option>
                <option value="other">Other</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <select
                value={newLead.status}
                onChange={(e) =>
                  setNewLead({
                    ...newLead,
                    status: e.target.value as LeadStatus,
                  })
                }
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm"
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="new">New</option>
                <option value="qualified">Qualified</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-150 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300"
            onClick={handlecreateLead}
          >
            Create Lead
          </button>
        </div>

        {/* <div className="space-y-2 space-x-10 mt-10">
        <input
          placeholder="Filter by name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          className="pl-10 py-3 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="date"
          onChange={(e) =>
            setFilters({ ...filters, updatedAfter: e.target.value })
          }
        />
        <input
          type="date"
          onChange={(e) =>
            setFilters({ ...filters, updatedBefore: e.target.value })
          }
        />
        <button
          onClick={getsearchedLeads}
          className="bg-blue-500 p-2 rounded-2xl text-white cursor-pointer"
        >
          Apply Filters
        </button>
      </div>  */}
      </div>

      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Lead Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
              >
                Company
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Source
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
            {displayLeads?.map((p: any) => (
              <tr
                key={p._id}
                className="hover:bg-indigo-50 transition duration-150"
              >
                {editingLead?._id === p._id ? (
                  <td colSpan={4} className="p-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <input
                        value={editingLead?.title}
                        onChange={(e) => {
                          if (editingLead) {
                            setEditingLead({
                              ...editingLead,
                              title: e.target.value,
                            });
                          }
                        }}
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto"
                      />
                      <input
                        value={editingLead?.company}
                        onChange={(e) => {
                          if (editingLead) {
                            setEditingLead({
                              ...editingLead,
                              company: e.target.value,
                            });
                          }
                        }}
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto"
                      />
                      <input
                        value={editingLead?.phone}
                        onChange={(e) => {
                          if (editingLead) {
                            setEditingLead({
                              ...editingLead,
                              phone: e.target.value,
                            });
                          }
                        }}
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto"
                      />
                      <input
                        value={editingLead?.email}
                        onChange={(e) => {
                          if (editingLead) {
                            setEditingLead({
                              ...editingLead,
                              email: e.target.value,
                            });
                          }
                        }}
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto"
                      />

                      <select
                        value={editingLead?.source}
                        onChange={(e) => {
                          if (editingLead) {
                            setEditingLead({
                              ...editingLead,
                              source: e.target.value as SourceType,
                            });
                          }
                        }}
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="email">Email</option>
                        <option value="web">Web</option>
                        <option value="phone">Phone</option>
                        <option value="referral">Referral</option>
                        <option value="other">Other</option>
                      </select>

                      <select
                        value={editingLead?.status}
                        onChange={(e) => {
                          if (editingLead) {
                            setEditingLead({
                              ...editingLead,
                              status: e.target.value as LeadStatus,
                            });
                          }
                        }}
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="new">New</option>
                        <option value="qualified">Qualified</option>
                        <option value="won">Won</option>
                        <option value="lost">Lost</option>
                      </select>
                      <button
                        onClick={handleUpdateLead}
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-150"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingLead(null)}
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
                        {p.title}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {p.company}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {p.phone}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {p.email}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {p.contact_name}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
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
  );
}
