/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const Login = ({ toggleForm }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Use login method from AuthContext
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const transformedData = {
      username: data.email, // Map email to username
      password: data.password,
    };
    setIsSubmitting(true);

    try {
      // Call the login function from AuthContext
      await login(transformedData.username, transformedData.password);
      navigate("/tasks");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 h-full"
      noValidate
    >
      <h2 className="text-2xl font-bold text-gray-800">Login</h2>
      <div>
        <label htmlFor="email" className="block text-gray-700 font-semibold">
          Email
        </label>
        <input
          type="email"
          id="email"
          className={`w-full px-4 py-2 mt-2 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } text-black bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#344054]`}
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
          } text-black bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#344054]`}
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
      <button
        type="submit"
        className="w-full px-4 py-2 bg-[#344054] text-white font-semibold rounded-full hover:[bg-[#344054]] focus:outline-none transition"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
      <p className="text-sm text-center text-gray-600">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          className="text-[#344054] underline focus:outline-none"
          onClick={toggleForm}
        >
          Register here
        </button>
      </p>
    </form>
  );
};

export default Login;
