import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {createLecture} from '../api/api'; // Adjust the import path as necessary

const CreateLecture = () => {
  const navigate = useNavigate();
  const [lecture, setLecture] = useState({
    title: '',
    topic: '',
    description: '',
    stream_url: '',
    latitude: '',
    longitude: '',
  });

  const handleChange = (e) => {
    setLecture((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Creating lecture:', lecture);
      await createLecture(lecture);
      alert('Lecture created successfully!');
      navigate("/lectures/view"); // Redirect to the lectures view page
    } catch (err) {
      alert('Error creating lecture.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded-lg w-full max-w-xl space-y-4"
      >
        <h2 className="text-2xl font-semibold">Create Lecture</h2>

        {['title', 'topic', 'description', 'stream_url', 'latitude', 'longitude'].map((field) => (
          <input
            key={field}
            name={field}
            type='text'
            value={lecture[field]}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            // required={field !== 'location'}
          />
        ))}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateLecture;
