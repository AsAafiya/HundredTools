import "../user.css";
import { FaUserPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";

function Users() {
  const users = [
    {
      name: "John Smith",
      email: "john.smith@example.com",
      plan: "Premium",
      date: "Jan 15, 2026",
      initials: "JS",
    },
    {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      plan: "Free",
      date: "Feb 3, 2026",
      initials: "SJ",
    },
    {
      name: "Mike Davis",
      email: "mike.davis@example.com",
      plan: "Premium",
      date: "Jan 22, 2026",
      initials: "MD",
    },
    {
      name: "Emily Brown",
      email: "emily.brown@example.com",
      plan: "Free",
      date: "Feb 10, 2026",
      initials: "EB",
    },
    {
      name: "Alex Wilson",
      email: "alex.w@example.com",
      plan: "Free",
      date: "Feb 18, 2026",
      initials: "AW",
    },
  ];

  return (
    <div className="users">
      {/* Header */}
      <div className="users-header">
        <div>
          <h1>User Management</h1>
          <p>Manage all user accounts and permissions</p>
        </div>

        <button className="add-user-btn">
          <FaUserPlus /> Add New User
        </button>
      </div>

      {/* Stats */}
      <div className="users-stats">
        <div className="users-card">
          <h2>5</h2>
          <p>Total Users</p>
        </div>
        <div className="users-card">
          <h2 className="green">4</h2>
          <p>Active Users</p>
        </div>
        <div className="users-card">
          <h2 className="purple">2</h2>
          <p>Premium Users</p>
        </div>
        <div className="users-card">
          <h2>3</h2>
          <p>Free Users</p>
        </div>
      </div>

      {/* Search */}
      <div className="search-box">
        <FaSearch />
        <input placeholder="Search users by name or email..." />
      </div>

      {/* Table */}
      <div className="user-table">

        {/* Header */}
        <div className="table-header">
          <div className="col name-col">Name</div>
          <div className="col">Email</div>
          <div className="col">Password</div>
          <div className="col">Plan</div>
          <div className="col">Join Date</div>
          <div className="col actions">Actions</div>
        </div>

        {/* Rows */}
        {users.map((user, index) => (
          <div className="table-row" key={index}>

            {/* Name */}
            <div className="col name-col">
              <div className="user-info">
                <div className="avatar">{user.initials}</div>
                <span className="user-name">{user.name}</span>
              </div>
            </div>

            {/* Email */}
            <div className="col email-col">
              <MdEmail />
              <span>{user.email}</span>
            </div>

            {/* Password */}
            <div className="col password-col">
              <span>••••••••••</span>
              <AiFillEye />
            </div>

            {/* Plan */}
            <div className="col">
              <span className={`plan ${user.plan.toLowerCase()}`}>
                {user.plan}
              </span>
            </div>

            {/* Date */}
            <div className="col date-col">{user.date}</div>

            {/* Actions */}
            <div className="col actions">
              <FaEdit />
              <FaTrash />
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Users;