import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Navbar = ({ onSearch, onFilterClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Pass search term to parent component
  };

  const handleCreateAnnouncement = () => {
    navigate('/create-announcement'); // Navigate to the Announcement Page
  };

  return (
    <nav className="font-inter shadow p-4">
      <div className="flex justify-between items-center">
        {/* Site Name */}
        <div className="text-2xl font-bold">
          <a href="/" className="">
            Alumni-Connect
          </a>
        </div>

        <div className="flex items-center gap-2 w-full max-w-xl">
          {/* Search Bar */}
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search announcements..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Button */}
          <button 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full text-sm font-medium"
            onClick={onFilterClick}
          >
            Filter
          </button>
        </div>

        {/* Create Announcement Button */}
        <button
          onClick={handleCreateAnnouncement}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-200"
        >
          Create Announcement
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
