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

const BASE_API = "https://hello-teacher.61050135.workers.dev";
// const BASE_API = "http://localhost:80";

const Certificate: FC<ICertificateProps> = ({ formState }) => {
  const [loading, setLoading] = useState(true);
  const [id, setId] = useLocalStorage<string | null>("id", null);
  const [pdf, setPdf] = useLocalStorage<string | null>("pdf", null);

  // const convertBase64ToFile = (base64String: string, fileName: string) => {
  //   let arr = base64String.split(",");
  //   let reg = arr[0].match(/:(.*?);/);
  //   if (reg) {
  //     let mime = reg[1];
  //     let bstr = atob(arr[1]);
  //     let n = bstr.length;
  //     let uint8Array = new Uint8Array(n);
  //     while (n--) {
  //       uint8Array[n] = bstr.charCodeAt(n);
  //     }
  //     let file = new File([uint8Array], fileName, { type: mime });
  //     return file;
  //   }
  //   return null;
  // };

  // const downloadPdf = () => {
  //   const fileName = "Certificate.pdf";
  //   let file = convertBase64ToFile(pdf, fileName);
  //   console.log("file", file);
  //   if (file) {
  //     saveAs(file, fileName);
  //   }
  // };

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
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl);
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
