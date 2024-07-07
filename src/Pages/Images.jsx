import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TempraroryPage from "./TempraroryPage";
export default function Images() {
  const navigate = useNavigate();
  const [image, setImage] = useState([]);
  const [index, setIndex] = useState(0); // Default index to fetch
  const token = JSON.parse(localStorage.getItem("tokenno"));
  // useEffect(() => {
  //   const fetchImage = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8083/image", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`, // Corrected to "Bearer"
  //         },
  //       })

  //         .then((res) => {
  //           setImage(res.data);
  //           console.log(res.data);
  //         });
  //     } catch (error) {
  //       console.error("Error fetching image:", error);
  //     }
  //   };

  //   fetchImage();
  // }, [index]); // Fetch image whenever index changes

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:8083/image`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        const imageData = await response.json();
        setImage(imageData);
        // console.log(image);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [index, token]);

  const handleIndexChange = (event) => {
    setIndex(parseInt(event.target.value));
  };
  function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
  // const token = JSON.parse(localStorage.getItem("tokenno"));
  const handleDownload = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8083/image/download/${id}`,
        {
          responseType: "arraybuffer", // Set response type to arraybuffer
          headers: {
            Authorization: `Bearer ${token}`, // Include Authorization header
          },
        }
      );

      // Create a blob from the response data
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "image.jpg");

      // Append the link to the document body and trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up: remove the link and revoke the URL
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      // Handle error, display error message, or update state accordingly
    }
  };

  const handleDelete = async (id) => {
    window.confirm("Do You Want to Delete Image");
    try {
      await axios.delete(`http://localhost:8083/image/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the image state after deletion
      setImage(image.filter((img) => img._id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
      // Handle error, display error message, or update state accordingly
    }
  };
  return (
    <>
      <div style={{ marginTop: "5%" }}>
        <h2>Image Display</h2>
        <button className="addimg" onClick={() => navigate("/addimg")}>
          Add Images
        </button>

        {image ? (
          <div>
            <div className="containem">
              {image ? (
                image.map((image, index) => (
                  <div key={index} className="pdfclass">
                    <h3>{image.name}</h3>
                    <img
                      src={`data:${
                        image.contentType
                      };base64,${arrayBufferToBase64(image.data.data)}`}
                      alt={image.name}
                      style={{ width: "300px", height: "300px" }}
                    />
                    <div style={{ padding: "10px" }}>
                      {" "}
                      <button
                        className="addimg"
                        onClick={() => handleDownload(image._id)}
                      >
                        {" "}
                        Download Image
                      </button>
                      <button
                        className="addimg"
                        onClick={() => handleDelete(image._id)}
                        style={{ marginTop: "10px", marginLeft: "10px" }}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <TempraroryPage />
              )}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
