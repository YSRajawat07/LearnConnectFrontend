import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";

navigator.geolocation.getCurrentPosition(
  (position) => {
    const{ latitude, longitude } = position.coords;
    localStorage.setItem("latitude", latitude);
    localStorage.setItem("longitude", longitude);
    console.log('User location:', latitude, longitude);
    // You can send this to your API
  },
  (error) => {
    console.error('Location access denied or unavailable');
  }
);

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    // email: "",
    password: "",
    latitude: localStorage.getItem("latitude") || "",
    longitude: localStorage.getItem("longitude") || "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace with your API endpoint
    //   const res = await axios.post("/api/register", form);
      const res = await registerUser(form);
      console.log("Registered:", res.data);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Register</h2>

        <input
          name="username"
          placeholder="User Name"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring"
        />

        {/* <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring"
        /> */}

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
