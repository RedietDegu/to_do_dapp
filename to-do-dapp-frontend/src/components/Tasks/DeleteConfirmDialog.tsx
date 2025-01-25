import React from "react";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
}

export default function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
}: DeleteConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-lg transform transition-all scale-95 hover:scale-100">
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Confirm Deletion
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Are you sure you want to delete the task. This action is permanent
            and cannot be undone.
          </p>
          <div className="flex justify-end space-x-6">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-500/50 transition duration-150 ease-in-out"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
