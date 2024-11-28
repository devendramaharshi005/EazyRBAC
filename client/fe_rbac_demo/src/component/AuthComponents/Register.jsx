/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { apiUrl } from "../../../config";

const Register = ({ toggleForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const transformedData = {
        username: data.email, // Send email as 'username'
        password: data.password,
        role: data.role,
      };

      const response = await axios.post(
        `${apiUrl}/register`,
        transformedData
      );
      toast.success("Registration successful!");
      console.log("Response:", response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <h2 className="text-2xl font-bold text-gray-800">Register</h2>

      <div>
        <label htmlFor="email" className="block text-gray-700 font-semibold">
          Email
        </label>
        <input
          type="email"
          id="email"
          className={`w-full px-4 py-2 mt-2 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } text-black bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#fcaf22]`}
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-gray-700 font-semibold">
          Password
        </label>
        <input
          type="password"
          id="password"
          className={`w-full px-4 py-2 mt-2 border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } text-black bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#fcaf22]`}
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="role" className="block text-gray-700 font-semibold">
          Role
        </label>
        <select
          id="role"
          className={`w-full px-4 py-2 mt-2 border ${
            errors.role ? "border-red-500" : "border-gray-300"
          } text-black bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#fcaf22]`}
          {...register("role", {
            required: "Role is required",
          })}
        >
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && (
          <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-[#fcaf22] text-white font-semibold rounded-full hover:bg-[#ffbb3c] focus:outline-none transition"
      >
        Register
      </button>

      <p className="text-sm text-center text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          className="text-[#fcaf22] underline focus:outline-none"
          onClick={toggleForm}
        >
          Login here
        </button>
      </p>
    </form>
  );
};

export default Register;
