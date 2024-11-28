/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import EditTaskModal from "../modal/EditTaskModal";
import {
  CalendarIcon,
  DeleteIcon,
  EditIcon,
  MoreHorizIcon,
  StatusIcon,
  UserIcon,
} from "../../assets/TaskAssets";
import roles from "../../rolesFrontend/rolesFrontend";
import { apiUrl } from "../../../config";

const Task = ({ task, onSuccessTask }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { token, user } = useContext(AuthContext);

  const currentUser = user;

  // Role-based permissions check
  const canEdit = (task) => {
    if (!currentUser) return false;

    const isOwner = task.createdBy === currentUser.username;
    const permissions = roles[currentUser.role];

    return (
      permissions.includes("task:update_any") ||
      (permissions.includes("task:update_own") && isOwner)
    );
  };

  const canDelete = (task) => {
    if (!currentUser) return false;

    const isOwner = task.createdBy === currentUser.username;
    const permissions = roles[currentUser.role];

    return (
      permissions.includes("task:delete_any") ||
      (permissions.includes("task:delete_own") && isOwner)
    );
  };

  const canEditFlag = canEdit(task);
  const canDeleteFlag = canDelete(task);
  // Destructure task with default values
  const {
    id,
    title = "Untitled Task",
    description = "No description provided",
    status = "pending",
    priority = "medium",
    lastModifiedBy = "Unknown",
    createdAt = new Date(),
    createdBy = "Unknown",
    lastModifiedAt = null,
    dueDate = null,
  } = task || {};

  // Determine status and priority colors
  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "bg-green-50 border-green-200 text-green-800";
      case "pending":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const onDelete = async (id) => {
    if (!id) {
      toast.error("Invalid task ID!");
      return;
    }

    if (!token) {
      toast.error("No authorization token found!");
      return;
    }

    try {
      const response = await axios.delete(
        `${apiUrl}/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        toast.success("Task deleted successfully!");
        onSuccessTask(null);
      } else {
        throw new Error("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to delete task. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleDelete = () => {
    onDelete(id);
    setShowDeleteConfirm(false);
  };
  const [showEditModal, setShowEditModal] = useState(false);

  const handleUpdate = async () => {
    onSuccessTask(null);
  };

  // Format date with more readable output
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-[360px] w-[350px]">
      {/* Task Header */}
      <div
        className={`p-3 border-b flex items-center justify-between ${getStatusColor()}`}
      >
        <div className="flex items-center space-x-2 ">
          <StatusIcon status={status} />
          <span className="text-sm font-medium capitalize ">{status}</span>
        </div>

        {/* Options Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="hover:bg-gray-100 rounded-full p-1"
          >
            <MoreHorizIcon />
          </button>

          {showOptions && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
              <button
                disabled={!canEditFlag}
                onClick={() => {
                  setShowEditModal(true);
                  setShowOptions(false);
                }}
                className={`w-full flex items-center space-x-2 text-left px-4 py-2 rounded-md 
    ${
      canEditFlag
        ? "bg-white text-black hover:bg-gray-100 cursor-pointer"
        : "bg-gray-200 text-gray-400 cursor-not-allowed"
    }`}
              >
                <EditIcon
                  className={`w-4 h-4 ${
                    !canEditFlag ? "text-gray-400" : "text-black"
                  }`}
                />
                <span>Edit Task</span>
              </button>

              <button
                disabled={!canDeleteFlag}
                onClick={() => {
                  setShowDeleteConfirm(true);
                  setShowOptions(false);
                }}
                className={`w-full flex items-center space-x-2 text-left px-4 py-2 rounded-md 
    ${
      canDeleteFlag
        ? "bg-white text-red-600 hover:bg-gray-100 cursor-pointer"
        : "bg-gray-200 text-gray-400 cursor-not-allowed"
    }`}
              >
                <DeleteIcon
                  className={`w-4 h-4 ${
                    !canDeleteFlag ? "text-gray-400" : "text-red-600"
                  }`}
                />
                <span>Delete Task</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Task Body */}
      <div className="p-4 space-y-3 h-[calc(100%-56px)] overflow-y-auto hiddenScroll">
        {/* Title and Description */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
          {/* Assignee */}
          <div className="flex items-center space-x-2 ">
            <UserIcon className="w-4 h-4 flex-shrink-0" />
            <span className="">Created By: {createdBy}</span>
          </div>

          {/* Priority */}
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded text-xs ${getPriorityColor()}`}>
              Priority: {priority}
            </span>
          </div>

          {/* Created By */}
          <div className="flex items-center space-x-2 ">
            <UserIcon className="w-4 h-4 flex-shrink-0" />
            <span className="">Last Modified by: {lastModifiedBy}</span>
          </div>

          {/* Due Date */}
          {dueDate && (
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-4 h-4" />
              <span>Due: {new Date(dueDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Timestamps */}
        <div className="text-xs text-gray-500 space-y-1 border-t pt-2 ">
          <div>Created: {formatDate(createdAt)}</div>
          {lastModifiedAt && (
            <div>Last Modified: {formatDate(lastModifiedAt)}</div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#f2f4f7] p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Confirm Deletion
            </h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete the task &quot;{title}&quot;? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <EditTaskModal
          task={task}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Task;
