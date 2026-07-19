import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/todo.css";

const templates = [
  {
    key: "daily",
    label: "Daily Planner",
    description: "Organize your day with goals, priorities, and scheduled tasks.",
    header: "Daily Planner 2026",
    goals: ["Complete Project", "Team Meeting", "Client Review"],
    schedule: [
      { time: "8:00 AM", label: "Morning Standup" },
      { time: "9:00 AM", label: "Deep Work Block" },
      { time: "10:30 AM", label: "Team Meeting" },
      { time: "11:30 AM", label: "Client Call" },
      { time: "12:30 PM", label: "Lunch Break" },
      { time: "1:30 PM", label: "Project Work" },
      { time: "3:00 PM", label: "Review & Feedback" },
      { time: "4:00 PM", label: "Planning Tomorrow" },
      { time: "5:00 PM", label: "Wrap-up" },
    ],
    priorities: ["Complete Draft", "Email Responses", "Meeting Notes"],
    notes: ["Focus on main task", "Avoid distractions", "Track progress"],
  },
  {
    key: "weekly",
    label: "Weekly Planner",
    description: "Plan work, personal time, and notes for the whole week.",
    header: "Weekly Planner 2026",
    rows: [
      {
        day: "MON",
        work: ["Review Timelines", "Approve budget", "Team Stand-up"],
        personal: ["Morning Walk", "Prep Meals", "Call Parents"],
        notes: ["Send Review Reminders"],
      },
      {
        day: "TUE",
        work: ["Strategy Call", "Finalize goals", "Vendor review"],
        personal: ["Gym", "Pickup Dryclean", "Journal"],
        notes: ["Schedule HR follow-up"],
      },
      {
        day: "WED",
        work: ["Team sync", "Progress review", "Sign-off marketing"],
        personal: ["Meditate", "Grocery Shopping", "Family dinner"],
        notes: ["Draft agenda for board meet"],
      },
      {
        day: "THU",
        work: ["Present to board", "Interview", "Department sync"],
        personal: ["Skincare routine", "Attend event", "Meet Friends"],
        notes: ["Vendor payment follow-up"],
      },
      {
        day: "FRI",
        work: ["Weekly Report", "Check tasks", "Plan next week"],
        personal: ["Breakfast with Spouse", "Movie Night"],
        notes: ["Confirm weekend travel"],
      },
      {
        day: "SAT",
        work: ["New to market research", "Check mails"],
        personal: ["Sleep in", "Cafe visit", "Park time"],
        notes: ["Add weekly goals"],
      },
    ],
  },
  {
    key: "routine",
    label: "Routine Planner",
    description: "Set priorities, daily rituals, and time-based routines.",
    header: "Routine Planner 2026",
    priorities: ["Finish Project Draft", "Team Meeting Prep", "Gym Workout"],
    schedule: [
      { time: "8:00 AM", label: "Morning Walk" },
      { time: "9:00 AM", label: "Review Notes" },
      { time: "10:00 AM", label: "Project Draft" },
      { time: "11:00 AM", label: "Client Call" },
      { time: "12:00 PM", label: "Lunch Break" },
      { time: "1:00 PM", label: "Work On Slides" },
      { time: "2:00 PM", label: "Team Meeting" },
      { time: "3:00 PM", label: "Draft Edits" },
      { time: "4:00 PM", label: "Submit Draft" },
      { time: "5:00 PM", label: "Gym Workout" },
    ],
    reminders: ["Call Mom", "Email PM Draft", "Reply To HR Message"],
  },
  {
    key: "productivity",
    label: "Productivity Planner",
    description: "Keep your daily progress, priorities and follow-up tasks organized.",
    header: "Productivity Planner",
    schedule: [
      { time: "8:00 AM", label: "Review Daily Priorities" },
      { time: "9:00 AM", label: "Team Sync Meeting" },
      { time: "10:00 AM", label: "Project Planning" },
      { time: "11:00 AM", label: "Client Follow-Up" },
      { time: "12:00 PM", label: "Lunch Break" },
      { time: "1:00 PM", label: "Strategy Tasks" },
      { time: "2:00 PM", label: "Client Call" },
      { time: "3:00 PM", label: "Task Execution" },
      { time: "4:00 PM", label: "Progress Review" },
    ],
    goals: ["Project Progress", "Focused Execution", "Client Alignment"],
    priorities: ["Prep For Meeting", "Finalize Tasks", "Client Follow-Up"],
    followUp: ["Send Recap", "Schedule Call", "Update Tracker"],
    notes: ["Meeting Outcomes", "Action Items", "Improvement Notes"],
  },
  {
    key: "schedule",
    label: "Schedule Planner",
    description: "Block your day with a clear agenda and top priorities.",
    header: "Schedule Planner 2026",
    schedule: [
      { time: "8:00 AM", label: "Review Daily Agenda" },
      { time: "9:00 AM", label: "Team meeting" },
      { time: "10:00 AM", label: "Project Planning" },
      { time: "11:00 AM", label: "Client follow-up" },
      { time: "12:00 PM", label: "Lunch Break" },
      { time: "1:00 PM", label: "Strategy tasks" },
      { time: "2:00 PM", label: "Task execution" },
      { time: "3:00 PM", label: "Progress review" },
      { time: "5:00 PM", label: "Day wrap-up" },
      { time: "6:00 PM", label: "Evening workout" },
      { time: "7:00 PM", label: "Family dinner" },
      { time: "8:00 PM", label: "Light reading" },
      { time: "9:00 PM", label: "Digital detox" },
      { time: "10:00 PM", label: "Sleep" },
    ],
    priorities: ["Project proposal", "Client meeting", "Weekly report", "Client feedback"],
    tasks: ["Email replies", "Schedule next week's meeting", "Calendar review"],
    notes: ["Reduce morning screen time", "Prioritize task better"],
  },
];

