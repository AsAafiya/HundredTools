import { useState } from "react";
import "../styles/support.css";

function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issueType: "",
    message: "",
    screenshot: null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;

    setFormData((prev) => ({
      ...prev,
      screenshot: file,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="support-page">
      <div className="site-container">
        <div className="support-card">
          <div className="support-header">
            <h1>Need Help? We&apos;re Here for You</h1>
            <p className="support-subtitle">
              Tell us your issue and our team will respond within 24 hours.
            </p>
          </div>

          {!submitted && (
            <>
              <div className="support-suggestion-wrap">
                <p className="support-suggestion-title">Before submitting:</p>
                <div className="support-suggestion-box" role="note" aria-live="polite">
                  <p>⚡ Quick Fix:</p>
                  <ul>
                    <li>Try re-uploading your file</li>
                    <li>Check file size limit (Max: 10MB)</li>
                    <li>Refresh page</li>
                  </ul>
                </div>
              </div>

              <form className="support-form" onSubmit={handleSubmit}>
                <div className="support-row">
                  <div className="support-field-group">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="support-field-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="support-row">
                  <div className="support-field-group">
                    <label htmlFor="issueType">Select Issue</label>
                    <select
                      id="issueType"
                      name="issueType"
                      value={formData.issueType}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Choose an issue
                      </option>
                      <option value="pdf-not-merging">PDF not merging</option>
                      <option value="file-not-uploading">File not uploading</option>
                      <option value="download-issue">Download issue</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="support-field-group">
                    <label htmlFor="screenshot">Upload Screenshot (optional)</label>
                    <input
                      id="screenshot"
                      name="screenshot"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <div className="support-field-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="support-submit-btn">
                  Submit
                </button>
              </form>
            </>
          )}

          {submitted && (
            <div className="support-success-card" role="status" aria-live="polite">
              <p className="support-success-title">✅ Request Sent!</p>
              <p className="support-success-message">
                Our team will contact you soon. Meanwhile, you can explore other tools.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Support;
