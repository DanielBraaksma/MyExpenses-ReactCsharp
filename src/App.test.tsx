import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./App/store";

describe("App", () => {
  test('renders default route as "/"', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText('Register here')).toBeInTheDocument();
  });
});
