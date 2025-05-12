import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <div className="event-card-header">
        <h2>{event.title}</h2>
        <span className="event-date">
          {new Date(event.date).toLocaleDateString()}
        </span>
      </div>
      <p className="event-description">{event.description}</p>
      <div className="event-details">
        <span className="event-location">{event.location}</span>
        <span className="invitees-count">
          {event.invitees.length} invitees
        </span>
      </div>
      <Link to={`/events/${event.id}`} className="view-details-btn">
        View Details
      </Link>
    </div>
  );
};

export default EventCard;