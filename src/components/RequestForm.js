import React, { useState } from 'react';
import axios from 'axios';
import './RequestForm.css';

function RequestForm({ mentorName, onClose, onSubmitSuccess }) {
  const [topicName, setTopicName] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [keyPoints, setKeyPoints] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true);

    // Validation
    if (!topicName.trim() || !type || !date) {
      console.log('❌ Validation failed');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('📤 Submitting request to backend...');
      console.log('Data:', {
        mentorName,
        topicName: topicName.trim(),
        type,
        date,
        keyPoints: keyPoints.trim(),
        status: 'pending'
      });

      // ✅ SAVE TO DATABASE
      const response = await axios.post('http://localhost:5000/api/requests', {
        mentorName: mentorName,
        topicName: topicName.trim(),
        type: type,
        date: date,
        keyPoints: keyPoints.trim(),
        status: 'pending'
      });

      console.log('✅ Request saved successfully:', response.data);

      // Clear form
      setTopicName('');
      setType('');
      setDate('');
      setKeyPoints('');
      setShowErrors(false);
      
      // Notify parent of success
      onSubmitSuccess();
      onClose();
    } catch (error) {
      console.error('❌ Error saving request:', error);
      console.error('Error details:', error.response?.data || error.message);
      alert('Failed to submit request. Please check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setTopicName('');
    setType('');
    setDate('');
    setKeyPoints('');
    setShowErrors(false);
    onClose();
  };

  return (
    <div className="request-form-modal">
      <h2 className="form-heading">Request Mentorship</h2>
      <p className="subheading">
        Fill in the details to connect with {mentorName}
      </p>

      <form onSubmit={handleSubmit} className="form">
        {/* Topic Name */}
        <div className="form-group">
          <label className="form-label">Topic Name:</label>
          <input
            type="text"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
            placeholder="e.g. Artificial Intelligence"
            disabled={isSubmitting}
          />
          {showErrors && !topicName.trim() && (
            <p className="error-text">Please enter a topic name</p>
          )}
        </div>

        {/* Type */}
        <div className="form-group">
          <label className="form-label">Type:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontWeight: 'normal',
              color: type ? '#333' : '#aaa8a8ff',
              backgroundColor: 'white',
              background: `white url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="%23001f3f" d="M7 10l5 5 5-5z"/></svg>') no-repeat right 10px center`,
              backgroundSize: '12px',
              appearance: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="" disabled hidden>
              Select Option
            </option>
            <option value="Individual">Individual</option>
            <option value="Group">Group</option>
          </select>
          {showErrors && !type && (
            <p className="error-text">Please choose a type</p>
          )}
        </div>

        {/* Key Points */}
        <div className="form-group">
          <label className="form-label">Key Points to Cover:</label>
          <textarea
            value={keyPoints}
            onChange={(e) => setKeyPoints(e.target.value)}
            placeholder="Enter key points (optional)"
            disabled={isSubmitting}
            style={{ width: '100%', height: '60px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        {/* Date */}
        <div className="form-group">
          <label className="form-label">Date & Time:</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
          {showErrors && !date && (
            <p className="error-text">
              Please select your preferred date and time
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          <button type="button" className="cancel-btn" onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default RequestForm;