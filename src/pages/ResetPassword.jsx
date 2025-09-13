import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AuthLayout from "../layouts/AuthLayout";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import SuccessModal from "../components/SuccessModal";
import { API_URL } from "../constants";

export default function ResetPasswordPage() {
  const location = useLocation();
  const { email, verification_token } = location.state || {};

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.password) {
      newErrors.password = "New password is required";
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

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/forgot_password/reset-password`,
        {
          email,
          verification_token,
          password: formData.confirmPassword,
        }
      );

      if (response.status === 200) {
        setShowSuccess(true);
        setFormData({
          password: "",
          confirmPassword: "",
        });
      } else {
        alert("There was an issue resetting your password. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error resetting password:",
        error.response?.data || error.message
      );

      if (error.response?.data?.errors) {
        const apiErrors = error.response.data.errors;

        setErrors((prev) => ({
          ...prev,
          password: apiErrors.password ? apiErrors.password[0] : "",
          confirmPassword: apiErrors.confirmPassword
            ? apiErrors.confirmPassword[0]
            : "",
        }));
      } else {
        alert(
          error.response?.data?.message ||
            "An error occurred while resetting your password."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = () => {
    setShowSuccess(false);
    window.location.href = "/signin";
  };

  return (
    <AuthLayout variant="forgot">
      <div className="w-full max-w-lg mx-auto space-y-8">
        <div className="text-center">
          <h2 className="font-bold text-2xl mb-3">Reset Your Password</h2>
          <p className="text-gray-700 mb-8">
            Choose a new password for your account.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <FormInput
            id="password"
            name="password"
            type="password"
            label="New Password"
            placeholder="Enter new password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="new-password"
          />
          <FormInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Re-enter new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            autoComplete="new-password"
          />
          <div className="mt-8">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>

        <SuccessModal
          open={showSuccess}
          onClose={handleGoToLogin}
          onGoToLifeline={handleGoToLogin}
          title="Password Successfully Reset!"
          description="Your password has been updated. You can now log in with your new password."
          buttonText="Back to Log In"
        />
      </div>
    </AuthLayout>
  );
}
