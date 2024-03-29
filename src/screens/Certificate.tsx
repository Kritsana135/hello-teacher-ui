/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Button, Card, Spin } from "antd";
import Meta from "antd/lib/card/Meta";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { IForm } from "../App";
import useLocalStorage from "../hooks/useLocalStorage";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface ICertificateProps {
  setForm: (value: IForm) => void;
  formState: IForm;
}

const BASE_API = process.env.REACT_APP_API

const Certificate: FC<ICertificateProps> = ({ formState }) => {
  const [loading, setLoading] = useState(true);
  const [id, setId] = useLocalStorage<string | null>("id", null);
  const [pdf, setPdf] = useLocalStorage<string | null>("pdf", null);

  function base64toBlob(base64Data: string) {
    const sliceSize = 1024;
    const base64Decode = base64Data.split(",")[1];
    const byteCharacters = atob(base64Decode);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: "application/pdf" });
  }

  function openBase64NewTab(): void {
    var blob = base64toBlob(pdf);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, "Certificate.pdf");
    } else {
      const blobUrl =
        URL.createObjectURL(blob) || webkitURL.createObjectURL(blob);
      // window.open(blobUrl);
      const a = document.createElement("a");
      a.setAttribute("href", blobUrl);
      a.setAttribute("target", "_blank");
      a.click();
    }
  }

  const rePlay = () => {
    localStorage.removeItem("form");
    localStorage.removeItem("step");
    localStorage.removeItem("id");
    localStorage.removeItem("pdf");
    window.location.replace("/");
  };

  useEffect(() => {
    if (!pdf) {
      if (!id) {
        axios.post(`${BASE_API}/register`, formState).then(({ data }) => {
          const { id, pdfBase64 } = data;
          setId(id);
          setPdf(pdfBase64);
          setLoading(false);
        });
      } else {
        axios
          .post(`${BASE_API}/certificate`, {
            id,
          })
          .then(({ data }) => {
            const { pdfBase64 } = data;
            setPdf(pdfBase64);
            setLoading(false);
          });
      }
    }
    setLoading(false);
  }, [formState]);

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
      {loading ? (
        <Spin size="large" />
      ) : (
        <Card
          hoverable
          css={css({
            maxWidth: 1000,
            minWidth: 300,
            width: "90%",
          })}
          cover={
            <div
              css={css({
                width: "100%",
                ".react-pdf__Page__canvas": {
                  width: "100% !important",
                  height: "auto !important",
                },
              })}
            >
              <Document file={pdf}>
                <Page pageNumber={1} />
              </Document>
            </div>
          }
          actions={[
            <Button
              type="primary"
              size="large"
              id="play"
              onClick={openBase64NewTab}
            >
              ดาวน์โหลด
            </Button>,
            <Button type="default" size="large" id="play" onClick={rePlay}>
              ทำกิจกรรมอีกครั้ง
            </Button>,
          ]}
        >
          <Meta title="เกียรติบัตรในการเข้าร่วมกิจกรรม" />
        </Card>
      )}
    </div>
  );
};

export default Certificate;
