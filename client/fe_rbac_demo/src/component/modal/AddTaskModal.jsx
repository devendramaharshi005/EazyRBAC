/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { apiUrl } from "../../../config";

const AddTaskModal = ({ onClose, token, refetch }) => {
  // Use React Hook Form to manage the form state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "", // If task is null, default to empty string
      description: "", // If task is null, default to empty string
    },
  });

  const handleFormSubmit = async (data) => {
    try {
      // If task is provided, update task, otherwise create new task
      let response = await axios.post(`${apiUrl}/tasks`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Task created successfully!");
        refetch(); // Refetch the tasks after creating/updating
        onClose(); // Close the modal
      }
    } catch (error) {
      console.error("Error handling task:", error);
      toast.error("Failed to process task. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#f2f4f7] p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Task</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {/* Task Title */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-2" // Increased gap (mb-2)
            >
              Title
            </label>
            <input
              id="title"
              placeholder="Add Task title here"
              {...register("title", { required: "Title is required" })}
              className="w-full p-2 bg-gray-200 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffbb3c]"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Task Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-2" // Increased gap (mb-2)
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Add Task description here..."
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full p-2 bg-gray-200 text-black border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffbb3c]" 
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#ffbb3c] font-semibold text-[#344054] rounded-md hover:bg-[#fcaf22] transition"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
