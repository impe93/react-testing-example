import React, {
  ComponentClass,
  ComponentType,
  FC,
  ReactElement,
  Suspense,
} from "react";
import { connect, ConnectedComponent } from "react-redux";
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import { pick } from "lodash";
import MetaTags from "../components/MetaTags";
import Loading from "../components/Loading";
export const type = {
  PUBLIC: "PUBLIC",
  SECURED: "SECURED",
  AUTHENTICATION: "AUTHENTICATION",
};
export type RouteType = {
  id: string | number;
  path: string;
  type?: string;
  icon?:
    | ReactElement
    | ConnectedComponent<any, any>
    | ComponentClass
    | ComponentType
    | string;
  exact?: boolean;
  redirectTo?: string;
  redirectToExternal?: string;
  children?: Array<any>;
  title: string;
  component?: any;
  noFollow?: boolean;
  layout?: any;
  layoutOptions?: object;
  scopes?: Array<string>;
  showInMenu?: boolean;
};
export const getFlatRouteList = (routes: Array<RouteType>) => {
  const routeList: Array<RouteType> = [];
  routes.forEach((route) => {
    if (route.path) {
      routeList.push(route);
    }
    if (route.children && route.children.length > 0) {
      route.children.forEach((child) => {
        child.parent_id = route.id;
        if (child.path) {
          routeList.push(child);
        }
      });
    }
  });
  return routeList;
};

type RouteComponentType = {
  route: RouteType;
} & Record<string | number, any>;

const RouteComponent: React.FC<RouteComponentType> = ({ route, ...props }) => {
  return (
    <>
      <MetaTags title={route.title} noFollow={route.noFollow} />
      <Suspense fallback={<Loading />}>
        {route.layout ? (
          <route.layout
            {...{
              ...props,
              ...pick(route, [
                "id",
                "parent_id",
                "path",
                "title",
                "showInMenu",
              ]),
              ...route.layoutOptions,
            }}
          >
            <route.component {...props} />
          </route.layout>
        ) : (
          <route.component {...props} />
        )}
      </Suspense>
    </>
  );
};
const Router: FC<
  {
    routes: Array<RouteType> | null;
    authorized: boolean;
  } & RouteComponentProps
> = ({ routes = null, authorized = false }) =>
  routes ? (
    <>
      <Switch>
        {getFlatRouteList(routes).map((r: any, i) => (
          <Route
            key={i}
            path={r.path}
            exact={r.exact || true}
            render={(props) => {
              if (r.redirectToExternal) {
                window.location = r.redirectToExternal;
                return <Loading />;
              } else if (r.redirectTo) {
                return <Redirect to={r.redirectTo} />;
              } else if (!authorized && r.type === type.SECURED) {
                return <Redirect to={"/sign-in"} />;
              } else if (authorized && r.type === type.AUTHENTICATION) {
                return <Redirect to={"/"} />;
              } else {
                if (!r.component) {
                  return <Loading />;
                } else {
                  return <RouteComponent route={r} {...props} />;
                }
              }
            }}
          />
        ))}

        <Route key={-1} render={() => <Redirect to={"/"} />} />
      </Switch>
    </>
  ) : (
    <p>No routes</p>
  );
export default withRouter(connect()(Router));
