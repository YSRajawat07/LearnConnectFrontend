import { Link } from "react-router-dom";
import { Video, Filter, Globe2 } from "lucide-react";


const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      {/* Navbar */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">📚 ClassLink</h1>
          <div className="space-x-4">
            <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
            <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">Sign Up</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto z-10 relative">
          <h2 className="text-5xl font-extrabold text-indigo-700 leading-tight mb-6">
            Discover, Host & Join <br />Live Lectures Around You
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            A platform to connect students and teachers through online meet links,
            filtered by subject, location, and interest.
          </p>
          <Link
            to="/lectures/view"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition"
          >
            Explore Lectures
          </Link>
        </div>

        {/* Decorative background circles */}
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-indigo-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-24 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          <FeatureCard
            icon={<Filter className="w-8 h-8 text-indigo-600" />}
            title="Smart Filters"
            description="Search lectures by subject and location with powerful filters to suit your academic needs."
          />
          <FeatureCard
            icon={<Video className="w-8 h-8 text-indigo-600" />}
            title="One-Click Hosting"
            description="Teachers can instantly share meet links with a user-friendly creation process."
          />
          <FeatureCard
            icon={<Globe2 className="w-8 h-8 text-indigo-600" />}
            title="Location Aware"
            description="See nearby or trending lectures in your area and connect with local study groups."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-50 py-6 text-center text-gray-600">
        <p>© {new Date().getFullYear()} ClassLink. Built with 💡 for learners worldwide.</p>
      </footer>
    </div>
  );
};

// FeatureCard component
const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-indigo-50 rounded-xl shadow hover:shadow-md transition">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-indigo-700 mb-2">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);

export default Home;
