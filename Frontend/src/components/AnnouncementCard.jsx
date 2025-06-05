import React, { useState, useRef, useEffect } from "react";
import { Briefcase, GraduationCap, BookOpen, Users, MoreVertical } from "lucide-react";

const typeIconMap = {
  project: <BookOpen className="text-blue-600 w-6 h-6" />,
  mentorship: <GraduationCap className="text-green-600 w-6 h-6" />,
  job: <Briefcase className="text-yellow-500 w-6 h-6" />,
  research: <Users className="text-purple-500 w-6 h-6" />,
  guidance: <Users className="text-indigo-500 w-6 h-6" />,
  workshop: <BookOpen className="text-pink-500 w-6 h-6" />,
};

const AnnouncementCard = ({ announcement, onDelete }) => {
  const {
    type,
    role,
    title,
    description,
    tags,
    lastDate,
    _id // Assuming your announcement object has an _id or id field
  } = announcement;

  const normalizedType = type.trim().toLowerCase();

  // State to toggle dropdown menu visibility
  const [menuOpen, setMenuOpen] = useState(false);

  // Ref for the menu container to handle outside clicks
  const menuRef = useRef();

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <div className="bg-white font-inter rounded-2xl drop-shadow-lg p-6 w-full max-w-sm transition hover:scale-[1.02] duration-200 relative">
      {/* Triple dot menu button */}
      <div ref={menuRef} className="absolute top-4 right-4">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1 rounded-full hover:bg-gray-200 transition"
          aria-label="Open menu"
        >
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <button
              onClick={() => {
                onDelete(_id);
                setMenuOpen(false); // close menu after deleting
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Icon */}
      <div className="mb-3">{typeIconMap[normalizedType]}</div>

      {/* Title & Meta */}
      <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 capitalize">
        {type} by {role}
      </p>

      {/* Description */}
      <p className="text-sm text-gray-700 mt-3">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Deadline */}
      {lastDate && (
        <p className="text-sm text-gray-500 mt-4">
          Deadline: {new Date(lastDate).toISOString().split("T")[0]}
        </p>
      )}

      {/* Connect Button */}
      <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold">
        Connect
      </button>
    </div>
  );
};

export default AnnouncementCard;
