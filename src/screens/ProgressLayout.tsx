/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Progress } from "antd";
import { FC } from "react";

const backGround = css({
  backgroundColor: ` #D3B26D`,
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ProgressLayout: FC = () => {
  return (
    <div css={backGround}>
      <Progress
        strokeColor="#5C1308"
        percent={50}
        showInfo={false}
        css={{ width: "80%" }}
      />
    </div>
  );
};

export default ProgressLayout;
