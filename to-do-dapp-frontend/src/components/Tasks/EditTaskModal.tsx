import React, { useState, useEffect } from "react";
import { FaSave, FaTimes } from "react-icons/fa"; // Icon library for buttons

interface Task {
  title: string;
  description: string;
  due_date: string;
  status: TaskStatus;
  id: string;
}

type TaskStatus = "pending" | "completed";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (task: Task) => void;
  task: Task;
}

export default function EditTaskModal({
  isOpen,
  onClose,
  onEdit,
  task,
}: EditTaskModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [due_date, setdue_date] = useState(task.due_date);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setdue_date(task.due_date);
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit({
      ...task,
      title,
      description,
      due_date,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg p-8 transition-all transform">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white text-center">
          Edit Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-150 ease-in-out"
              required
              placeholder="Task Title"
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-150 ease-in-out min-h-[120px]"
              required
              placeholder="Task Description"
            />
          </div>

          {/* Due Date Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Due Date
            </label>
            <input
              type="date"
              value={due_date}
              onChange={(e) => setdue_date(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-150 ease-in-out"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
            >
              <FaTimes className="mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50 transition duration-150 ease-in-out"
            >
              <FaSave className="mr-2" />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
