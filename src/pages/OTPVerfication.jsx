import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Button from "../components/Button";
import axios from "axios";
import { API_URL } from "../constants";

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);

  const { email } = location.state || {};

  if (!email) {
    navigate("/forgot-password");
    return null;
  }

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      const digits = value.slice(0, 6).split("");
      const newOtp = [...otp];
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);

      const nextIndex = Math.min(index + digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
    } else {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      alert("Please enter complete 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/forgot_password/verify-otp`,
        {
          email,
          token: otpValue,
        }
      );

      if (response.status === 200) {
        navigate("/reset-password", {
          state: {
            email,
            verification_token: response.data.verification_token,
          },
        });
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await axios.post(`${API_URL}/forgot_password/request-reset`, { email });
      alert("OTP has been resent to your email");
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("Could not resend OTP. Please try again later.");
    }
  };

  return (
    <AuthLayout variant="forgot">
      <div className="w-full max-w-lg mx-auto space-y-8">
        <div className="text-center">
          <h2
            className="font-bold text-3xl mb-6 mt-0 text-black"
            style={{ letterSpacing: "-1px", lineHeight: "1.2" }}
          >
            Enter Verification Code
          </h2>
          <p
            className="text-lg text-gray-700 mb-12"
            style={{ lineHeight: "1.5" }}
          >
            We've sent a 6-digit verification code to <b>{email}</b>.<br />
            Please enter it below to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handleOtpChange(index, e.target.value.replace(/\D/g, ""))
                }
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all"
              />
            ))}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full text-lg rounded-full py-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>

        <div className="text-center space-y-4">
          <p className="text-gray-600">Didn't receive the code?</p>
          <button
            type="button"
            onClick={handleResendOTP}
            className="text-green-600 hover:text-green-700 font-semibold underline transition-colors"
          >
            Resend OTP
          </button>
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-base text-gray-700 flex items-center justify-center gap-2 mx-auto hover:text-gray-900 transition-colors"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <span className="font-bold text-lg">&lt;</span>
            <span className="underline">Back to Forgot Password</span>
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
