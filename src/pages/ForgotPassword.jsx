import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import SuccessModal from "../components/SuccessModal";
import axios from "axios";
import { API_URL } from "../constants";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await axios.post(
        `${API_URL}/forgot_password/request-reset`,
        {
          email, 
        }
      );

      if (response.status === 200) {
        setShowSuccess(true);
      } else {
        alert("There was an issue with your request.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false); 
    }
  };

  const handleGoToOTP = () => {
    setShowSuccess(false);
    navigate("/otp-verification", { state: { email } });
  };

  return (
    <AuthLayout variant="forgot">
      <div className="w-full max-w-lg mx-auto space-y-8">
        <div className="text-center">
          <h2
            className="font-bold text-3xl mb-6 mt-0 text-black"
            style={{ letterSpacing: "-1px", lineHeight: "1.2" }}
          >
            Forgot Your Password?
          </h2>
          <p
            className="text-lg text-gray-700 mb-12"
            style={{ lineHeight: "1.5" }}
          >
            Enter the email associated with your account, and we'll send
            <br />
            you a password reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <FormInput
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="e.g. researcher@unobserver.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          <Button
            type="submit"
            className="w-full text-lg rounded-full py-4 bg-green-500 hover:bg-green-600 text-white font-semibold"
          >
            Send OTP
          </Button>
        </form>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="text-base text-gray-700 flex items-center justify-center gap-2 mx-auto hover:text-gray-900 transition-colors"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <span className="font-bold text-lg">&lt;</span>
            <span className="underline">Back to Log In</span>
          </button>
        </div>

        <SuccessModal
          open={showSuccess}
          onClose={handleGoToOTP}
          onGoToLifeline={handleGoToOTP}
          title="Check Your Email!"
          description="We've sent a 6-digit verification code to your email address. Please check your inbox (and your spam folder, just in case)."
          buttonText="Go to Enter OTP"
          iconType="mail"
        />
      </div>
    </AuthLayout>
  );
}
