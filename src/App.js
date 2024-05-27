import React from "react";

import { createGlobalStyle } from "styled-components";

import ButtonTable from "./ButtonTable";

const GlobalStyle = createGlobalStyle`
  box-sizing: border-box;
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <ButtonTable />
    </>
  );
}
