import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AnnouncementForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'mentorship',
    responsibilities: '',
    qualifications: '',
    lastDate: '',
    link: '',
    tags: '',
    institution: '',
    role: 'student'
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      const payload = {
        ...formData,
        postedBy: user._id,
        username: user.name,
        tags: formData.tags.split(',').map(tag => tag.trim())
      };
const BASE_URL = import.meta.env.MODE === 'production'
  ? import.meta.env.VITE_DEV_API_URL
  : import.meta.env.VITE_PROD_API_URL;
      const response = await axios.post(`${BASE_URL}/api/announcements/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Announcement created:", response.data);
      navigate("/announcement-page");
    } catch (err) {
      console.error("Error submitting announcement:", err);
      setError(err.response?.data?.message || "Failed to post announcement. Try again.");
    }
  };

  return (
    <section className="flex justify-center w-full mt-5">
      <div className="max-w-2xl w-full p-6 bg-white rounded-lg">
        <div className="text-center">
          <h1 className="font-bold text-3xl mb-2">Create Announcement</h1>
          <p className="text-gray-600 text-sm">Fill out the form to post an announcement</p>
        </div>

        <div className="h-[1px] w-full bg-gray-300 mt-4 mb-4"></div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Title */}
          <div className="col-span-2">
            <label className="block text-gray-700">Title</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-md" placeholder="Enter title" />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-gray-700">Description</label>
            <textarea name="description" required value={formData.description} onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-md" rows="3" placeholder="Enter full description" />
          </div>

          {/* Type */}
          <div>
            <label className="block text-gray-700">Type</label>
            <select name="type" value={formData.type} onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-md">
              <option value="mentorship">Mentorship</option>
              <option value="project">Project</option>
              <option value="research">Research</option>
              <option value="job">Job</option>
              <option value="guidance">Guidance</option>
              <option value="workshop">Workshop</option>
            </select>
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700">Role</label>
            <select name="role" value={formData.role} onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-md">
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>

          {/* Institution */}
          <div>
            <label className="block text-gray-700">Institution</label>
            <input type="text" name="institution" required value={formData.institution} onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-md" placeholder="Institution name" />
          </div>

          {/* Last Date */}
          <div>
            <label className="block text-gray-700">Last Date</label>
            <input type="date" name="lastDate" value={formData.lastDate} onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-md" />
          </div>

          {/* Responsibilities */}
          <div className="col-span-2">
            <label className="block text-gray-700">Responsibilities</label>
            <input type="text" name="responsibilities" value={formData.responsibilities} onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-md" placeholder="Enter responsibilities (optional)" />
          </div>

          {/* Qualifications */}
          <div className="col-span-2">
            <label className="block text-gray-700">Qualifications</label>
            <input type="text" name="qualifications" value={formData.qualifications} onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-md" placeholder="Enter qualifications (optional)" />
          </div>

          {/* Link */}
          <div className="col-span-2">
            <label className="block text-gray-700">Link</label>
            <input type="text" name="link" value={formData.link} onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-md" placeholder="Application link or info link" />
          </div>

          {/* Tags */}
          <div className="col-span-2">
            <label className="block text-gray-700">Tags (comma-separated)</label>
            <input type="text" name="tags" value={formData.tags} onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-md" placeholder="e.g., AI, Web Dev, Internship" />
          </div>

          {/* Submit Button */}
          <div className="col-span-2 text-center mt-3">
            <button type="submit"
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900">
              Post Announcement
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
      </div>
    </section>
  );
};

export default AnnouncementForm;
