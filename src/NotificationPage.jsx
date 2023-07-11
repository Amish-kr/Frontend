import React, { useState } from 'react';
import './NotificationPage.css';

const NotificationPage = () => {
  const [activeSection, setActiveSection] = useState('all');

  // Example notifications array
  const notifications = [
    { id: 1, title: 'Notification 1', read: true, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 2, title: 'Notification 2', read: false, content: 'Nulla cursus turpis non eros lobortis, id sagittis est aliquam.' },
    { id: 3, title: 'Notification 3', read: true, content: 'Praesent non urna tristique, convallis lacus a, finibus mauris.' },
    // Add more notifications as needed
  ];

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  // Filter notifications based on active section
  const filteredNotifications =
    activeSection === 'all'
      ? notifications
      : activeSection === 'unread'
      ? notifications.filter((notification) => !notification.read)
      : notifications.filter((notification) => notification.read);

  return (
    <div className="cor">
      <div className="section-buttons">
        <button
          className={`section-button ${activeSection === 'all' ? 'active' : ''}`}
          onClick={() => handleSectionClick('all')}
        >
          All Notifications
        </button>
        <button
          className={`section-button ${activeSection === 'unread' ? 'active' : ''}`}
          onClick={() => handleSectionClick('unread')}
        >
          Unread
        </button>
        <button
          className={`section-button ${activeSection === 'read' ? 'active' : ''}`}
          onClick={() => handleSectionClick('read')}
        >
          Read
        </button>
      </div>

      <div className="notification-content">
        {/* Render content based on active section */}
        {filteredNotifications.map((notification) => (
          <div className="notification" key={notification.id}>
            <h3 className="notification-title">{notification.title}</h3>
            <p className="notification-content">{notification.content}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .section-buttons {
          display: flex;
          margin-bottom: 20px;
        }

        .section-button {
          margin-right: 10px;
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          background-color: #eee;
          cursor: pointer;
        }

        .section-button.active {
          background-color: #ccc;
        }

        .notification-content {
          background-color: #f5f5f5;
          padding: 20px;
        }

        .notification {
          margin-bottom: 20px;
          padding: 10px;
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .notification-title {
          margin-top: 0;
        }

        .notification-content {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

export default NotificationPage;
