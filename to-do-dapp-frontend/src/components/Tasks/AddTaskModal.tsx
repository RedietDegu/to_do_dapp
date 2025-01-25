import React, { useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  due_date: string;
}

type TaskStatus = "pending" | "completed";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: Omit<Task, "id">) => void;
}

export default function AddTaskModal({
  isOpen,
  onClose,
  onAdd,
}: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      title,
      description,
      status: "pending",
      due_date,
    });
    setTitle("");
    setDescription("");
    setDueDate("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg w-full max-w-lg transform transition-all p-8">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">
          Create a New Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-4 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800 placeholder-gray-400 transition duration-300 ease-in-out"
              required
              placeholder="Enter task title"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-4 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800 placeholder-gray-400 transition duration-300 ease-in-out min-h-[120px]"
              required
              placeholder="Enter task description"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">
              Due Date
            </label>
            <input
              type="date"
              value={due_date}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-4 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800 placeholder-gray-400 transition duration-300 ease-in-out"
              required
            />
          </div>
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:ring-2 focus:ring-gray-300 transition duration-150 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 text-white rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-500/50 transition duration-150 ease-in-out"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
