import { FaBrain, FaUsers, FaDatabase, FaRegCommentDots, FaFileExport, FaGlobe, FaPlus, FaUser } from 'react-icons/fa'; // Assuming react-icons is installed

const DefaultDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <div className="flex items-center mb-6">
          <FaBrain className="text-purple-600 mr-2" size={24} />
          <h1 className="text-xl font-bold text-purple-600">Agent.ai</h1>
        </div>
        <nav>
          <ul>
            <li className="mb-2">
              <a href="#" className="flex items-center p-2 bg-purple-600 text-white rounded">
                <FaGlobe className="mr-2" /> Dashboard
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center p-2 hover:bg-gray-200 rounded">
                <FaUsers className="mr-2" /> Agents
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center p-2 hover:bg-gray-200 rounded">
                <FaDatabase className="mr-2" /> Resources
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center p-2 hover:bg-gray-200 rounded">
                <FaRegCommentDots className="mr-2" /> Slack Community
              </a>
            </li>
          </ul>
        </nav>
        <div className="mt-6">
          <h2 className="text-sm font-semibold mb-2">Agent.ai Copilot</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="I need help with..."
              className="w-full p-2 border rounded"
            />
            <FaFileExport className="absolute right-2 top-3 text-gray-400" />
          </div>
        </div>
        <button className="w-full mt-4 bg-purple-600 text-white p-2 rounded flex items-center justify-center">
          <FaPlus className="mr-2" /> New Agent
        </button>
        <div className="mt-auto flex items-center p-2 hover:bg-gray-200 rounded">
          <FaUser className="mr-2" /> My Profile
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <FaUsers className="text-gray-400 mb-2" />
            <h3 className="text-sm">Team Members</h3>
            <p className="text-xl">1 of 5</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <FaGlobe className="text-gray-400 mb-2" />
            <h3 className="text-sm">Monthly Usage</h3>
            <p className="text-xl">132 of 10000 Total Agents</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <FaDatabase className="text-gray-400 mb-2" />
            <h3 className="text-sm">Words Stored</h3>
            <p className="text-xl">160.19M of 30B</p>
          </div>
          {/* Add more cards if needed */}
        </div>

        <div className="bg-purple-500 text-white p-4 rounded mb-6">
          <h2 className="text-lg mb-2">Activity</h2>
          <div className="bg-green-500 p-2 rounded mb-4">
            Your agents saved you 1 human hour this week
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white text-black p-4 rounded">
              <h3>Total</h3>
              <p>Conversations: 3</p>
              <p>Queries: 37</p>
              <p>Queries per conversation: 12.33</p>
            </div>
            <div className="bg-white text-black p-4 rounded">
              <h3>Guests</h3>
              <p>Conversations: 0</p>
              <p>Queries: 0</p>
              <p>Queries per conversation: 0.00</p>
            </div>
          </div>
          <select className="mt-2 bg-purple-600 p-1 rounded">
            <option>Last 7 days</option>
          </select>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm mb-2">Location</h3>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">COUNTRY</th>
                <th className="text-left">CONVERSATIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>United States</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Pakistan</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default DefaultDashboard;