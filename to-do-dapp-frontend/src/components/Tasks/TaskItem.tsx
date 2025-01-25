"use client";
import React, { useState } from "react";
import EditTaskModal from "./EditTaskModal";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  due_date: string;
}

type TaskStatus = "pending" | "completed";
interface TaskItemProps {
  task: Task;
  onUpdate: (task: Task) => any;
  onDelete: (id: string) => void;
  onToggleComplete: (task: Task) => void;
}

export default function TaskItem({
  task,
  onUpdate,
  onDelete,
  onToggleComplete,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const toggleComplete = async () => {
    onToggleComplete({ ...task, status: "pending" });
  };

  return (
    <div
      className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg 
                    hover:shadow-2xl transition-all duration-300 overflow-hidden
                    border border-gray-200 dark:border-gray-700"
    >
      <div className="p-5 bg-gray-900 dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative">
              {task.status === "completed" && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg className="w-3 h-3 text-green-500" viewBox="0 0 12 12">
                    <path
                      d="M3.5 6.5l2 2 4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3
                className={`text-xl font-semibold ${
                  task.status === "completed"
                    ? "line-through text-gray-400 dark:text-gray-500"
                    : "text-white dark:text-gray-100"
                }`}
              >
                {task.title}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  {new Date(task.due_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            <input
              type="radio"
              checked={task.status === "completed"}
              onChange={toggleComplete}
              className="w-6 h-6 rounded-lg text-blue-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={() => setIsDeleteDialogOpen(true)}
              className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {task.description && (
          <div className="mt-5 pl-8">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-200"
            >
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  isExpanded ? "transform rotate-90" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-sm">View Description</span>
            </button>

            {isExpanded && (
              <p className="mt-3 text-gray-400 dark:text-gray-300 text-sm leading-relaxed">
                {task.description}
              </p>
            )}
          </div>
        )}
      </div>

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={onUpdate}
        task={task}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => onDelete(task.id)}
        taskTitle={task.title}
      />
    </div>
  );
}
