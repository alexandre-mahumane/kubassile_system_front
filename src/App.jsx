import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Service } from "./page/service";
import { Reports } from "./page/reports";
import { Login } from "./page/login";
import { ClientDetails } from "./page/client";
import { Provider } from "./context/Provider";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/service" element={<Service />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/client/:id" element={<ClientDetails />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
