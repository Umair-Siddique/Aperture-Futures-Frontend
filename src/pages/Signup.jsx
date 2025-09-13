import { useState } from "react";
import { useAxios } from "../hooks";
import AuthLayout from "../layouts/AuthLayout";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import ErrorMessage from "../components/ErrorMessage";
import { API_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../components/SuccessModal";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const { request, loading } = useAxios();

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
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const response = await request({
        route: `${API_URL}/auth/signup`,
        method: "POST",
        data: {
          email: formData.email,
          password: formData.password,
        },
      });

      if (response && response.user_id) {
        // Save user_id to localStorage
        localStorage.setItem("user_id", response.user_id);
        
        // Show success modal
        setShowSuccess(true);
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: error.message || "Signup failed",
      }));
    }
  };

  const handleGoToLifeline = () => {
    setShowSuccess(false);
    navigate("/lifeline");
  };

  const navigateToSignin = () => {
    navigate("/signin");
  };

  return (
    <>
      <AuthLayout variant="signup">
        <ErrorMessage message={errors.general} />
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="space-y-4">
            <FormInput
              id="email"
              name="email"
              type="email"
              label="Email address"
              placeholder="you@example.com"
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
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="new-password"
            />
            <FormInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              autoComplete="new-password"
            />
          </div>
          <div className="pt-2">
            <Button type="submit" loading={loading}>
              Create account
            </Button>
          </div>
        </form>
        <div className="mt-8 text-center">
          <p className="text-sm" style={{ color: "#111" }}>
            Already have an account?{" "}
            <button
              type="button"
              onClick={navigateToSignin}
              className="font-medium transition-colors duration-200"
              style={{ color: "#00C2A8" }}
              onMouseEnter={(e) => (e.target.style.color = "#5BC0EB")}
              onMouseLeave={(e) => (e.target.style.color = "#00C2A8")}
            >
              Sign in
            </button>
          </p>
        </div>
      </AuthLayout>
      <SuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        onGoToLifeline={handleGoToLifeline}
      />
    </>
  );
}