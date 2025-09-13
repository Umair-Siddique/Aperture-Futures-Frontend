import React, { useState, useEffect } from "react";
import DeleteMeetingModal from "../components/DeleteMeetingModal";
import {
  Calendar,
  Search,
  Plus,
  MessageCircle,
  Edit,
  Trash2,
} from "lucide-react";
import UploadMeeting from "./UploadMeeting";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AdminMeetingButton from "../components/Sidebar/AdminMeetingButton";
import SearchBar from "../components/Sidebar/SearchBar";
import { useAxios } from "../hooks";
import { API_URL } from "../constants";

export default function AdminMeeting() {
  const { request } = useAxios();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // API Integration State
  const [transcriptions, setTranscriptions] = useState({ items: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(true);

  // API Integration
  const fetchTranscriptions = async (page = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const result = await request({
        route: `${API_URL}/transcribe/list-transcription`,
        method: "GET",
        params: {
          page: page,
        },
      });

      const responseData = result.transcriptions || result.data || result;
      const newItems = responseData.items || [];

      if (append && page > 1) {
        // Append new items to existing transcriptions.items for pagination
        setTranscriptions((prevTranscriptions) => ({
          ...prevTranscriptions,
          items: [...(prevTranscriptions.items || []), ...newItems],
        }));
      } else {
        // Replace transcriptions for initial load
        setTranscriptions(responseData);
      }

      setCurrentPage(page);

      // Set pagination info based on API response
      if (responseData.total_pages) {
        setHasMore(page < responseData.total_pages);
      } else if (responseData.has_next !== undefined) {
        setHasMore(responseData.has_next);
      } else {
        // Fallback: assume no more data if we get less items
        setHasMore(newItems.length > 0);
      }
    } catch (err) {
      console.error("Failed to fetch transcriptions:", err);

      // Handle authentication errors
      if (err.message.includes("Authentication")) {
        // logout(); // Uncomment if you have logout function
      }
    } finally {
      setLoading(false);
      if (append) {
        setLoadingMore(false);
      }
    }
  };

  // Delete Meeting API Call
  const deleteMeeting = async (meetingTitle) => {
    try {
      await request({
        route: `${API_URL}/transcribe/delete`,
        method: "DELETE",
        params: {
          title: meetingTitle,
        },
      });

      // Remove the deleted meeting from the state without refreshing
      setTranscriptions((prevTranscriptions) => ({
        ...prevTranscriptions,
        items: prevTranscriptions.items.filter(
          (meeting) => meeting.title !== meetingTitle
        ),
      }));

      console.log("Meeting deleted successfully:", meetingTitle);
    } catch (err) {
      console.error("Failed to delete meeting:", err);
      // You might want to show an error toast/notification here
      throw err; // Re-throw to handle in the calling function if needed
    }
  };

  // Load More Handler
  const handleLoadMore = () => {
    if (hasMore && !loadingMore) {
      fetchTranscriptions(currentPage + 1, true);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchTranscriptions(1, false);
  }, []);

  // Filter uploaded meetings based on search term
  const filteredMeetings = transcriptions.items.filter((meeting) =>
    meeting.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meeting.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Custom MeetingsButton
  const MeetingsSidebarButton = (props) => (
    <AdminMeetingButton
      {...props}
      onClick={() => console.log("Navigate to meeting")}
    />
  );

  const handleAddMeeting = () => {
    console.log("Add Meeting clicked - navigating to upload page");
    navigate("/upload-meeting");
  };

  const handleChatWithMeeting = (meeting) => {
    console.log("Chat with meeting:", meeting);
    // Navigate to LifeLines chat page with meeting data
    navigate("/livelines-chat", {
      state: {
        title: meeting.title || "Meeting Chat",
        meeting: meeting
      }
    });
  };

  const handleEditMeeting = (meeting) => {
    console.log("Edit meeting:", meeting);
    // TODO: Implement edit meeting functionality
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteMeeting = (meeting) => {
    // Store the entire meeting object instead of just the ID
    setMeetingToDelete(meeting);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!meetingToDelete) return;

    setIsDeleting(true);
    try {
      // Call the delete API with the meeting title
      await deleteMeeting(meetingToDelete.title);

      // Close the modal
      setDeleteModalOpen(false);
      setMeetingToDelete(null);

      console.log("Meeting deleted successfully:", meetingToDelete.title);
    } catch (error) {
      // Handle error - you might want to show an error message to the user
      console.error("Error deleting meeting:", error);
      // You could add a toast notification here
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseDeleteModal = () => {
    if (!isDeleting) {
      setDeleteModalOpen(false);
      setMeetingToDelete(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-80 h-screen sticky top-0 border-r border-gray-200">
        <Sidebar MeetingsButtonComponent={MeetingsSidebarButton} />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="px-8 pt-8 pb-6">
          {/* Page Name */}
          <div className="mb-4">
            <h1 className="text-lg font-medium text-gray-600">Meetings</h1>
          </div>

          {/* Separator */}
          <div className="w-full h-px bg-gray-200 mb-6"></div>

          {/* Main Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <h2
                className="text-black mb-2"
                style={{
                  fontFamily: "Clash Grotesk",
                  fontWeight: 500,
                  fontSize: "28px",
                  lineHeight: "36px",
                  letterSpacing: "-2%",
                }}
              >
                Manage Uploaded Meetings
              </h2>
              <p
                className="text-gray-500"
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "22.4px",
                  letterSpacing: "0%",
                }}
              >
                View, edit, or delete meeting data currently in LifeLines.
              </p>
            </div>

            <div className="flex gap-4 items-center">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search meeting by title"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 text-gray-700 w-80 transition-all duration-200"
                />
              </div>

              {/* Calendar Button */}
              <button className="flex items-center gap-3 px-6 py-3 rounded-xl border border-gray-300 bg-white shadow-lg text-gray-700 hover:bg-gray-50 hover:shadow-xl transition-all duration-200">
                <span className="font-medium">Select Date</span>
                <Calendar className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="px-8 py-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-gray-500">Loading meetings...</div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Add Meeting Card */}
                <div
                  className="relative rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 touch-manipulation"
                  style={{
                    background:
                      "linear-gradient(221.14deg, #FABF35 23.31%, #B600EB 77.32%)",
                  }}
                  onClick={handleAddMeeting}
                  onTouchStart={() => {}}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleAddMeeting();
                    }
                  }}
                >
                  <div className="flex flex-col items-center justify-center text-center h-48">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                      <Plus className="w-8 h-8 text-gray-700" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Add Meeting
                    </h3>
                    <p className="text-white/90">
                      Upload a new meeting to analyze
                    </p>
                  </div>
                </div>

                {/* Only Show Uploaded Meetings from API */}
                {filteredMeetings.length > 0 ? (
                  filteredMeetings.map((meeting) => (
                    <div
                      key={meeting.id}
                      className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="h-48 flex flex-col">
                        <div className="flex-1">
                          <h3
                            className="text-gray-900 mb-4 line-clamp-2 font-medium"
                            style={{
                              fontFamily: "Clash Grotesk",
                              fontWeight: 500,
                              fontSize: "18px",
                              lineHeight: "24px",
                              letterSpacing: "0%",
                            }}
                          >
                            {meeting.title || "Untitled Meeting"}
                          </h3>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <p className="line-clamp-2">
                              {meeting.description || "No description available"}
                            </p>
                            <p>
                              {meeting.timestamp
                                ? new Date(meeting.timestamp).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )
                                : "No date"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <button
                            onClick={() => handleChatWithMeeting(meeting)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 hover:shadow-md rounded-full text-gray-700 transition-all duration-200 cursor-pointer"
                            title={`Chat about "${meeting.title || 'this meeting'}"`}
                            aria-label={`Open chat for meeting: ${meeting.title || 'Untitled Meeting'}`}
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span className="font-medium">Chat</span>
                          </button>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditMeeting(meeting)}
                              className="p-2 text-gray-500 hover:text-[#00EB8F] hover:bg-[#00EB8F]/10 rounded-full transition-all duration-200"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteMeeting(meeting)}
                              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  // Show message when no uploaded meetings are found
                  !loading && (
                    <div className="col-span-full flex flex-col items-center justify-center py-12">
                      <div className="text-gray-400 mb-4">
                        <Calendar className="w-16 h-16 mx-auto" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        {searchTerm ? "No meetings found" : "No uploaded meetings"}
                      </h3>
                      <p className="text-gray-500 text-center max-w-md">
                        {searchTerm
                          ? `No meetings match your search for "${searchTerm}"`
                          : "Upload your first meeting to get started with LifeLines analysis"}
                      </p>
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm("")}
                          className="mt-4 px-6 py-2 bg-[#00EB8F] text-white rounded-lg hover:bg-[#00d180] transition-colors"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  )
                )}
              </div>

              {/* Load More Button - Only show if there are meetings */}
              {hasMore && filteredMeetings.length > 0 && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="px-6 py-3 bg-00EB8F-600 hover:bg-00EB8F-700 disabled:bg-gray-400 text-white rounded-xl font-medium transition-colors duration-200"
                  >
                    {loadingMore ? "Loading..." : "Load More Meetings"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {/* Delete Meeting Modal */}
      <DeleteMeetingModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleConfirmDelete}
        isDeleting={isDeleting}
        meetingTitle={meetingToDelete?.title}
      />
    </div>
  );
}