import { HomePage } from "../pages/Home/home.page";
import { SignInPage } from "../pages/SignIn/signIn.page";
import { RouteType, type } from "./Router";
import { Routes } from "./types";

export const routes: RouteType[] = [
  {
    id: "home",
    path: Routes.Home,
    title: "Home",
    component: HomePage,
    type: type.PUBLIC,
  },
  {
    id: "sign-in",
    path: Routes.SignIn,
    title: "Sign In",
    component: SignInPage,
    type: type.PUBLIC,
  },
];
