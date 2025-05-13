import { Link } from "react-router-dom";
import { useEventStore } from "../stores/eventStore";

export function Eventslist() {
  const events = useEventStore((state) => state.events);

  if (!Array.isArray(events)) {
    return <p>Chargement ...</p>;
  }

  const responseParse = (exp) => {
    switch (exp) {
      case "maybe":
        return " Peut-etre";

      case "no":
        return " Non";

      default:
        return "Oui";
    }
  };

  const dateFormat = (date) => {
    const datefrmt = new Date(date);
    return datefrmt.toLocaleDateString("fr-Fr", { timeZone: "UTC" });
  };

  return (
    <>
      {events.map((event) => {
        return (
          <tr key={event.id}>
            <td>{event?.title}</td>
            <td>{event?.description}</td>
            <td>{dateFormat(event?.date)}</td>
            <td>{event?.location}</td>
            <td>
              {event?.invitees.map((invitee) => {
                return (
                  <ul className="evntlist">
                    <li key={invitee?.id}>
                      <span className="highlight-text"> Nom:</span>{" "}
                      {invitee?.name} ,{" "}
                      <span className="highlight-text"> Email:</span>{" "}
                      {invitee?.email},{""}
                      <span className="highlight-text">
                        Participation:
                      </span>{" "}
                      {responseParse(invitee?.response)}
                      <Link
                        className=" li-btn"
                        to={`/response-update/${event.id}/${invitee.id}`}
                      >
                        Modifier
                      </Link>
                    </li>
                  </ul>
                );
              })}
            </td>
            <Link
              className="button form-btn table-btn "
              to={`/add-invitees/${event.id}`}
            >
              Ajouter un invité
            </Link>
          </tr>
        );
      })}
    </>
  );
}
