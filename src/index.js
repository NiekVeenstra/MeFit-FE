import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./theme/theme";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Loading from "./components/loading/Loading";
import { initialize } from "./keycloak";

const root = ReactDOM.createRoot(document.getElementById("root"));
// Display a loading screen when connecting to Keycloak
root.render(<Loading message="Connecting to Keycloak..." />);

// Initialize Keycloak
initialize()
  .then(() => {
    // If No Keycloak Error occurred - Display the App
    root.render(
      //<React.StrictMode>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <GlobalStyle />
          <App />
        </BrowserRouter>
      </ThemeProvider>
      //</React.StrictMode>
    );
  })
  .catch(() => {
    root.render(
      <React.StrictMode>
        <p>Could Not Connect To Keycloak.</p>
      </React.StrictMode>
    );
  });
