"use client";

import React, { useState } from "react";

interface Task {
  title: string;
  description: string;
  due_date: string;
  status: string;
}

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  initialData?: Task | null;
}

export default function TaskForm({
  onSubmit,
  initialData = null,
}: TaskFormProps) {
  const [task, setTask] = useState(
    initialData || {
      title: "",
      description: "",
      due_date: "",
      status: "pending",
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(task);
    if (!initialData)
      setTask({ title: "", description: "", due_date: "", status: "pending" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        placeholder="Task Title"
        className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 
                 dark:border-gray-600 dark:text-white"
        required
      />
      <textarea
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        placeholder="Description"
        className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 
                 dark:border-gray-600 dark:text-white"
      />
      <input
        type="date"
        value={task.due_date}
        onChange={(e) => setTask({ ...task, due_date: e.target.value })}
        className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 
                 dark:border-gray-600 dark:text-white"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg 
                 hover:bg-blue-700 transition-colors duration-200"
      >
        {initialData ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
}
