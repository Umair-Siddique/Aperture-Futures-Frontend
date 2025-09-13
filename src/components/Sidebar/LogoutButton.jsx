import { LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";

const LogoutModal = ({ open, onCancel, onConfirm }) => {
  if (!open) return null;
  
  // Render modal in a portal to ensure it's at the top level of the DOM
  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        <div className="mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50">
            <LogOut size={40} className="text-red-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">Are you sure you want<br />to log out?</h2>
        <p className="text-center text-gray-600 mb-6">
          You will be signed out of Aperture Futures. You can log in again at any time.
        </p>
        <div className="flex w-full gap-4">
          <button
            className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold bg-white hover:bg-gray-100 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
            onClick={onConfirm}
          >
            Yes, Log Out
          </button>
        </div>
      </div>
    </div>,
    document.body // Render at the body level
  );
};

const LogoutButton = ({
  onLogout,
  userName = "John Clark",
  userEmail = "johnclark1@gmail.com",
  userAvatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
}) => {
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-between px-3 py-2 hover:shadow-md transition-shadow cursor-pointer w-full h-[54px]"
      onClick={onLogout}
    >
      <div className="flex items-center space-x-2 flex-1 min-w-0">
        <img
          src={userAvatar}
          alt={userName}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {userName}
          </p>
          <p className="text-xs text-gray-500 truncate">{userEmail}</p>
        </div>
      </div>

      <div className="flex-shrink-0 ml-2">
        <div className="w-6 h-6 rounded border border-red-500 flex items-center justify-center bg-white hover:bg-red-50 transition-colors">
          <LogOut size={12} className="text-red-500" />
        </div>
      </div>
    </div>
  );
};

// Utility function to clear all storage
const clearAllStorage = () => {
  try {
    // Clear localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
      console.log('localStorage cleared');
    }
    
    // Clear sessionStorage
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.clear();
      console.log('sessionStorage cleared');
    }
    
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
};

// Demo component
const Demo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();  
  
  const handleLogoutClick = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleConfirm = () => {
    setModalOpen(false);
    
    // Clear all storage
    const storageCleared = clearAllStorage();
    
    if (storageCleared) {
      setLoggedOut(true);
      
      // Force a complete page reload to reset all application state
      setTimeout(() => {
        // Use window.location.href for a complete reload instead of navigate
        window.location.href = '/';
      }, 500); // Reduced timeout for better UX
    } else {
      alert("Logout completed, but there was an issue clearing some data.");
      // Still reload even if storage clearing had issues
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    }
  };

  if (loggedOut) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Logging out and clearing data...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <LogoutButton onLogout={handleLogoutClick} />
      <LogoutModal open={modalOpen} onCancel={handleCancel} onConfirm={handleConfirm} />
    </div>
  );
};

export default Demo;