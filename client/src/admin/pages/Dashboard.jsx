import "../dashboard.css";
import { FaUsers, FaFileAlt, FaDollarSign } from "react-icons/fa";
import { MdOutlineAnalytics } from "react-icons/md";
import { FaRegUser, FaChartLine } from "react-icons/fa6";

function Dashboard() {
  return (
    <div className="dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your platform today.</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-top">
            <div className="icon blue"><FaUsers /></div>
            <span className="positive">+12.5%</span>
          </div>
          <h2>12,483</h2>
          <p>Total Users</p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="icon green"><FaFileAlt /></div>
            <span className="positive">+8.2%</span>
          </div>
          <h2>50.2M</h2>
          <p>Files Processed</p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="icon orange"><MdOutlineAnalytics /></div>
            <span className="positive">+5.1%</span>
          </div>
          <h2>3,247</h2>
          <p>Active Users (Today)</p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="icon purple"><FaDollarSign /></div>
            <span className="positive">+23.8%</span>
          </div>
          <h2>$48,392</h2>
          <p>Revenue</p>
        </div>

      </div>

      {/* Middle */}
      <div className="dashboard-bottom">

        {/* Activity */}
        <div className="card">
          <h3>Recent Activity</h3>

          <ul className="activity-list">
            <li>
              <div>
                <span>John Smith</span>
                <p>Uploaded PDF</p>
              </div>
              <div className="activity-meta">
                <small>2 min ago</small>
                <span className="badge success">success</span>
              </div>
            </li>

            <li>
              <div>
                <span>Sarah Johnson</span>
                <p>Converted Image</p>
              </div>
              <div className="activity-meta">
                <small>5 min ago</small>
                <span className="badge success">success</span>
              </div>
            </li>

            <li>
              <div>
                <span>Mike Davis</span>
                <p>Compressed Video</p>
              </div>
              <div className="activity-meta">
                <small>8 min ago</small>
                <span className="badge processing">processing</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Tools */}
        <div className="card">
          <h3>Most Used Tools</h3>

          {[
            ["Merge PDF", "85%"],
            ["Compress Image", "75%"],
            ["PDF to JPG", "65%"],
            ["Add Watermark", "55%"],
            ["convert Image", "45%"],
          ].map((tool, i) => (
            <div key={i} className="tool">
              <div className="tool-row">
                <span>{tool[0]}</span>
                <span>{tool[1]}</span>
              </div>
              <div className="progress-bar">
                <div style={{ width: tool[1] }}></div>
              </div>
            </div>
          ))}

        </div>

      </div>

      {/* Bottom Cards */}
      <div className="bottom-cards">

        <div className="bottom-card">
          <div className="icon blue"><FaRegUser /></div>
          <h4>Manage Users</h4>
          <p>View and manage all user accounts</p>
        </div>

        <div className="bottom-card">
          <div className="icon green"><FaFileAlt /></div>
          <h4>Monitor Files</h4>
          <p>Track file processing and storage</p>
        </div>

        <div className="bottom-card">
          <div className="icon orange"><FaChartLine /></div>
          <h4>View Analytics</h4>
          <p>Detailed insights and reports</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;