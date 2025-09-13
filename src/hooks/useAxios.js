import { useState, useCallback } from "react";
import axios from "axios";

export const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async ({ route, method, data = null, headers = {}, params = {} }) => {
      setLoading(true);
      setError(null);

      try {
        // Get token from localStorage - matching your AuthProvider
        const token = localStorage.getItem("access_token");
        console.log(token, "token intialized");

        // Prepare headers with authentication
        const requestHeaders = {
          "Content-Type": "application/json",
          ...headers,
        };

        // Add Authorization header if token exists
        if (token) {
          console.log("this is token", token);
          requestHeaders.Authorization = `Bearer ${token}`;
        }

        const response = await axios({
          url: `${route}`,
          method: method.toLowerCase(),
          data,
          headers: requestHeaders,
          params,
          withCredentials: true, // Include cookies with each request
        });
        console.log(response, "this is response for");

        return response.data;
      } catch (err) {
        if (err.response) {
          // Server responded with a non-2xx status code
          const errorMessage =
            err.response.data.message ||
            err.response.data.error ||
            `Request failed with status ${err.response.status}`;

          setError(err.response.data);

          // Handle 401 specifically
          if (err.response.status === 401) {
            throw new Error("Authentication failed - please login again");
          }

          throw new Error(errorMessage);
        } else if (err.request) {
          // Request made but no response
          setError("No response received from server");
          throw new Error("No response received from server");
        } else {
          // Something else went wrong
          setError(err.message);
          throw err;
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { request, loading, error };
};
