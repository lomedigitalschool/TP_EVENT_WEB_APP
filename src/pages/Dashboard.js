import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';
import EventCard from '../components/EventCard';


const Dashboard = () => {
  const { events, loading, error, fetchEvents } = useStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  if (loading) return <div className="loading">Loading events...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Your Events</h1>
        <Link to="/create-event" className="create-event-btn">
          + New Event
        </Link>
      </div>
      <div className="events-grid">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;