/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Button, Card, Checkbox, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { IForm, path } from "../App";

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
    image: "/images/1-min.jpg",
    title: "ดอกมะเขือ",
    description: "เป็นสัญลักษณ์ของความเคารพ ความอ่อนน้อม",
    alt: "ดอกมะเขือ",
  },
  {
    key: "2",
    image: "/images/2-min.jpg",
    title: "ข้าวตอก",
    description: "เป็นสัญลักษณ์ของความมีระเบียบวินัย",
    alt: "ข้าวตอก",
  },
  {
    key: "3",
    image: "/images/3-min.jpg",
    title: "ดอกเข็ม",
    description: "เป็นสัญลักษณ์ที่แสดงถึงปัญญาที่เฉียบแหลม",
    alt: "ดอกเข็ม",
  },
  {
    key: "4",
    image: "/images/4-min.jpg",
    title: "ธูปเทียน",
    description: "เป็นสัญลักษณ์ที่แสดงถึงการเคารพครูบา-อาจารย์ ",
    alt: "ธูปเทียน",
  },
  {
    key: "5",
    image: "/images/5-min.jpg",
    title: "หญ้าแพรก",
    description: "เป็นสัญลักษณ์ที่แสดงการแพร่เจริญความงอกงามของสติปัญญา",
    alt: "หญ้าแพรก",
  },
  {
    key: "6",
    image: "/images/6-min.jpg",
    title: "ดอกไม้สวยงาม",
    description: "มีกลิ่นหอมที่เป็นเอกลักษณ์ และสร้างความสดชื่นให้แก่ผู้พบเห็น",
    alt: "ดอกไม้สวยงาม",
  },
];

interface IIngredientProps {
  setForm: (value: IForm) => void;
  formState: IForm;
}

const Ingredient: FC<IIngredientProps> = ({ formState, setForm }) => {
  const [selected, setSelected] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const history = useHistory();

  const selectedIn = (index: number) => {
    const newValue = [...selected];
    newValue[index] = !newValue[index];
    setSelected(newValue);
  };

  const setValue = () => {
    let ingredient = "";
    ingredients.forEach((value, index) => {
      if (selected[index]) {
        ingredient += " " + value.title;
      }
    });
    setForm({ ...formState, ingredient });
    history.push(path.phan);
  };

  const renderCard = (data: IIngredient[]) => {
    return data.map((item, index) => {
      return (
        <Col xs={24} sm={12} lg={8} key={item.key}>
          <Card
            cover={<img alt={item.alt} src={item.image} />}
            actions={[
              <Checkbox onClick={() => selectedIn(index)}>เลือก</Checkbox>,
            ]}
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
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      })}
    >
      <div
        css={css({
          color: "white",
          fontSize: 30,
          marginTop: "1.5rem",
        })}
      >
        เลือกดอกไม้ ธูปเทียน ทำพานไหว้ครู
      </div>
      <div
        css={css({
          padding: "1rem",
          maxWidth: 1200,
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
          <Button type="primary" size="large" id="play" onClick={setValue}>
            ไปต่อ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Ingredient;
