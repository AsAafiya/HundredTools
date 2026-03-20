import React, { useState } from "react";
import "../settings.css";

import {
  Crown,
  Zap,
  Globe,
  Shield,
  Mail,
  Bell,
  Database,
  Settings as SettingsIcon,
} from "lucide-react";

export default function SystemSettings() {
  const [toggles, setToggles] = useState({
    email: true,
    push: true,
    maintenance: false,
    backup: true,
  });

  const toggleSwitch = (key) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="page">
      {/* HEADER */}
      <div className="header">
        <h1>System Settings</h1>
        <p>Configure and manage system-wide settings</p>
      </div>

    
      <div className="grid">

        {/* Subscription */}
        <div className="card large">
          <div className="card-title">
            <div className="icon-box icon-purple">
              <Crown size={16} />
            </div>
            Subscription Plans
          </div>

          <div>
            <div className="plan">
              <div className="plan-header">
                <div>
                  <h3>Free Plan</h3>
                  <span>$0/month</span>
                </div>
                <button className="btn-outline">Edit</button>
              </div>
              <ul>
                <li>✓ 5 GB Storage</li>
                <li>✓ Basic Tools</li>
                <li>✓ Email Support</li>
              </ul>
            </div>

            <div className="plan active">
              <div className="plan-header">
                <div>
                  <h3>Premium Plan</h3>
                  <span>$19.99/month</span>
                </div>
                <button className="btn-primary">Edit</button>
              </div>
              <ul>
                <li>✓ 100 GB Storage</li>
                <li>✓ All Premium Tools</li>
                <li>✓ Priority Support</li>
                <li>✓ No Ads</li>
                <li>✓ Batch Processing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="card large">
          <div className="card-title">
            <div className="icon-box icon-orange">
              <Zap size={16} />
            </div>
            Feature Toggles
          </div>

          <div>
            {[
              ["email", "Email Notifications", "Send email alerts"],
              ["push", "Push Notifications", "Enable push alerts"],
              ["maintenance", "Maintenance Mode", "Site maintenance"],
              ["backup", "Auto Backup", "Daily backups"],
            ].map(([key, title, sub]) => (
              <div className="toggle-row" key={key}>
                <div>
                  <div className="toggle-title">{title}</div>
                  <div className="toggle-sub">{sub}</div>
                </div>
                <div
                  className={`switch ${toggles[key] ? "on" : ""}`}
                  onClick={() => toggleSwitch(key)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* System Config */}
        <div className="card medium">
          <div className="card-title">
            <div className="icon-box icon-blue">
              <Globe size={16} />
            </div>
            System Configuration
          </div>

          <div>
            <label>Site Name</label>
            <input value="HundredTools" readOnly />

            <label>Support Email</label>
            <input value="support@hundredtools.com" readOnly />

            <label>Max File Size (MB)</label>
            <input value="50" readOnly />

            <button className="btn-gradient">Save Changes</button>
          </div>
        </div>

        {/* Security */}
        <div className="card medium">
          <div className="card-title">
            <div className="icon-box icon-green">
              <Shield size={16} />
            </div>
            Security Settings
          </div>

          <div>
            <div className="security-item">
              <div className="security-left">
                <div className="icon-box icon-green">
                  <Shield size={16} />
                </div>
                <div>
                  <div className="toggle-title">
                    Two-Factor Authentication
                  </div>
                  <div className="toggle-sub">Enhanced security</div>
                </div>
              </div>
              <span className="status">Enabled</span>
            </div>

            <div className="security-item">
              <div className="security-left">
                <div className="icon-box icon-blue">
                  <Database size={16} />
                </div>
                <div>
                  <div className="toggle-title">Database Backup</div>
                  <div className="toggle-sub">Today, 3:00 AM</div>
                </div>
              </div>
              <button className="btn-outline">Backup</button>
            </div>

            <div className="security-item">
              <div className="security-left">
                <div className="icon-box icon-gray">
                  <SettingsIcon size={16} />
                </div>
                <div>
                  <div className="toggle-title">API Access</div>
                  <div className="toggle-sub">Manage API keys</div>
                </div>
              </div>
              <button className="btn-outline">Manage</button>
            </div>
          </div>
        </div>

      </div>

      <div className="bottom-cards">
        <div className="mini-card">
          <div className="icon-box icon-purple">
            <Mail size={16} />
          </div>
          Email Templates
        </div>

        <div className="mini-card">
          <div className="icon-box icon-orange">
            <Bell size={16} />
          </div>
          Notification Rules
        </div>

        <div className="mini-card">
          <div className="icon-box icon-blue">
            <Database size={16} />
          </div>
          System Logs
        </div>
      </div>
    </div>
  );
}