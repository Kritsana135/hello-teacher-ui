/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Button, Card, Input, Select } from "antd";
import Meta from "antd/lib/card/Meta";
import TextArea from "antd/lib/input/TextArea";
import { Option } from "antd/lib/mentions";
import { Link } from "react-router-dom";
import { path } from "../App";

const Greeting = () => {
  return (
    <div
      css={css({
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "1.5rem",
      })}
    >
      <Card
        hoverable
        css={css({
          width: "90%",
          maxWidth: 1000,
        })}
        cover={<img alt="example" src="/images/greeting.jpg" />}
      >
        <Meta title="คำอวยพร" />
        <div
          css={css({
            display: "flex",
            marginTop: "1rem",
          })}
        >
          <Select defaultValue="1">
            <Option value="1">นาย</Option>
            <Option value="2">นางสาว</Option>
            <Option value="3">นาง</Option>
          </Select>
          <Input placeholder="ชื่อ" />
        </div>
        <Input placeholder="นามสกุล" />
        <TextArea
          showCount
          autoSize
          maxLength={200}
          placeholder="คำอวยพร"
          css={css({
            marginTop: "1rem",
          })}
        />
        ,
      </Card>
      <Button
        type="primary"
        size="large"
        id="play"
        css={css({
          marginTop: "1rem",
        })}
      >
        <Link to={path.video2}>ไปต่อ</Link>
      </Button>
    </div>
  );
};

export default Greeting;
