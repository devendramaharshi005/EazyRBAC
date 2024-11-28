import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { apiUrl } from "../../../config";

/* eslint-disable react/prop-types */
const EditTaskModal = ({ task, onClose, onUpdate }) => {
  const { id, title, description, status } = task;

  // Access token from the AuthContext
  const { token } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title,
      description,
      status,
    },
  });

  // Set initial values in react-hook-form
  useState(() => {
    setValue("title", title);
    setValue("description", description);
    setValue("status", status);
  }, [title, description, status, setValue]);

  // Handle form submit
  const onSubmit = async (data) => {
    if (!token) {
      toast.error("No authorization token found!");
      return;
    }

    try {
      const response = await axios.put(
        `${apiUrl}/tasks/${id}`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token from context in the Authorization header
          },
        }
      );
      onUpdate(response.data); // Update the task in the parent component
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating task:", error.response?.data?.message);
      toast.error(error.response?.data?.message || "Failed to update task.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#f2f4f7] p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-800 font-medium">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className={`w-full p-2 border rounded ${
                errors.title ? "border-red-500" : "border-gray-300"
              } bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-[#fcaf22]`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-800 font-medium">
              Description
            </label>
            <textarea
              {...register("description")}
              className={`w-full p-2 border rounded ${
                errors.description ? "border-red-500" : "border-gray-300"
              } bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-[#fcaf22]`}
              rows="4"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-800 font-medium">Status</label>
            <select
              {...register("status")}
              className={`w-full p-2 border rounded ${
                errors.status ? "border-red-500" : "border-gray-300"
              } bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-[#fcaf22]`}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#ffbb3c] font-semibold text-[#344054] rounded-md hover:bg-[#fcaf22]"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
