import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAxios, useAuth } from "../hooks";
import AuthLayout from "../layouts/AuthLayout";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import ErrorMessage from "../components/ErrorMessage";
import { API_URL } from "../constants";

export default function SigninPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const { request, loading } = useAxios();
  const { login, user } = useAuth(); // Add user to see current auth state

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await request({
        route: `${API_URL}/auth/signin`,
        method: "POST",
        data: {
          email: formData.email,
          password: formData.password,
        },
      });

      if (response && response.access_token) {
        // Save tokens to storage
        // sessionStorage.setItem("access_token", response.access_token);
        // sessionStorage.setItem("user_id", response.user_id);
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("user_id", response.user_id);
        // Save role to localStorage
        if (response.role) {
          localStorage.setItem("user_role", response.role);
        }

        // Update auth context with ALL user data including role
        login({
          id: response.user_id,
          email: formData.email,
          access_token: response.access_token,
          role: response.role, // Make sure to include role here
        });

        console.log(login, "this is login");

        // Add a small delay to ensure auth context is updated
        setTimeout(() => {
          // Navigate based on role
          if (response.role === "admin") {
            navigate("/admin-meeting", { replace: true });
          } else {
            navigate("/lifeline-meeting", { replace: true });
          }
        }, 100);
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: error.message || "Login failed",
      }));
    }
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };

  return (
    <AuthLayout variant="signin">
      <ErrorMessage message={errors.general} />

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <FormInput
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="name@email.org"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
          />

          <FormInput
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="current-password"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <button
              type="button"
              className="font-medium transition-colors"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
              onClick={() => navigate("/forgot-password")}
            >
              <span className="text-black">Forgot Password?</span>{" "}
              <span className="text-green-500 hover:text-green-400">
                Reset it
              </span>
            </button>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            loading={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
          >
            Log In
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={navigateToSignup}
              className="font-medium text-green-500 hover:text-green-400 transition-colors duration-200"
            >
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
