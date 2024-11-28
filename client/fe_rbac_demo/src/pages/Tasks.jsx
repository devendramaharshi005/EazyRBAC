import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useFetchTasks } from "../hooks/useFetchTasks";
import AddTaskModal from "../component/modal/AddTaskModal";
import TaskList from "../component/TasksComponents/TaskList";
import { PlusIcon } from "../assets/TaskAssets";
import Navbar from "../component/Navbar";
const Tasks = () => {
  const { user, token } = useContext(AuthContext); // Access user and token from AuthContext
  const fetchOwnTasks = user?.role !== "admin" && user?.role !== "moderator"; // Determine fetch logic
  const { tasks, loading, error, refetch } = useFetchTasks(
    token,
    fetchOwnTasks
  );

  const refreshTasks = () => {
    refetch(); // Trigger task list refresh
  };

  const [filter, setFilter] = useState("all"); // Track the selected filter
  const [isModalOpen, setIsModalOpen] = useState(false); // Track if the modal is open

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Filter tasks based on the selected filter pill
  const filteredTasks = () => {
    if (filter === "pending")
      return tasks.filter((task) => task.status === "pending");
    if (filter === "completed")
      return tasks.filter((task) => task.status === "completed");
    return tasks; // "all" shows all tasks
  };

  const filteredList = filteredTasks();

  // Open the modal to add a new task
  const openAddTaskModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="h-16 w-full flex-shrink-0 bg-gray-100">
        <Navbar />
      </div>
      <div className="p-4 h-[calc(100% -16)] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          {/* <h1 className="text-2xl font-bold  text-[#344054]">Task Management</h1> */}
          {/* Filter Pills */}
          <div className="flex gap-4 mb-6">
            {["all", "pending", "completed"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-2 rounded-full font-semibold ${
                  filter === type
                    ? "bg-[#344054] text-white"
                    : "bg-gray-300  text-gray-700 hover:bg-gray-400"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)} Tasks
              </button>
            ))}
          </div>
          {/* Add Task Button */}
          <button
            onClick={openAddTaskModal} // Open modal with empty values
            className="flex items-center font-semibold  text-[#293544] gap-2 px-4 py-2 bg-[#ffbb3c] rounded-full hover:bg-[#fcaf22] transition"
          >
            <>
              <PlusIcon className="w-5 h-5" /> {/* Plus icon */}
              Add Task
            </>
          </button>
        </div>

        {/* Task List */}
        <TaskList
          tasks={filteredList}
          title={`${filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks`}
          onSuccessTask={refreshTasks}
        />

        {/* Edit Task Modal */}
        {isModalOpen && (
          <AddTaskModal
            onClose={() => setIsModalOpen(false)} // Close the modal
            token={token}
            refetch={refetch}
          />
        )}
      </div>
    </>
  );
};

export default Tasks;
