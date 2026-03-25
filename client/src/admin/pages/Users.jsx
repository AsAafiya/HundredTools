import "../user.css";
import { FaUserPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { useEffect, useState } from "react";
import API from "../../utils/api";

function Users() {
 const [users, setUsers] = useState([]);

 useEffect(() => {
  // API.get("/users/all-users")
  API.get("http://localhost:5000/api/users/all-users")
    .then((res) => setUsers(res.data))
    .catch((err) => console.log(err));
}, []);

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
          <div className="col">Status</div>
          <div className="col">Plan</div>
          <div className="col">Join Date</div>
          <div className="col actions">Actions</div>
        </div>

        {/* Rows */}
        {users.map((user) => (
          <div className="table-row" key={user._id}>

            {/* Name */}
            <div className="col name-col">
              <div className="user-info">
                {/* <div className="avatar">{user.initials}</div> */}
                <div className="avatar">
  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
</div>
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
              <span>Hidden</span>
              <AiFillEye />
            </div>

            {/* Plan */}
            <div className="col">
              {/* <span className={`plan ${user.plan.toLowerCase()}`}>
                {user.plan}
              </span> */}
              <span>Free</span>
            </div>

            {/* Date */}
            {/* <div className="col date-col">{user.date}</div> */}
            <div className="col date-col">
  {new Date(user.createdAt).toLocaleDateString()}
</div>

            {/* Actions */}
            <div className="col actions">
              <FaEdit />
              <FaTrash />
            </div>

          </div>
        ))};

      </div>
    </div>
  );
}

export default Users;