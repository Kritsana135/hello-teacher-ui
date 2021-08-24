/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Button, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { FC, useState } from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { IStep, path } from "../App";

interface IVideo1Props {
  setStep: (value: IStep) => void;
  step: IStep;
}

const Video1: FC<IVideo1Props> = ({ step, setStep }) => {
  const [canNext, setCanNext] = useState(step.watchVideo1);

  const onEndVideo = () => {
    setCanNext(true);
    setStep({ ...step, watchVideo1: true });
  };

  return (
    <div
      css={css({
        display: "flex",
        justifyContent: "center",
        marginTop: "1.5rem",
      })}
    >
      <Card
        hoverable
        css={css({
          width: "90%",
          maxWidth: 1000,
        })}
        cover={
          <ReactPlayer
            url="https://youtu.be/E8t-bn3imjA"
            width="100%"
            onEnded={onEndVideo}
          />
        }
        actions={[
          <Button
            type="primary"
            disabled={!canNext}
            css={css({
              width: "100%",
              height: "100%",
            })}
          >
            <Link
              to={path.ingredient}
              css={css({
                color: "inherit !important",
              })}
            >
              ไปต่อ
            </Link>
          </Button>,
        ]}
      >
        <Meta
          title="งานไหว้ครูประจำปีการศึกษา 2564"
          description="เมื่อท่านดูจบจึงสามารถไปขั้นตอนต่อไปได้"
        />
      </Card>
    </div>
  );
};

export default Video1;
