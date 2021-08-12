/** @jsxRuntime classic */
/** @jsx jsx */
import { ArrowRightOutlined } from "@ant-design/icons";
import { css, jsx } from "@emotion/react";
import { Button, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { useState } from "react";
import ReactPlayer from "react-player";

const Video1 = () => {
  const [canNext, setCanNext] = useState(false);

  const onEndVideo = () => {
    setCanNext(true);
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
            url="https://www.youtube.com/watch?v=ApXoWvfEYVU"
            width="100%"
            onEnded={onEndVideo}
          />
        }
        actions={[
          <Button
            type="text"
            disabled={!canNext}
            icon={<ArrowRightOutlined />}
            css={css({
              width: "100%",
              height: "100%",
            })}
          >
            ไปต่อ
          </Button>,
        ]}
      >
        <Meta
          title="คลิปโอวาทจากคณบดี"
          description="เมื่อท่านดูจบจึงสามารถไปขั้นตอนต่อไปได้"
        />
      </Card>
    </div>
  );
};

export default Video1;
