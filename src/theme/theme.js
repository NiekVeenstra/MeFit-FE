import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    backgroundColor: "#ffffff",
    backgroundColorActive: "#E69023",
    textColor: "#ffffff",
    textColorActive: "#E69023",
    textColorDark: "#000000",
    border: "#E69023",
    white: "#ffffff",
  },
  fontSize: {
    h1: "1.2rem",
    h2: "1.1rem",
    h3: "1rem",
    h4: "0.9rem",
  },
};

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: "Montserrat", sans-serif;
        height: 100%;
        background-color: ${(props) => props.theme.colors.backgroundColor};
    }
    button {
        border: none;
        background-color:transparent;
    }
    a {
        text-decoration: none;
        color: ${(props) => props.theme.colors.textColorDark};
    }
`;
