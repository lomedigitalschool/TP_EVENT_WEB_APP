import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useErrorStore } from "../stores/errorStorre";
import { useEventStore } from "../stores/eventStore";
import "../styles/eventAddForm.css";

export function ResponseUpdates() {
  //states
  const { erreur, setErreur } = useErrorStore();
  const [Response, setResponse] = useState({
    response: "",
  });
  const [succes, setSuccess] = useState("");
  const { eventId, inviteeId } = useParams();
  const navigate = useNavigate();
  const { events } = useEventStore();

  // eslint-disable-next-line eqeqeq
  const eventOfID = events?.filter((event) => event.id == eventId);
  const invitee = eventOfID[0].invitees.filter(
    // eslint-disable-next-line eqeqeq
    (invitee) => invitee.id == inviteeId
  );
  //methodes

  const handleChange = (e) => {
    const data = { response: e.target.value };

    setResponse(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const send = await fetch(
        `http://localhost:5342/invitees/${invitee[0].id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Response),
        }
      );

      if (!send.ok) {
        throw new Error(
          "Une erreur est survenue lors de la mise à jour de la reponse."
        );
      }

      const result = await send.json();
      console.log("Réponse du serveur :", result);
      setSuccess("la reponse à été mise à jour");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setErreur(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <select
          name="responseUpdate"
          id="responseUpdate"
          value={Response.response}
          onChange={handleChange}
        >
          <option value="">selectionner une reponse</option>
          <option value="yes">oui</option>
          <option value="maybe">peut-etre</option>
          <option value="no">non</option>
        </select>
        <button type="submit" className="button form-btn ">
          Modifier
        </button>
      </form>
      {succes && <p>{succes}</p>}
      {erreur && <p>{erreur}</p>}
    </>
  );
}
