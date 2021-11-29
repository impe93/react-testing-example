import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { createMemoryHistory, MemoryHistoryBuildOptions } from "history";
import { RootState } from "../redux/core";
import { userReducer } from "../redux/user/user.slice";
import { configureStore } from "@reduxjs/toolkit";

export type TestContextConfig<T = any> = {
  Component: React.ReactElement | React.ComponentType<T>;
  initialState?: Partial<RootState>;
  historyOptions?: MemoryHistoryBuildOptions;
};

function createTestStore(initialState: Partial<RootState>) {
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState: initialState,
  });
  return store;
}

function withTestContext<P>({
  initialState,
  Component,
  historyOptions,
}: TestContextConfig) {
  const store = createTestStore(initialState ?? {});
  const history = createMemoryHistory(historyOptions);

  function TestComponent(props?: P) {
    return (
      <Provider store={store}>
        <Router history={history}>
          {React.isValidElement(Component) ? (
            Component
          ) : (
            <Component {...props} />
          )}
        </Router>
      </Provider>
    );
  }

  return {
    TestComponent,
    history,
    store,
  };
}

export class TestComponentBuilder<P> {
  config: TestContextConfig;

  static fromComponent<T = any>(component: TestContextConfig["Component"]) {
    return new TestComponentBuilder<T>(component);
  }

  constructor(Component: TestContextConfig["Component"]) {
    this.config = { Component };
  }

  withState(initialState: TestContextConfig["initialState"]) {
    this.config.initialState = initialState;
    return this;
  }

  withHistoryOptions(historyOptions: TestContextConfig["historyOptions"]) {
    this.config.historyOptions = historyOptions;
    return this;
  }

  build() {
    return withTestContext<P>(this.config);
  }
}
