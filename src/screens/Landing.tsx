/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Button, Image } from "antd";
import { FC } from "react";

const backGround = css({
  background: `radial-gradient(78.56% 48.1% at 50% 50%, #E6D7B5 22.4%, #D3B26D 59.37%)`,
  backgroundBlendMode: "color",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
  "@media (min-width: 940px)": {
    flexDirection: "row-reverse",
  },
});

const header = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "flex-end",
  minWidth: 360,
  width: "100%",
  maxWidth: 1200,
  "#play": {
    display: "none",
  },
  "@media (min-width: 940px)": {
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
    justifyContent: "center",
    "#play": {
      display: "block",
      height: "3rem",
      marginTop: "2rem",
    },
    ".logo": {
      display: "none",
    },
  },
});

const headerText = css({
  display: "flex",
  flexDirection: "column",
  color: "#5C1308",
  marginRight: "2rem",
  "#head-1": {
    fontSize: "48px",
  },
  "#head-2": {
    fontSize: "24px",
  },
  "@media (min-width: 940px)": {
    width: "100%",
    alignItems: "center",
    "#head-1": {
      fontSize: "96px",
    },
    "#head-2": {
      fontSize: "48px",
    },
  },
});

const section = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "#phan": {
    width: 232,
  },
  "@media (min-width: 940px)": {
    width: "50%",
    "#phan": {
      width: "40%",
    },
    "#play": {
      display: "none",
    },
  },
});

const credit = css({
  display: "none",
  "@media (min-width: 940px)": {
    position: "fixed",
    bottom: "1rem",
    right: "3rem",
    display: "flex",
    span: {
      color: "white",
      fontsize: "16px",
    },
  },
});

const Landing: FC = () => {
  return (
    <div css={backGround}>
      <div css={header}>
        <div css={headerText}>
          <span id="head-1">พิธีไหว้ครู</span>
          <span id="head-2">ประจำปีการศึกษา 2564</span>
        </div>
        <div>
          <Button size="large" id="play">
            ร่วมกิจกรรม
          </Button>
        </div>
        <div className="logo">
          <Image
            src="./images/alogo.png"
            width={92}
            preview={{
              mask: null,
            }}
          />
        </div>
      </div>
      <div css={section}>
        <Image
          src="./images/phan.png"
          id="phan"
          preview={{
            mask: null,
          }}
        />
        <div
          css={css({
            marginTop: 33,
          })}
        >
          <Button size="large" id="play">
            ร่วมกิจกรรม
          </Button>
        </div>
      </div>
      {/* credit  */}
      <div css={credit}>
        <Image
          src="./images/alogo.png"
          width={92}
          preview={{
            mask: null,
          }}
        />
      </div>
    </div>
  );
};

export default Landing;
