/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Button, Card, Checkbox, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import { Link } from "react-router-dom";
import { path } from "../App";

interface IIngredient {
  key: string;
  image: string;
  title: string;
  description: string;
  alt: string;
}

const ingredients: Array<IIngredient> = [
  {
    key: "1",
    image:
      "https://th.toluna.com//dpolls_images/2020/10/27/483d7af2-c2ff-4a5f-ac69-b67e07d3a3fc.jpg",
    title: "ดอกมะเขือ",
    description: "เป็นสัญลักษณ์ของความเคารพ ความอ่อนน้อม",
    alt: "example",
  },
  {
    key: "2",
    image:
      "https://th.toluna.com//dpolls_images/2020/10/27/483d7af2-c2ff-4a5f-ac69-b67e07d3a3fc.jpg",
    title: "ดอกมะเขือ",
    description: "เป็นสัญลักษณ์ของความเคารพ ความอ่อนน้อม",
    alt: "example",
  },
  {
    key: "3",
    image:
      "https://th.toluna.com//dpolls_images/2020/10/27/483d7af2-c2ff-4a5f-ac69-b67e07d3a3fc.jpg",
    title: "ดอกมะเขือ",
    description: "เป็นสัญลักษณ์ของความเคารพ ความอ่อนน้อม",
    alt: "example",
  },
  {
    key: "4",
    image:
      "https://th.toluna.com//dpolls_images/2020/10/27/483d7af2-c2ff-4a5f-ac69-b67e07d3a3fc.jpg",
    title: "ดอกมะเขือ",
    description: "เป็นสัญลักษณ์ของความเคารพ ความอ่อนน้อม",
    alt: "example",
  },
  {
    key: "5",
    image:
      "https://th.toluna.com//dpolls_images/2020/10/27/483d7af2-c2ff-4a5f-ac69-b67e07d3a3fc.jpg",
    title: "ดอกมะเขือ",
    description: "เป็นสัญลักษณ์ของความเคารพ ความอ่อนน้อม",
    alt: "example",
  },
  {
    key: "6",
    image:
      "https://th.toluna.com//dpolls_images/2020/10/27/483d7af2-c2ff-4a5f-ac69-b67e07d3a3fc.jpg",
    title: "ดอกมะเขือ",
    description: "เป็นสัญลักษณ์ของความเคารพ ความอ่อนน้อม",
    alt: "example",
  },
];

const Ingredient = () => {
  const renderCard = (data: IIngredient[]) => {
    return data.map((item) => {
      return (
        <Col xs={24} sm={12} lg={6}>
          <Card
            cover={<img alt={item.alt} src={item.image} />}
            actions={[<Checkbox>เลือก</Checkbox>]}
          >
            <Meta title={item.title} description={item.description} />
          </Card>
        </Col>
      );
    });
  };
  return (
    <div
      css={css({
        padding: "1rem",
      })}
    >
      <Row gutter={16} justify="center" align="middle">
        {renderCard(ingredients)}
      </Row>
      <div
        css={css({
          width: "100%",
          textAlign: "center",
          marginTop: "1rem",
        })}
      >
        <Link to={path.phan}>
          <Button type="primary" size="large" id="play">
            ไปต่อ
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Ingredient;
