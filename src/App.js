import { Route, Routes } from "react-router-dom";
import { EventAddForm } from "./pages/EventAddForm";
import { Events } from "./pages/Events";
import { InviteesAddForm } from "./pages/InviteesAddForm";
import { ResponseUpdates } from "./pages/ReponseUpdate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Events />} />
      <Route path="/add-event" element={<EventAddForm />} />
      <Route path="/add-invitees/:id" element={<InviteesAddForm />} />
      <Route
        path="/response-update/:eventId/:inviteeId"
        element={<ResponseUpdates />}
      />
    </Routes>
  );
}

export default App;
