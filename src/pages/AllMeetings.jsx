import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Calendar,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useAxios } from "../hooks";
import { API_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import vector from '../assets/vector.png';
import vector1 from '../assets/vector1.png';

const LifeLineMeetings = () => {
  const navigate = useNavigate();
  const { request, loading } = useAxios();
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [transcriptions, setTranscriptions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchTranscriptions = async (page = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
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
      if (append) {
        setLoadingMore(false);
      }
    }
  };

  // Load more function for pagination
  const loadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = currentPage + 1;
      fetchTranscriptions(nextPage, true);
    }
  };

  useEffect(() => {
    fetchTranscriptions(1, false);
  }, []);

  console.log(transcriptions.items, "these are transcriptions");

  // Filter meetings based on search and date
  const filteredMeetings = useMemo(() => {
    // Check if transcriptions has items array
    if (!transcriptions?.items || !Array.isArray(transcriptions.items)) {
      return [];
    }

    return transcriptions.items.filter((meeting) => {
      // Safety checks for properties - accessing them directly from meeting object
      const title = meeting.title || "";
      const description = meeting.description || "";
      const meetingDate = meeting.timestamp || "";

      const matchesSearch =
        searchValue === "" ||
        title.toLowerCase().includes(searchValue.toLowerCase()) ||
        description.toLowerCase().includes(searchValue.toLowerCase());

      const matchesDate =
        selectedDate === "" ||
        meetingDate === selectedDate ||
        meetingDate.includes(selectedDate);

      return matchesSearch && matchesDate;
    });
  }, [searchValue, selectedDate, transcriptions]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const today = new Date();

    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${months[currentMonth]} ${day}, ${currentYear}`;
      const isToday =
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();
      const isSelected = selectedDate === dateStr;
      // Check if any meeting has this date
      const hasMeeting =
        transcriptions?.items?.some((meeting) => meeting.date === dateStr) ||
        false;

      days.push(
        <button
          key={day}
          onClick={() => {
            setSelectedDate(dateStr);
            setShowDatePicker(false);
          }}
          className={`w-8 h-8 flex items-center justify-center text-sm rounded-full font-medium transition-all duration-200 relative ${isSelected
              ? "bg-[#00EB8F] text-white shadow-md"
              : isToday
                ? "bg-[#00EB8F] text-white rounded-full"
                : "text-gray-700 hover:bg-gray-100"
            }`}
        >
          {day}
          {hasMeeting && !isSelected && !isToday && (
            <div className="absolute bottom-1 w-1 h-1 bg-[#00EB8F] rounded-full"></div>
          )}
        </button>
      );
    }

    return days;
  };

  const navigateMonth = (direction) => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const clearFilters = () => {
    setSearchValue("");
    setSelectedDate("");
  };

  return (
    <div className="flex min-h-screen bg-white relative overflow-hidden">
      {/* Background Vector Images */}
      <div className="absolute inset-0 pointer-events-none">
        <img 
          src={vector} 
          alt="" 
          className="absolute top-0 right-0 w-auto h-auto opacity-40 z-0" 
        />
        <img 
          src={vector1} 
          alt="" 
          className="absolute bottom-0 left-0 w-auto h-auto opacity-40 z-0" 
        />
      </div>

      {/* Sidebar */}
      <div className="w-80 h-screen sticky top-0 border-r border-gray-200 bg-white z-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 relative z-10">
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Explore UNSC Meetings
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Access live transcripts and recordings of United Nations
                Security Council meetings. Use advanced filtering by date to
                find specific discussions and decisions.
              </p>
            </div>

            {/* Search Controls */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search meeting by title or description"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`w-96 pl-12 pr-4 py-3 rounded-xl border-2 shadow-lg transition-all duration-200 ${isSearchFocused
                      ? "border-green-500 shadow-green-100"
                      : "border-gray-200 shadow-gray-100"
                    } focus:outline-none bg-white`}
                />
                {searchValue && (
                  <button
                    onClick={() => setSearchValue("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Date Picker Button */}
              <div className="relative">
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl border-2 shadow-lg transition-all duration-200 ${showDatePicker
                      ? "border-green-500 shadow-green-100"
                      : "border-gray-200 shadow-gray-100"
                    } hover:border-green-400 bg-white`}
                >
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">
                    {selectedDate || "Select Date"}
                  </span>
                </button>

                {/* Date Picker Dropdown */}
                {showDatePicker && (
                  <div className="absolute top-full mt-2 right-0 bg-white border-2 border-gray-200 rounded-xl shadow-xl p-4 z-20 min-w-80">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => navigateMonth("prev")}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <h3 className="font-semibold text-gray-900">
                        {months[currentMonth]} {currentYear}
                      </h3>
                      <button
                        onClick={() => navigateMonth("next")}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Calendar Days Header */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                        <div
                          key={day}
                          className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-500"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1">
                      {generateCalendar()}
                    </div>
                  </div>
                )}
              </div>

              {/* Clear Button */}
              {(searchValue || selectedDate) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Meeting Cards - Fixed Height with Bottom Sticky Content */}
            {filteredMeetings.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMeetings.map((meeting, index) => (
                    <div
                      key={meeting.id || index}
                      onClick={() => {
                        navigate("/livelines-chat", {
                          state: {
                            title: meeting.title,
                            meeting: meeting,
                          },
                        });
                      }}
                      className="cursor-pointer transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-xl relative group border border-gray-200 shadow-sm hover:shadow-md hover:border-[#00EB8F] hover:bg-white h-48 flex flex-col"
                    >
                      {/* Top Content Area - Flexible */}
                      <div className="flex-1 p-4 overflow-hidden">
                        <h3 className="font-bold text-gray-900 mb-2 text-base leading-tight line-clamp-2">
                          {meeting.title || "Untitled Meeting"}
                        </h3>
                        <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
                          {meeting.description || "No description available"}
                        </p>
                      </div>

                      {/* Bottom Section - Fixed/Sticky */}
                      <div className="p-4 pt-0 flex items-center justify-between mt-auto">
                        <span className="text-xs text-gray-500 font-medium">
                          {meeting.timestamp
                            ? new Date(meeting.timestamp).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )
                            : "No date"}
                        </span>

                        <div className="bg-gray-100 text-gray-600 group-hover:bg-[#00EB8F] group-hover:text-white group-hover:shadow-lg group-hover:scale-110 group-hover:rotate-45 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center mt-8">
                    <button
                      onClick={loadMore}
                      disabled={loadingMore}
                      className="px-8 py-3 bg-[#00EB8F] text-white rounded-xl hover:bg-[#00d180] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
                    >
                      {loadingMore ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Loading...</span>
                        </>
                      ) : (
                        <span>Load More Meetings</span>
                      )}
                    </button>
                  </div>
                )}

                {/* End of Data Message */}
                {!hasMore && transcriptions?.items?.length > 0 && (
                  <div className="text-center mt-8 py-4">
                    <p className="text-gray-500">No more meetings to load</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No meetings found
                </h3>
                <p className="text-gray-500 mb-4">
                  {transcriptions?.items?.length === 0
                    ? "No meetings are available at the moment."
                    : "No meetings match your current search criteria."}
                </p>
                {(searchValue || selectedDate) && (
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2 bg-[#00EB8F] text-white rounded-lg hover:bg-[#00d180] transition-colors"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifeLineMeetings;