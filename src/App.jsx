import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import SignupPage from "./pages/Signup";
import SigninPage from "./pages/Signin";
import OTPVerificationPage from "./pages/OTPVerfication";
import LifeLinesChatPage from "./pages/lifelines/LifeLinesChatPage";

import LifeLineMeetings from "./pages/AllMeetings";
import MeetingPage from "./pages/Meeting";
import UploadMeeting from "./pages/UploadMeeting";
import Chatbot from "./pages/Chatbot";
import Setting from "./pages/Setting";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import LandingPage from "./pages/LandingPage";
import BLueLinesChatPage from "./pages/bluelines/BlueLinesChatPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Outlet />}>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Public Only Routes - for non-authenticated users */}
          <Route element={<PublicRoute />}>
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/otp-verification" element={<OTPVerificationPage />} />

            {/* <Route path="/admin-meeting" element={<MeetingPage />} /> */}
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/setting" element={<Setting />} />
            {/* <Route path="/lifeline-meeting" element={<LifeLineMeetings />} /> */}
            {/* <Route path="/livelines-chat" element={<LifeLinesChatPage />} /> */}

            <Route path="/bluelines-chat" element={<BLueLinesChatPage />} />
          </Route>

          {/* Protected Routes - Only for authenticated users */}
          <Route element={<ProtectedRoute />}>
            <Route path="/lifeline-meeting" element={<LifeLineMeetings />} />
            <Route
              path="/livelines-chat/:id?"
              element={<LifeLinesChatPage />}
            />
            <Route path="/admin-meeting" element={<MeetingPage />} />
            <Route path="/upload-meeting" element={<UploadMeeting />} />
            {/* 
            <Route path="/meeting" element={<MeetingPage />} />
            <Route path="/upload-meeting" element={<UploadMeeting />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/setting" element={<Setting />} />
          </Route>

          {/* Catch-All */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
