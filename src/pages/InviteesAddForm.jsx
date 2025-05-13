import { useState } from "react";
import { useEventStore } from "../stores/eventStore";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/inviteAddForm.css";

export function InviteesAddForm() {
  //state
  const { id } = useParams();
  const events = useEventStore((state) => state.events);
  const [form, setForm] = useState({
    name: "",
    email: "",
    response: "",
    eventId: id || 0,
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // methodes

  if (!Array.isArray(events)) {
    return <p>Chargement ...</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5342/invitees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Une erreur est survenue lors de l'inscription.");
      }

      setSuccess(true);
      setError("");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setError(` ${error}`);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nom</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Entrez le nom de l'invité"
          value={form.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="example@email.com"
          value={form.email}
          onChange={handleChange}
          required
        />
        <select
          name="response"
          id="response"
          value={form.response}
          onChange={handleChange}
          required
        >
          <option value="">participez-vous?</option>
          <option value="yes">oui</option>
          <option value="maybe">peut-etre</option>
          <option value="no">non</option>
        </select>
        <select
          name="eventId"
          id="eventId"
          value={id || form.eventId}
          onChange={handleChange}
          required
        >
          <option value={0}>À quelle evenement participé vous?</option>
          {events.map((event) => {
            return <option value={event.id}>{event.title}</option>;
          })}
        </select>
        <button className="button form-btn" type="submit">
          Créer
        </button>
        {success && <p className="success">invité ajouté avec succès ✅</p>}
        {error && <p className="danger">{error}⚠️</p>}
      </form>
    </>
  );
}
