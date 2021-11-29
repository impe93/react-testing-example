import React from "react";
import { useAppSelector } from "../../redux/core";
import { authTokenSelector } from "../../redux/user/user.selectors";

type HomePageProps = {};

export const HomePage: React.FC<HomePageProps> = () => {
  const isAuthenticated = useAppSelector(authTokenSelector);

  return (
    <div>The user is {isAuthenticated ? "Authorized" : "Unauthorized"}</div>
  );
};
