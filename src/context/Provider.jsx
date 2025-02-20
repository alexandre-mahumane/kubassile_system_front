import { useState } from "react";
import { AppContext } from "./AppContext";

export function Provider({ children }) {
  const [request, setRequest] = useState(null);
  const value = {
    request,
    setRequest,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
