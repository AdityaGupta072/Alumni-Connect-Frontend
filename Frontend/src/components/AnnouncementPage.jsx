import React, { useState, useEffect } from 'react';
import AnnouncementCard from '../components/AnnouncementCard';
import Navbar from '../components/NavbarAnnouncement';
import axios from 'axios';

const AnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    institution: '',
    visibility: '',
    tags: ''
  });
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  useEffect(() => {
    fetch('https://alumni-connect-backend-1z42.onrender.com/api/announcements')
      .then(res => res.json())
      .then(data => {
        setAnnouncements(data);
        setFilteredAnnouncements(data);
      });
  }, []);

const handleDeleteAnnouncement = async (id) => {
  console.log('handleDeleteAnnouncement called with id:', id);
  const token = localStorage.getItem('token');
  console.log('Token:', token);
  try {
    const token = localStorage.getItem('token'); // get JWT from storage
    if (!token) {
      alert('You are not logged in.');
      return;
    }

    await axios.delete(`https://alumni-connect-backend-1z42.onrender.com/api/announcements/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Correct auth header format
      },
    });

    setAnnouncements(prev => prev.filter(a => a._id !== id));
    setFilteredAnnouncements(prev => prev.filter(a => a._id !== id));
  } catch (error) {
    console.error('Failed to delete announcement:', error);
    alert('Failed to delete announcement.');
  }
};



  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    applyFilters(filters, searchTerm);
  };

  const handleCreateAnnouncement = () => {
    console.log("Create Announcement button clicked");
  };

  const handleFilterChange = (e) => {
    const updatedFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(updatedFilters);
    applyFilters(updatedFilters, searchTerm);
  };

  const applyFilters = (filters, searchTerm) => {
    const filtered = announcements.filter((ann) => {
      const matchesSearch = searchTerm === '' ||
        ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ann.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = filters.type === '' || ann.type === filters.type;
      const matchesInstitution = filters.institution === '' || ann.institution === filters.institution;
      const matchesVisibility = filters.visibility === '' || ann.visibility === filters.visibility;
      const matchesTags = filters.tags === '' || (ann.tags && ann.tags.includes(filters.tags));

      return matchesSearch && matchesType && matchesInstitution && matchesVisibility && matchesTags;
    });

    setFilteredAnnouncements(filtered);
  };

  return (
    <div>
      <Navbar
        onSearch={handleSearch}
        onFilterClick={() => setShowFilterDropdown(!showFilterDropdown)}
        onCreateAnnouncement={handleCreateAnnouncement}
      />

      {/* Filter Dropdown */}
      {showFilterDropdown && (
        <div className="mx-10 mt-4 p-4 bg-white rounded-xl shadow-lg border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <select
            name="type"
            className="border p-2 rounded-xl"
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="">All Types</option>
            <option value="job">Job</option>
            <option value="project">Project</option>
            <option value="mentorship">Mentorship</option>
          </select>

          <input
            name="institution"
            className="border p-2 rounded-xl"
            placeholder="Institution"
            value={filters.institution}
            onChange={handleFilterChange}
          />

          <select
            name="visibility"
            className="border p-2 rounded-xl"
            value={filters.visibility}
            onChange={handleFilterChange}
          >
            <option value="">All Visibility</option>
            <option value="public">Public</option>
            <option value="alumni">Alumni Only</option>
            <option value="students">Students Only</option>
          </select>

          <input
            name="tags"
            className="border p-2 rounded-xl"
            placeholder="Tag (e.g. AI)"
            value={filters.tags}
            onChange={handleFilterChange}
          />
        </div>
      )}

      <div className="min-h-screen font-inter pt-5">
        <div className="ml-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {filteredAnnouncements.length === 0 ? (
          <p className="text-gray-500">No announcements available.</p>
        ) : (
          filteredAnnouncements.map((ann) => (
            <AnnouncementCard
              key={ann._id}
              announcement={ann}
              onDelete={handleDeleteAnnouncement}  // Pass the handler here
            />
          ))
        )}
      </div>
      </div>
    </div>
  );
};

export default AnnouncementPage;
