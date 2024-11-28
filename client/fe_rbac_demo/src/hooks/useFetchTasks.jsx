import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { apiUrl } from "../../config";

export const useFetchTasks = (token, showOwnTasks = false) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true); // Start loading when fetching
      const endpoint = showOwnTasks
        ? `${apiUrl}/tasks/own` // Fetch own tasks
        : `${apiUrl}/tasks`; // Fetch all tasks

      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(res.data); // Set the fetched tasks to state
      setError(null); // Clear any previous error
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false); // Stop loading when fetch is done
    }
  }, [token, showOwnTasks]); // Dependencies to refetch when token or showOwnTasks changes

  // Use effect to automatically fetch tasks when the component mounts
  useEffect(() => {
    if (token) {
      fetchTasks(); // Fetch tasks on mount or when token changes
    }
  }, [token, fetchTasks]);

  // Return tasks, loading state, error, and the refetch function
  return { tasks, loading, error, refetch: fetchTasks };
};
