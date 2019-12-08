import React from "react";
import NextApp from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
const theme = {
  primary: "green",
};
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f1f1f1
  }
`;

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
