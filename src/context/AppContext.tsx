import { createContext, useState } from "react";
import { Operation } from "../hooks/useOperations";

export const AppContext = createContext<AppContextType>({} as AppContextType);

interface AppContextType {
  operations: Operation[];
  setOperations: (operations: Operation[]) => void;
}

export const ApplicationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [operations, setOperations] = useState<Operation[]>([]);

  return (
    <AppContext.Provider value={{ operations, setOperations }}>
      {children}
    </AppContext.Provider>
  );
};
