"use client";

import { useState, useEffect, useCallback } from "react";
import {
  createTask,
  fetchAllTasks,
  fetchSearchedTask,
  fetchTaskById,
  updateTask,
  deleteTask,
} from "../../lib/api";
import {
  CreateTaskType,
  TaskPriority,
  TaskStatus,
  TaskType,
} from "../../lib/type";
import {
  Organizations as organizations,
  getStatusColor,
} from "../../lib/utils";

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [filters, setFilters] = useState({
    title: "",
    status: "",
    updatedAfter: "",
    updatedBefore: "",
  });
  const [newTask, setNewTask] = useState<CreateTaskType>({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);

  const getAllTasks = useCallback(async () => {
    try {
      const res = await fetchAllTasks();
      setTasks(res);
    } catch (error) {
      console.error("Failed to fetch Tasks:", error);
    }
  }, [setTasks]);

  useEffect(() => {
    getAllTasks();
  }, [getAllTasks]);

  const handlecreateTask = async () => {
    const res = await createTask(newTask);
    setTasks((prev) => [res, ...prev])
    setNewTask({title: "",
    description: "",
    priority: "medium",
    status: "todo",});
    alert("Task created")
  };

  const handleEdit = async (id: string) => {
    const res = await fetchTaskById(id);
    setEditingTask(res);
    setEditingId(id);
  };

  const handleUpdateTask = async () => {
    if (!editingId || !editingTask) return;

    try {
      const payload: CreateTaskType = {
        title: editingTask.title,
        status: editingTask.status,
        description: editingTask.description,
        priority: editingTask.priority,
      };

      const updatedTask = await updateTask(editingId, payload);

      setTasks(prev => 
                prev.map(task => 
                    task._id === editingId ? updatedTask : task
                )
      );

      setEditingId(null);
      setEditingTask(null);

      fetchAllTasks();
    } catch (error) {
      console.error("Failed to update Task:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Task?")) {
      return;
    }
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter(task => task._id !== id))
      setEditingId(null);
      setEditingTask(null);
    } catch (error) {
      console.error("Failed to delete Task:", error);
    }
  };

  return (
    <>
      <div className="space-y-6 p-4">
        <h1 className="text-2xl font-bold">Tasks</h1>

        <div className="p-4 md:p-8 bg-gray-50 rounded-xl shadow-lg">
          <div className="mb-8 p-6 bg-white rounded-xl shadow-md border border-indigo-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              Create New Task
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                placeholder="Task Name"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm"
                suppressHydrationWarning={true}
              />

              <div className="relative">
                <select
                  value={newTask.status}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      status: e.target.value as TaskStatus,
                    })
                  }
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm"
                >
                  <option value="todo">Todo</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
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
                  value={newTask.priority}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      priority: e.target.value as TaskPriority,
                    })
                  }
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
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
                onClick={handlecreateTask}
              >
                Create Task
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
                  Task Name
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Priority
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
              {tasks?.map((p: any) => (
                <tr
                  key={p._id}
                  className="hover:bg-indigo-50 transition duration-150"
                >
                  {editingTask?._id === p._id ? (
                    <td colSpan={4} className="p-4">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <input
                          value={editingTask?.title}
                          onChange={(e) => {
                            if (editingTask) {
                              setEditingTask({
                                ...editingTask,
                                title: e.target.value,
                              });
                            }
                          }}
                          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto"
                        />

                        <select
                          value={newTask.priority}
                          onChange={(e) =>
                            setNewTask({
                              ...newTask,
                              priority: e.target.value as TaskPriority,
                            })
                          }
                          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 shadow-sm"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>

                        <select
                          value={editingTask?.status}
                          onChange={(e) => {
                            if (editingTask) {
                              setEditingTask({
                                ...editingTask,
                                status: e.target.value as TaskStatus,
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
                          onClick={handleUpdateTask}
                          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-150"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingTask(null)}
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

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs Tasksing-5 font-semibold rounded-full ${getStatusColor(
                            p.priority
                          )}`}
                        >
                          {p.priority}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs Tasksing-5 font-semibold rounded-full ${getStatusColor(
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
        </div>
      </div>
    </>
    //   <div className="space-y-2 space-x-10">
    //     <input
    //       placeholder="Filter by name"
    //       value={filters.name}
    //       onChange={(e) => setFilters({ ...filters, name: e.target.value })}
    //       className="pl-10 py-3 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
    //     />
    //     <select
    //       value={filters.status}
    //       onChange={(e) => setFilters({ ...filters, status: e.target.value })}
    //     >
    //       <option value="">All</option>
    //       <option value="pending">Pending</option>
    //       <option value="active">Active</option>
    //       <option value="completed">Completed</option>
    //     </select>
    //     <input
    //       type="date"
    //       onChange={(e) =>
    //         setFilters({ ...filters, updatedAfter: e.target.value })
    //       }
    //     />
    //     <input
    //       type="date"
    //       onChange={(e) =>
    //         setFilters({ ...filters, updatedBefore: e.target.value })
    //       }
    //     />
    //     <button
    //       onClick={getsearchedTasks}
    //       className="bg-blue-500 p-2 rounded-2xl text-white cursor-pointer"
    //     >
    //       Apply Filters
    //     </button>
    //   </div>

  );
}
