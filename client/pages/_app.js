import React from "react";
import NextApp from "next/app";
import { Grommet } from "grommet";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Older browsers */
  html { font-size: 16px; }

  /* Modern browsers only need this one */
  html { font-size: calc( 16px + (24 - 16) * (100vw - 400px) / (800 - 400) ); }
  
  body {
    background-color: #f1f1f1
  }
`;

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Grommet>
        <GlobalStyle />
        <Component {...pageProps} />
      </Grommet>
    );
  }
}
