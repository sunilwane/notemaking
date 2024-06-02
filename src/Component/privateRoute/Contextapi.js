import { createContext, useState } from "react";

export const Themecontext = createContext();

const ProviderTheme = (props) => {
  const [show, setShow] = useState(false);

  const login = () => {
    setShow(true);
  };
  const logout = () => {
    setShow(false);
  };
  return (
    <Themecontext.Provider value={{ show, login, logout }}>
      {props.children}
    </Themecontext.Provider>
  );
};

export default ProviderTheme;
