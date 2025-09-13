import { Search, X } from "lucide-react";

const SearchBar = ({ searchTerm, onSearchChange, onClearSearch }) => {
  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="mt-2" >
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
          style={{ color: "#E0E0E0" }}
        />
        <input
          type="text"
          placeholder="Search chats..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full pl-10 pr-10 py-2 rounded-md text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2"
        />
        {searchTerm && (
          <button
            onClick={onClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
            style={{ color: "#E0E0E0" }}
            onMouseEnter={(e) => (e.target.style.color = "white")}
            onMouseLeave={(e) => (e.target.style.color = "#E0E0E0")}
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
export default SearchBar;