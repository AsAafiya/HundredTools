import React from "react";
import "../Analytics.css";

import { TrendingUp, Users, FileText, Activity } from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* DATA */
const userData = [
  { name: "Jan", users: 2500 },
  { name: "Feb", users: 3200 },
  { name: "Mar", users: 4000 },
  { name: "Apr", users: 5200 },
  { name: "May", users: 6800 },
];

const fileData = [
  { name: "Jan", files: 120000 },
  { name: "Feb", files: 150000 },
  { name: "Mar", files: 170000 },
  { name: "Apr", files: 200000 },
];

const pieData = [
  { name: "PDF", value: 45 },
  { name: "Image", value: 35 },
  { name: "Video", value: 20 },
];

const COLORS = ["#4f46e5", "#22c55e", "#f59e0b"];

export default function Analytics() {
  return (
    <div className="page">
      {/* HEADER */}
      <div className="header">
        <h1>Analytics & Insights</h1>
        <p>Comprehensive analytics and performance metrics</p>
      </div>

      {/* TOP CARDS */}
      <div className="analytics-grid-4">
        <div className="card stat-card">
          <div className="icon-box icon-green">
            <TrendingUp size={16} />
          </div>
          <h2>+23.5%</h2>
          <p className="label">Growth Rate</p>
          <span className="sub">vs last month</span>
        </div>

        <div className="card stat-card">
          <div className="icon-box icon-blue">
            <Users size={16} />
          </div>
          <h2>12,483</h2>
          <p className="label">Active Users</p>
          <span className="sub">This month</span>
        </div>

        <div className="card stat-card">
          <div className="icon-box icon-orange">
            <FileText size={16} />
          </div>
          <h2>362K</h2>
          <p className="label">Files Processed</p>
          <span className="sub">This month</span>
        </div>

        <div className="card stat-card">
          <div className="icon-box icon-purple">
            <Activity size={16} />
          </div>
          <h2>2.4s</h2>
          <p className="label">Avg Processing Time</p>
          <span className="sub">Per file</span>
        </div>
      </div>

      {/* ROW 2 */}
      <div className="analytics-grid-2">
        <div className="card large">
          <h3>Users Growth Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#4f46e5"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card large">
          <h3>Tool Usage Distribution</h3>

          <div className="chart-box">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ROW 3 */}
      <div className="analytics-grid-2">
        <div className="card large">
          <h3>File Processing Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={fileData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="files" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card large">
          <h3>Daily Active Users</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={userData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="card full">
        <h3>Key Performance Metrics</h3>

        <div className="metrics">
          <div>
            <h2>3.2%</h2>
            <p>Conversion Rate</p>
            <span className="sub">+0.8%</span>
          </div>

          <div>
            <h2>8m 32s</h2>
            <p>Avg Session</p>
            <span className="sub">+1m</span>
          </div>

          <div>
            <h2>68%</h2>
            <p>Retention</p>
            <span className="sub">+5%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
