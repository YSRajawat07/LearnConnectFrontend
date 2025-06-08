import { useEffect, useState } from 'react';
import { getLectures } from '../api/api';

const ViewLectures = () => {
  const [lectures, setLectures] = useState([]);
  const [filters, setFilters] = useState({
    subject: '',
    location: '',
  });

  const fetchLectures = async () => {
    try {
      const res = await getLectures(filters);
      console.log("Response: ", res.data);
      if (res.data && Array.isArray(res.data)) {
        setLectures(res.data);
      } else {
        console.error('Unexpected response format:', res.data);
        setLectures([]);
      }
    } catch (err) {
      console.error('Error fetching lectures:', err);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Available Lectures</h2>

      <div className="flex gap-4 mb-6">
        <input
          name="subject"
          placeholder="Filter by Subject"
          value={filters.subject}
          onChange={handleFilterChange}
          className="p-2 border rounded w-1/2"
        />
        <input
          name="location"
          placeholder="Filter by Location"
          value={filters.location}
          onChange={handleFilterChange}
          className="p-2 border rounded w-1/2"
        />
      </div>

      {console.log("Lectures: ", lectures.length)}
      {lectures.length === 0 ? (
        <p>No lectures found.</p>
      ) : (
        <ul className="space-y-4">
          {lectures.map((lecture) => (
            <li key={lecture.id} className="p-4 border rounded shadow-sm">
              <h3 className="text-lg font-bold">{lecture.title}</h3>
              <p><strong>Subject:</strong> {lecture.topic}</p>
              <p><strong>Date:</strong> {lecture.date}</p>
              <p><strong>Decription:</strong> {lecture.description}</p>
              <a href={lecture.stream_url} className="text-blue-600 underline" target="_blank" rel="noreferrer">
                Join Meet
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewLectures;
