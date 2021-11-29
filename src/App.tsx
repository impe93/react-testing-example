import React from "react";
import { BrowserRouter } from "react-router-dom";
import { routes } from "./routes/routes";
import Router from "./routes/Router";
import { useAppSelector } from "./redux/core";
import { authTokenSelector } from "./redux/user/user.selectors";

type AppProps = {};

export const App: React.FC<AppProps> = () => {
  const hasToken = useAppSelector(authTokenSelector);
  const isAuthenticated: boolean = !!hasToken;

  return (
    <BrowserRouter>
      <Router authorized={isAuthenticated} routes={routes} />
    </BrowserRouter>
  );
};

export default App;
