"use client";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import TaskItem from "./TaskItem";
import TaskFilters from "./TaskFilters";
import { useStore } from "@/store/appStore";
import AddTaskModal from "./AddTaskModal";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { byteToHex } from "../../utils/constants";

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  due_date: string;
}

type TaskStatus = "pending" | "completed";

export default function TaskList() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const { session } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const fetchTasks = async ({ pageParam = 0 }) => {
    const result = await session?.query<any>("get_all_tasks", {
      user_id: session.account.id,
      pointer: pageParam,
      n_tasks: 10,
    });
    const tasks = result?.tasks ?? [];
    const pointer = result?.pointer ?? null;
    return { tasks, pointer };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["tasks", byteToHex(session?.account.id as any)],
      queryFn: fetchTasks,
      getNextPageParam: (lastPage) => lastPage.pointer ?? false,
      initialPageParam: 0,
      enabled: !!session,
    });

  const handleUpdateTask = async (updatedTask: Task) => {
    if (!session) {
      toast.error("Please connect your wallet to continue");
      return;
    }
    setIsLoading(true);
    try {
      await session?.call({
        name: "update_task",
        args: [
          updatedTask.id,
          updatedTask.title,
          updatedTask.description,
          updatedTask.status,
          new Date(updatedTask.due_date).getTime(),
        ],
      });
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Update successfully");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!session) {
      toast.error("Please connect your wallet to continue");
      return;
    }
    setIsLoading(true);
    try {
      await session?.call({
        name: "delete_task",
        args: [taskId],
      });
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Delete successfully");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (newTask: Omit<Task, "id">) => {
    if (!session) {
      toast.error("Please connect your wallet to continue");
      return;
    }
    setIsLoading(true);
    try {
      await session?.call({
        name: "create_task",
        args: [
          newTask.title,
          newTask.description,
          new Date(newTask.due_date).getTime(),
        ],
      });
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task added");
    } catch (error) {
      toast.error("Error adding task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTaskCompletion = async (task: Task) => {
    try {
      await session?.call({
        name: "complete_task",
        args: [task.id],
      });
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Status changed!");
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status.");
    }
  };

  const filteredAndSortedTasks = data?.pages
    .flatMap((page) => page.tasks)
    .filter((task) => {
      if (task.status === filterStatus) {
        return true;
      } else if (filterStatus === "all") {
        return true;
      } else {
        return false;
      }
    })
    .sort((a, b) => {
      const order = sortOrder === "asc" ? 1 : -1;
      return (
        (new Date(a.due_date).getTime() - new Date(b.due_date).getTime()) *
        order
      );
    });

  return (
    <div className="space-y-6 h-full flex flex-col px-6 py-4">
      {/* Filters Section */}
      <TaskFilters
        filterStatus={filterStatus}
        sortOrder={sortOrder}
        onFilterChange={setFilterStatus}
        onSortChange={setSortOrder}
      />

      <div className="flex-1 overflow-y-auto">
        {/* Task Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedTasks?.map((task) => (
            // eslint-disable-next-line react/jsx-key
            <div className="transform transition duration-200 hover:scale-105 hover:shadow-lg p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleTaskCompletion}
              />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 disabled:opacity-50"
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "No More Tasks"}
          </button>
        </div>
      </div>

      {/* Add Task Button */}
      <div className="fixed bottom-12 right-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-500 text-white px-5 py-3 rounded-full hover:bg-green-600 transition-all"
        >
          Add Task
        </button>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTask}
      />
    </div>
  );
}
