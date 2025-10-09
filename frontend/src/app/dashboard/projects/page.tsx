"use client";

import { useState, useEffect, useCallback } from "react";
import {
  createProject,
  fetchAllProjects,
  fetchSearchedProject,
  fetchProjectById,
  updateProject,
  deleteProject,
} from "../../lib/api";
import { CreateProjectType, ProjectStatus, ProjectType } from "../../lib/type";
import {
  Organizations as organizations,
  getStatusColor,
} from "../../lib/utils";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "@/app/components/Pagination/page";

export default function Projects() {
  //const [projects, setProjects] = useState<ProjectType[]>([]);
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    updatedAfter: "",
    updatedBefore: "",
  });
  const [searchResults, setSearchResults] = useState<ProjectType[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [newProject, setNewProject] = useState<CreateProjectType>({
    name: "",
    status: "pending",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectType | null>(
    null
  );
  const [selectedOrg, setSelectedOrg] = useState("");

  const {
    data: paginatedProjects,
    refetch,
    pagination,
    isLoading,
    handlePageChange,
  } = usePagination(fetchAllProjects);

  const getsearchedProjects = async () => {
    // const query = new URLSearchParams(filters as any).toString();
    const data = await fetchSearchedProject(filters);
    setSearchResults(data);
    setIsSearching(true);
    refetch()
  };

  const displayProjects = isSearching ? searchResults : paginatedProjects;

  const handlecreateProject = async () => {
    if (!selectedOrg) {
      alert("Please select an organization");
      return;
    }

    try {
      await createProject(selectedOrg, newProject);
      refetch();
      //handlePageChange(1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id: string) => {
    const res = await fetchProjectById(id);
    const projectData = res.project;
    setEditingProject(projectData);
    setEditingId(id);
    refetch();
  };

  const handleUpdateProject = async () => {
    if (!editingId || !editingProject) return;

    try {
      const payload: CreateProjectType = {
        name: editingProject.name,
        status: editingProject.status,
        client: editingProject.client,
      };

      await updateProject(editingId, payload);
      refetch();
      // setProjects(prev =>
      //           prev.map(project =>
      //               project._id === editingId ? updatedProject : project
      //           )
      // );

      setEditingId(null);
      setEditingProject(null);
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }
    try {
      await deleteProject(id);
      refetch();
      setEditingId(null);
      setEditingProject(null);
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <>
      <div className="space-y-6 p-4">
        <h1 className="text-2xl font-bold">Projects</h1>

        <div className="p-4 md:p-8 bg-gray-50 rounded-xl shadow-lg">
          <div className="mb-8 p-6 bg-white rounded-xl shadow-md border border-indigo-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              Create New Project
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                placeholder="Project Name"
                value={newProject.name}
                onChange={(e) =>
                  setNewProject({ ...newProject, name: e.target.value })
                }
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm"
                suppressHydrationWarning={true}
              />

              <div className="relative">
                <select
                  suppressHydrationWarning={true}
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
                  suppressHydrationWarning={true}
                  value={newProject.status}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      status: e.target.value as ProjectStatus,
                    })
                  }
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
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

              <button
                className="bg-indigo-600 p-3 rounded-xl text-white font-medium cursor-pointer hover:bg-indigo-700 transition"
                onClick={handlecreateProject}
              >
                Create Project
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center space-x-4 border-b pb-4">
          <input
            placeholder="Filter by name"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="p-3 border rounded-xl"
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
            className="p-3 border rounded-xl"
          />
          <input
            type="date"
            onChange={(e) =>
              setFilters({ ...filters, updatedBefore: e.target.value })
            }
            className="p-3 border rounded-xl"
          />
          <button
            onClick={getsearchedProjects}
            className="bg-green-600 p-3 rounded-xl text-white font-medium cursor-pointer hover:bg-green-700 transition"
          >
            Apply Filters
          </button>
        </div>

        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Project Name
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
              {displayProjects?.map((p: any) => (
                <tr
                  key={p._id}
                  className="hover:bg-indigo-50 transition duration-150"
                >
                  {editingProject?._id === p._id ? (
                    <td colSpan={4} className="p-4">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <input
                          suppressHydrationWarning={true}
                          value={editingProject?.name}
                          onChange={(e) => {
                            if (editingProject) {
                              setEditingProject({
                                ...editingProject,
                                name: e.target.value,
                              });
                            }
                          }}
                          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto"
                        />
                        <select
                          suppressHydrationWarning={true}
                          value={editingProject?.status}
                          onChange={(e) => {
                            if (editingProject) {
                              setEditingProject({
                                ...editingProject,
                                status: e.target.value as ProjectStatus,
                              });
                            }
                          }}
                          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="">All</option>
                          <option value="pending">Pending</option>
                          <option value="active">Active</option>
                          <option value="completed">Completed</option>
                        </select>
                        <button
                          onClick={handleUpdateProject}
                          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-150"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingProject(null)}
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
                          className={`px-3 py-1 inline-flex text-xs Projecting-5 font-semibold rounded-full ${getStatusColor(
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
