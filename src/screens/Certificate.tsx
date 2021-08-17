/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Button, Card, Spin } from "antd";
import Meta from "antd/lib/card/Meta";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { IForm } from "../App";
import useLocalStorage from "../hooks/useLocalStorage";
import { saveAs } from "file-saver";
import { pdfjs, Document, Page } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface ICertificateProps {
  setForm: (value: IForm) => void;
  formState: IForm;
}

const BASE_API = "https://hello-teacher.61050135.workers.dev";
// const BASE_API = "http://localhost:80";

const Certificate: FC<ICertificateProps> = ({ formState }) => {
  const [loading, setLoading] = useState(true);
  const [id, setId] = useLocalStorage<string | null>("id", null);
  const [pdf, setPdf] = useLocalStorage<string | null>("pdf", null);

  const convertBase64ToFile = (base64String: string, fileName: string) => {
    let arr = base64String.split(",");
    let reg = arr[0].match(/:(.*?);/);
    if (reg) {
      let mime = reg[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let uint8Array = new Uint8Array(n);
      while (n--) {
        uint8Array[n] = bstr.charCodeAt(n);
      }
      let file = new File([uint8Array], fileName, { type: mime });
      return file;
    }
    return null;
  };

  const downloadPdf = () => {
    const fileName = "Certificate.pdf";
    let file = convertBase64ToFile(pdf, fileName);
    if (file) {
      saveAs(file, fileName);
    }
  };

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
            <Button type="primary" size="large" id="play" onClick={downloadPdf}>
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
