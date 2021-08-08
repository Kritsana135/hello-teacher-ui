/** @jsxRuntime classic */
/** @jsx jsx */
import { StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, Carousel, Image } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import { FC, useRef, useState } from "react";

interface IStyleProps {
  color: string;
}

const backGround = (props: IStyleProps) =>
  css({
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ".select-phan-bg": {
      width: 299,
      height: 299,
      borderRadius: "50%",
      backgroundColor: "white",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      textAlign: "center",
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
    src: "./images/phan.png",
    width: 155,
  },
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

const Phan: FC = () => {
  const slider = useRef<CarouselRef>(null);
  const [bgColor, setBgColor] = useState("#D3B26D");
  const [phan, setPhan] = useState(images);

  const onNext = () => {
    slider.current?.next();
  };

  const onPrev = () => {
    slider.current?.next();
  };

  const sideEffect = (currentSlider: number) => {
    console.log(currentSlider);
    document.body.style.backgroundColor = colorBgPattern(currentSlider);
    // setBgColor(colorBgPattern(2));
  };

  console.log(slider.current);
  return (
    <Container color={bgColor}>
      <div className="select-phan-bg">
        <Carousel
          dots={false}
          effect="fade"
          ref={slider}
          afterChange={sideEffect}
        >
          {phan.map((item, index) => {
            return (
              <div css={carosel} key={index}>
                <Image
                  src={item.src}
                  width={item.width}
                  preview={{
                    mask: null,
                  }}
                />
              </div>
            );
          })}
        </Carousel>
        <div>
          {slider.current}
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
      </div>
    </Container>
  );
};

export default Phan;
