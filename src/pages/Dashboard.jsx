import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    console.log('User location:', latitude, longitude);
    // You can send this to your API
  },
  (error) => {
    console.error('Location access denied or unavailable');
  }
);

export default function Dashboard() {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axios.get('/api/lectures');
        setLectures(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <ul className="space-y-4">
        {lectures.map((lecture) => (
          <li key={lecture.id} className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold">{lecture.title}</h2>
            <p>{lecture.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
