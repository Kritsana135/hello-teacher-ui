/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Button, Card, Form, Input, Select } from "antd";
import Meta from "antd/lib/card/Meta";
import TextArea from "antd/lib/input/TextArea";
import { Option } from "antd/lib/mentions";
import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IForm, path } from "../App";

interface IGreetingProps {
  setForm: (value: IForm) => void;
  formState: IForm;
}

interface IGreetingForm {
  nameTitle: string;
  firstName: string;
  lastName: string;
  greetingText: string;
}

const Greeting: FC<IGreetingProps> = ({ formState, setForm }) => {
  const [, forceUpdate] = useState({});
  const [form] = Form.useForm<IGreetingForm>();

  const history = useHistory();

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (value: IGreetingForm) => {
    setForm({ ...formState, ...value });
    history.push(path.video2);
  };

  return (
    <Form
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
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
            <div>
              <Form.Item
                name="nameTitle"
                rules={[{ required: true, message: "โปรดระบุคำนำหน้า!" }]}
              >
                <Select placeholder="คำนำหน้า">
                  <Option value="1">นาย</Option>
                  <Option value="2">นางสาว</Option>
                  <Option value="3">นาง</Option>
                </Select>
              </Form.Item>
            </div>
            <div css={css({ width: "100%" })}>
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: "โปรดระบุชื่อ!" }]}
              >
                <Input placeholder="ชื่อ" />
              </Form.Item>
            </div>
          </div>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "โปรดระบุนามสกุล!" }]}
          >
            <Input placeholder="นามสกุล" />
          </Form.Item>
          <Form.Item
            name="greetingText"
            rules={[{ required: true, message: "โปรดเขียนคำอวยพร!" }]}
          >
            <TextArea
              showCount
              autoSize
              maxLength={200}
              placeholder="คำอวยพร"
              css={css({
                marginTop: "1rem",
              })}
            />
          </Form.Item>
        </Card>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              id="play"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
              css={css({
                marginTop: "1rem",
              })}
            >
              ไปต่อ
            </Button>
          )}
        </Form.Item>
      </div>
    </Form>
  );
};

export default Greeting;
