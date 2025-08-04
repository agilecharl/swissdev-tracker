import axios from 'axios';
import {
  Briefcase,
  Building,
  FileText,
  Home,
  Menu,
  PlusCircle,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'; // Using lucide-react for icons
import { useEffect, useState } from 'react';
import DashboardNavBar from './dashBoardNavBar';

// Remove dotenv.config() - it's not needed in client-side code
// For client-side env vars in Next.js, use NEXT_PUBLIC_ prefix
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Sidebar Link Component
interface SidebarLinkProps {
  icon: React.ReactNode;
  text: string;
}

// Dashboard Card Component
interface DashboardCardProps {
  title: string;
  value: string;
  change: string;
  color: string;
  icon: React.ReactNode;
}

// Main App component
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      <DashboardNavBar items={[]} />
      <DashboardLayout />
    </div>
  );
};

// Dashboard Layout component
const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    // Simulate fetching total jobs from an API
    const resolveJobs = (resolve: (value: number) => void) => {
      setTimeout(() => resolve(1250), 1000);
    };

    const fetchTotalJobs = async () => {
      axios.defaults.baseURL = API_URL;
      axios.defaults.headers.common['Content-Type'] = 'application/json';
      axios.defaults.headers.common['Accept'] = 'application/json';

      const { data } = await axios.get(
        `${
          API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL
        }/api/jobs/count`
      );
      console.log('Total Jobs:', data);
      const jobs = await new Promise<number>(resolveJobs);
      setTotalJobs(jobs);
    };

    fetchTotalJobs();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Mobile Menu Button */}
      <div className="lg:hidden p-4 bg-white shadow-md flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Job Platform</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-600 focus:outline-none"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-br from-purple-700 to-indigo-800 text-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 lg:flex-shrink-0 transition-transform duration-300 ease-in-out rounded-r-xl lg:rounded-none`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-8">Job Platform</h2>
          <nav>
            <ul>
              <SidebarLink icon={<Home size={20} />} text="Dashboard" />
              <SidebarLink icon={<Briefcase size={20} />} text="Job Listings" />
              <SidebarLink icon={<FileText size={20} />} text="Applications" />
              <SidebarLink icon={<PlusCircle size={20} />} text="Post a Job" />
              <SidebarLink icon={<Building size={20} />} text="Companies" />
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <DashboardCard
            title="Total Jobs"
            value={totalJobs.toString()}
            change="+10% new this week"
            color="bg-blue-500"
            icon={<Briefcase size={32} className="text-white" />}
          />
          <DashboardCard
            title="New Applicants"
            value="450"
            change="+15% since yesterday"
            color="bg-green-500"
            icon={<Users size={32} className="text-white" />}
          />
          <DashboardCard
            title="Active Listings"
            value="980"
            change="-5% expired this month"
            color="bg-red-500"
            icon={<TrendingUp size={32} className="text-white" />}
          />
        </div>

        {/* Example of more content */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Job Postings
          </h3>
          <p className="text-gray-600">
            This section can display a list of recent job postings, applicant
            summaries, or other relevant data for your job listing platform.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>Software Engineer - Google</li>
            <li>Product Manager - Meta</li>
            <li>UX Designer - Apple</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

const SidebarLink = ({ icon, text }: SidebarLinkProps) => {
  return (
    <li className="mb-2">
      <button
        type="button"
        className="flex items-center p-3 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors duration-200 w-full text-left"
      >
        <span className="mr-3">{icon}</span>
        <span className="text-lg">{text}</span>
      </button>
    </li>
  );
};

// Header Component
const Header = () => {
  return (
    <header className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-800">
        Job Platform Dashboard
      </h1>
      {/* You can add user profile, notifications, etc. here */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search jobs or companies..."
          className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {/* Placeholder for user avatar or login button */}
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
          JD
        </div>
      </div>
    </header>
  );
};

const DashboardCard = ({
  title,
  value,
  change,
  color,
  icon,
}: DashboardCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between h-48">
      <div
        className={`w-16 h-16 ${color} rounded-xl shadow-lg flex items-center justify-center -mt-10 mb-4`}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-gray-500 text-sm uppercase font-medium">{title}</h3>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className="border-t border-gray-200 pt-4 mt-4 text-sm text-gray-600">
        <span className="font-semibold text-green-500">{change}</span>
      </div>
    </div>
  );
};

export default Dashboard;
