import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../store/useStore';
import InviteeForm from '../components/InviteeForm';
import ResponseForm from '../components/ResponseForm';


const EventDetail = () => {
  const { eventId } = useParams();
  const { events, fetchEvents, addInvitee, updateResponse } = useStore();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    if (events.length > 0) {
      const foundEvent = events.find((e) => e.id.toString() === eventId);
      setEvent(foundEvent);
    }
  }, [events, eventId]);

  if (!event) return <div className="loading">Loading event details...</div>;

  return (
    <div className="event-detail-container">
      <div className="event-info">
        <h1>{event.title}</h1>
        <p className="event-description">{event.description}</p>
        <div className="event-meta">
          <span className="event-date">
            {new Date(event.date).toLocaleString()}
          </span>
          <span className="event-location">{event.location}</span>
        </div>
      </div>

      <div className="event-sections">
        <div className="invitees-section">
          <h2>Invitees ({event.invitees.length})</h2>
          <div className="invitees-list">
            {event.invitees.map((invitee) => (
              <div key={invitee.id} className="invitee-card">
                <div className="invitee-info">
                  <span className="invitee-name">{invitee.name}</span>
                  <span className="invitee-email">{invitee.email}</span>
                </div>
                <div className={`invitee-response ${invitee.response}`}>
                  {invitee.response}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="forms-section">
          <InviteeForm eventId={event.id} onAddInvitee={addInvitee} />
          <ResponseForm onUpdateResponse={updateResponse} />
        </div>
      </div>
    </div>
  );
};

export default EventDetail;