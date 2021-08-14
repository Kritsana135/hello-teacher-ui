/** @jsxRuntime classic */
/** @jsx jsx */
import { StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, Carousel, Image, Input } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import { FC, useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IForm, path } from "../App";

const backGround = () =>
  css({
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    ".select-phan-bg": {
      flexDirection: "row",
      width: 299,
      height: 299,
      borderRadius: "50%",
      backgroundColor: "white",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      textAlign: "center",
      marginTop: "1.5rem",
    },
    ".section-1": {
      color: "white",
      fontSize: 24,
      marginTop: "1.5rem",
    },
    ".form-input": {
      marginTop: "1rem",
      display: "flex",
      ".ant-input": {
        height: "40px",
      },
    },
    "@media (min-width: 940px)": {
      ".section-1": {
        fontSize: 48,
      },
      ".select-phan-bg": {
        width: "30vw",
        height: "30vw",
      },
      ".ant-image": {
        width: "20vw !important",
      },
    },
  });

const Container = styled.div`
  ${backGround};
`;

const carosel = css({
  textAlign: "center",
});

const images = [
  {
    src: "./images/phan2.png",
    width: 200,
  },
  {
    src: "./images/phan3.png",
    width: 200,
  },
];

const colorBgPattern = (index: number) => {
  const colors = ["#D3B26D", "#F8B2BC", "#F5A067"];
  return colors[index % 3];
};

const PHAN_TYPE = ["สวยงาม", "ความคิดสร้างสรรค์"];

interface IPhanProps {
  setForm: (value: IForm) => void;
  form: IForm;
}

const Phan: FC<IPhanProps> = ({ form, setForm }) => {
  const slider = useRef<CarouselRef>(null);
  const [phanType, setPhanType] = useState(PHAN_TYPE[0]);

  const onNext = () => {
    slider.current?.next();
  };

  const onPrev = () => {
    slider.current?.next();
  };

  const sideEffect = useCallback(
    (currentSlider: number) => {
      setForm({ ...form, phanType: PHAN_TYPE[currentSlider] });
      setPhanType(PHAN_TYPE[currentSlider]);
      document.body.style.backgroundColor = colorBgPattern(currentSlider);
    },
    [setPhanType, setForm, form]
  );

  const renderImage = useCallback(() => {
    return images.map((item, index) => {
      return (
        <div css={carosel} key={index}>
          <Image
            src={item.src}
            width={item.width}
            className="test"
            preview={{
              mask: null,
            }}
          />
        </div>
      );
    });
  }, []);

  const enterPhanName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newForm: IForm = { ...form, phanName: event.target.value };
    setForm(newForm);
  };

  console.log(slider.current);
  return (
    <Container>
      <div className="section-1">เลือกพานที่คุณต้องการ</div>
      <div className="select-phan-bg">
        <Carousel
          dots={false}
          effect="fade"
          ref={slider}
          afterChange={sideEffect}
        >
          {renderImage()}
        </Carousel>
        <div>
          <Button
            icon={<StepBackwardOutlined />}
            size="large"
            onClick={onNext}
          ></Button>
          <Button
            icon={<StepForwardOutlined />}
            size="large"
            onClick={onPrev}
          ></Button>
        </div>
        <div className="form-input">
          <Input
            value={form.phanName}
            addonBefore={phanType}
            placeholder="ตั้งชื่อพาน (Optional)"
            css={css({
              height: "40px",
            })}
            onBlur={enterPhanName}
          />
          <Link to={path.greeting}>
            <Button size="large" type="primary">
              ต่อไป
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Phan;