const ToDoList = () => {
  const [activeTemplate, setActiveTemplate] = useState("daily");
  const template = templates.find((item) => item.key === activeTemplate);

  const renderDaily = () => (
    <div className="planner-card planner-grid-card">
      <div className="planner-card-heading">
        <div>
          <div className="planner-chip">{template.header}</div>
          <h2>Daily Planner</h2>
          <p>Stay focused with today's goals, priorities, and schedule.</p>
        </div>
      </div>

      <div className="planner-grid-two">
        <div className="planner-panel panel-light">
          <h3>Today's Goals</h3>
          {template.goals.map((item) => (
            <div key={item} className="planner-bullet">
              {item}
            </div>
          ))}
        </div>

        <div className="planner-panel panel-soft">
          <h3>Schedule</h3>
          {template.schedule.map((item) => (
            <div key={item.time} className="schedule-row">
              <span>{item.time}</span>
              <strong>{item.label}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="planner-grid-two">
        <div className="planner-panel panel-peach">
          <h3>Top Priorities</h3>
          {template.priorities.map((item) => (
            <div key={item} className="planner-bullet">
              {item}
            </div>
          ))}
        </div>

        <div className="planner-panel panel-soft">
          <h3>Quick Notes</h3>
          {template.notes.map((item, index) => (
            <div key={index} className="planner-text">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWeekly = () => (
    <div className="planner-card">
      <div className="planner-card-heading">
        <div>
          <div className="planner-chip">{template.header}</div>
          <h2>Weekly Planner</h2>
          <p>Keep the week visible and the priorities aligned.</p>
        </div>
      </div>

      <div className="weekly-grid">
        <div className="weekly-head">Day</div>
        <div className="weekly-head">Work</div>
        <div className="weekly-head">Personal</div>
        <div className="weekly-head">Notes</div>

        {template.rows.map((row) => (
          <div key={row.day} className="weekly-row">
            <div className="weekly-day">{row.day}</div>
            <div className="weekly-cell">
              {row.work.map((item, index) => (
                <div key={index} className="weekly-item">
                  {item}
                </div>
              ))}
            </div>
            <div className="weekly-cell">
              {row.personal.map((item, index) => (
                <div key={index} className="weekly-item">
                  {item}
                </div>
              ))}
            </div>
            <div className="weekly-cell">
              {row.notes.map((item, index) => (
                <div key={index} className="weekly-item note-item">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRoutine = () => (
    <div className="planner-card planner-grid-card">
      <div className="planner-card-heading">
        <div>
          <div className="planner-chip">{template.header}</div>
          <h2>Routine Planner</h2>
          <p>Build momentum with a daily rhythm and strong focus areas.</p>
        </div>
      </div>

      <div className="planner-grid-two">
        <div className="planner-panel panel-light">
          <h3>Top Priorities</h3>
          {template.priorities.map((item) => (
            <div key={item} className="planner-bullet">
              {item}
            </div>
          ))}
        </div>

        <div className="planner-panel panel-soft">
          <h3>Plans & Schedules</h3>
          {template.schedule.map((item) => (
            <div key={item.time} className="schedule-row">
              <span>{item.time}</span>
              <strong>{item.label}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="planner-grid-two">
        <div className="planner-panel panel-peach">
          <h3>Call / Email / Texts</h3>
          {template.reminders.map((item) => (
            <div key={item} className="planner-bullet">
              {item}
            </div>
          ))}
        </div>
        <div className="planner-panel panel-soft">
          <h3>If I can wait</h3>
          <div className="planner-text">Plan Weekend Trip</div>
          <div className="planner-text">Sort Digital Files</div>
        </div>
      </div>
    </div>
  );

  const renderProductivity = () => (
    <div className="planner-card planner-grid-card">
      <div className="planner-card-heading">
        <div>
          <div className="planner-chip">{template.header}</div>
          <h2>Productivity Planner</h2>
          <p>Track your day with goals, priorities, and follow-up actions.</p>
        </div>
      </div>

      <div className="planner-grid-two">
        <div className="planner-panel panel-soft">
          <h3>Today's Schedule</h3>
          {template.schedule.map((item) => (
            <div key={item.time} className="schedule-row">
              <span>{item.time}</span>
              <strong>{item.label}</strong>
            </div>
          ))}
        </div>

        <div className="planner-panel panel-light">
          <h3>Today's Goal</h3>
          {template.goals.map((item) => (
            <div key={item} className="planner-bullet">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="planner-grid-two">
        <div className="planner-panel panel-soft">
          <h3>Priorities</h3>
          {template.priorities.map((item) => (
            <div key={item} className="planner-bullet">
              {item}
            </div>
          ))}
        </div>

        <div className="planner-panel panel-peach">
          <h3>Follow-Up</h3>
          {template.followUp.map((item) => (
            <div key={item} className="planner-bullet">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="planner-grid-two">
        <div className="planner-panel panel-soft">
          <h3>Notes</h3>
          {template.notes.map((item) => (
            <div key={item} className="planner-text">
              {item}
            </div>
          ))}
        </div>
        <div className="planner-panel panel-soft">
          <h3>Focus</h3>
          <div className="planner-text">Deep work</div>
          <div className="planner-text">Key tasks completed</div>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="planner-card planner-grid-card">
      <div className="planner-card-heading">
        <div>
          <div className="planner-chip">{template.header}</div>
          <h2>Schedule Planner</h2>
          <p>Structure the day with work blocks, priorities, and quick notes.</p>
        </div>
      </div>

      <div className="planner-grid-two">
        <div className="planner-panel panel-soft planner-schedule-column">
          <h3>Today's Schedule</h3>
          {template.schedule.map((item) => (
            <div key={item.time} className="schedule-row">
              <span>{item.time}</span>
              <strong>{item.label}</strong>
            </div>
          ))}
        </div>

        <div className="planner-panel panel-light planner-priority-column">
          <h3>Today's Priorities</h3>
          {template.priorities.map((item) => (
            <div key={item} className="planner-bullet">
              {item}
            </div>
          ))}

          <h3 style={{ marginTop: "16px" }}>Additional Tasks</h3>
          {template.tasks.map((item) => (
            <div key={item} className="planner-text">
              {item}
            </div>
          ))}

          <h3 style={{ marginTop: "16px" }}>Notes</h3>
          {template.notes.map((item) => (
            <div key={item} className="planner-note">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="planner-shell">
      <div className="planner-top">
        <div className="planner-back">
          <Link to="/">? Back to Home</Link>
        </div>
        <div className="planner-header">
          <div>
            <div className="planner-label">2026 Planner Studio</div>
            <h1>{template.label}</h1>
            <p>{template.description}</p>
          </div>
          <button className="planner-save-btn">Save</button>
        </div>
      </div>

      <div className="planner-tabs">
        {templates.map((item) => (
          <button
            key={item.key}
            className={`planner-tab ${item.key === activeTemplate ? "active" : ""}`}
            onClick={() => setActiveTemplate(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="planner-main">
        {activeTemplate === "daily" && renderDaily()}
        {activeTemplate === "weekly" && renderWeekly()}
        {activeTemplate === "routine" && renderRoutine()}
        {activeTemplate === "productivity" && renderProductivity()}
        {activeTemplate === "schedule" && renderSchedule()}
      </div>
    </div>
  );
};

export default ToDoList;
