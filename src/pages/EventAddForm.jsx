import { useEventStore } from "../stores/eventStore";
// import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/eventAddForm.css";
import "../App.css";

export function EventAddForm() {
  // states
  const events = useEventStore((state) => state.events);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //methodes
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
      const response = await fetch("http://localhost:5342/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(
          "Une erreur est survenue lors de la creation de l'event."
        );
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
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Titre*</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Entrez le titre de votre evenement"
        value={form.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        placeholder="Entrez une description de votre evenement(optionnelle)"
        value={form.description}
        onChange={handleChange}
      />
      <div className="dateBox">
        <label htmlFor="date">Date*</label>
        <input
          className="date"
          id="date"
          name="date"
          type="date"
          placeholder="date"
          required
          value={form.date}
          onChange={handleChange}
        />
      </div>
      <label htmlFor="location">Lieu de l'evenement*</label>
      <input
        id="location"
        name="location"
        type="text"
        placeholder=" le lieu de votre evenement"
        value={form.location}
        onChange={handleChange}
        required
      />
      <button className="button form-btn" type="submit">
        Créer
      </button>
      {success && <p className="success">evenement ajouté avec succès✅</p>}
      {error && <p className="danger">{error}⚠️</p>}
    </form>
  );
}
