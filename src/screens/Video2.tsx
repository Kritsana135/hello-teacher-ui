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

const Video2: FC<IVideo1Props> = ({ step, setStep }) => {
  const [canNext, setCanNext] = useState(step.watchVideo2);

  const onEndVideo = () => {
    setCanNext(true);
    setStep({ ...step, watchVideo2: true });
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
        css={css({
          width: "90%",
          maxWidth: 1000,
        })}
        cover={
          <ReactPlayer
            url="https://youtu.be/UmP63q4nNoA"
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
              to={path.certificate}
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
          title="คลิปโอวาทจากอธิการบดี"
          description="เมื่อท่านดูจบจึงสามารถไปขั้นตอนต่อไปได้"
        />
      </Card>
    </div>
  );
};

export default Video2;
