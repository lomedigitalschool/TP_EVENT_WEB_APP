import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useEventStore } from "../stores/eventStore";
import { Eventslist } from "../components/EventsList";
import "../App.css";

export function Events() {
  // states
  const { setEvents } = useEventStore();

  // methodes
  const dataFetcher = async () => {
    const r = await fetch("http://localhost:5342/events");
    if (!r.ok) {
      throw new Error("erreur lors de la recuperation des données");
    }
    const data = await r.json();
    setEvents(data.eventsArray);
  };

  useEffect(() => {
    try {
      dataFetcher();
    } catch (error) {
      console.log("erreur backend:", error);
    }
  }, []);

  return (
    <div className="eventContent">
      <h1 className="title">Liste des evenements leurs invités</h1>
      <Link className="button header-btn blue" to="/add-event">
        Créer un event
      </Link>
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Date</th>
            <th>Lieu</th>
            <th className="inviteClmn">Invités</th>
            <th>option</th>
          </tr>
        </thead>
        <tbody>
          <Eventslist />
        </tbody>
      </table>{" "}
    </div>
  );
}
