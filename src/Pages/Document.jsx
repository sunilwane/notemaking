import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Document() {
  // const navigate = useNavigate();
  // const [pdfUrl, setPdfUrl] = useState("");

  // const fetchPdf = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8083/download/665c8aaf59a8a284d22d647b`,
  //       {
  //         responseType: "arraybuffer", // Important
  //       }
  //     );

  //     const pdfBlob = new Blob([response.data], { type: "application/pdf" });
  //     const pdfBlobUrl = URL.createObjectURL(pdfBlob);
  //     setPdfUrl(pdfBlobUrl);
  //   } catch (error) {
  //     console.error("Error fetching PDF:", error);
  //     alert("Error fetching PDF");
  //   }
  // };

  const [pdfUrls, setPdfUrls] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const token = JSON.parse(localStorage.getItem("tokenno"));
 
  // useEffect(() => {
  //   const fetchPdfs = async () => {
  //     try {
  //       // const response = await axios.get("http://localhost:8083/pdfall", {
  //       //   headers: {
  //       //     Authorization: `Barrer ${token}`,
  //       //   },
  //       // });

  //       const response = fetch("http://localhost:8083/pdf/pdfall", {
  //         method: "GET",
  //         headers: {
  //           "Content-type": "application/json",
  //           Authorization: `Barrer ${token}`,
  //         },
  //       }).then((res) => {
  //         console.log(res);
  //       });
  //       // const pdfs = response.data;

  //       // const pdfUrls = pdfs.map((pdf) => {
  //       //   const blob = new Blob([new Uint8Array(pdf.data.data)], {
  //       //     type: "application/pdf",
  //       //   });
  //       //   return URL.createObjectURL(blob);

  //       // });

  //       // setPdfUrls(pdfUrls);
  //       const pdfs = response.data.map((pdf) => ({
  //         ...pdf,
  //         url: URL.createObjectURL(
  //           new Blob([new Uint8Array(pdf.data.data)], {
  //             type: "application/pdf",
  //           })
  //         ),
  //       }));
  //       setPdfs(pdfs);
  //     } catch (error) {
  //       console.error("Error fetching PDFs:", error);
  //     }
  //   };

  //   fetchPdfs();
  // }, []);

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await fetch("http://localhost:8083/pdf/pdfall", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Corrected to "Bearer"
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch PDFs");
        }

        const pdfs = await response.json();

        const pdfData = pdfs.map((pdf) => ({
          ...pdf,
          url: URL.createObjectURL(
            new Blob([new Uint8Array(pdf.data.data)], {
              type: "application/pdf",
            })
          ),
        }));

        setPdfs(pdfData);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    fetchPdfs();
  }, [token]);
  const navigate = useNavigate();
  const handleclickbtn = () => {
    navigate("/addpdf");
  };

  const handledelete = async (id) => {
    window.confirm("do you want to delete the pdf");
    try {
      await axios
        .delete(`http://localhost:8083/pdf/delete/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Corrected to "Bearer"
          },
        })
        .then((res) => {
          console.log(res);
        });

      setPdfs(pdfs.filter((pdf) => pdf._id !== id));
    } catch (error) {
      console.error("Error deleting PDF:", error);
    }
  };
  return (
    <div style={{ marginTop: "5%" }}>
      {/* <h1>Document page</h1>
      <div>
        <div style={{ marginTop: "5%" }}>
          <button onClick={() => fetchPdf()}>Fetch PDF</button>
          {pdfUrl && (
            <iframe
              src={pdfUrl}
              title="PDF Viewer"
              width="600"
              height="500"
              style={{ border: "none" }}
            />
          )}
        </div>
      </div> */}

      {/* <button className="addimg" onClick={() => navigate("/addpdf")}>
        Add Images
      </button> */}

      <div>
        <h1>PDF Viewer</h1>
        <button className="addnewdoc" onClick={() => handleclickbtn()}>
          {" "}
          Add New Document
        </button>
        <div className="containem">
          {pdfs.map((pdfUrl, index) => (
            <div key={index} className="pdfclass">
              <iframe
                src={pdfUrl.url}
                width="300px"
                height="400px"
                title={`PDF Viewer ${index + 1}`}
              >
                This browser does not support PDFs. Please download the PDF to
                view it:
              </iframe>
              <div style={{ marginTop: "2%" }}>
                <a
                  href={pdfUrl.url}
                  style={{ marginRight: "20px", textDecoration: "none" }}
                >
                  Download PDF
                </a>

                <button
                  className="addnewdoc"
                  onClick={() => handledelete(pdfUrl._id)}
                  style={{ width: "120px" }}
                >
                  Delete{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
