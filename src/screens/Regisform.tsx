/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { FC } from "react";

const backGround = css({
  backgroundColor: ` #D3B26D`,
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
});

const Regisform: FC = () => {
  return <div css={backGround}>5</div>;
};

export default Regisform;
