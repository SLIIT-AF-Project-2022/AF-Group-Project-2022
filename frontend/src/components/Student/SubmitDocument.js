import React from "react";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "./../constant/index";

const SubmitDocument = () => {
  const history = useNavigate();
  const email = localStorage.getItem("email");

  const [doc, setDoc] = useState([]);

  const upload = async (e) => {
    try {
      e.preventDefault();

      const data = new FormData();

      data.append("email", email);

      for (var x = 0; x < doc.length; x++) {
        data.append("uploaded_Document", doc[x]);
      }

      const res = await fetch(`${BACKEND_BASE_URL}/document-upload`, {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        setDoc(null);
        alert("Document submited successfully");
        history.replace("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <form onSubmit={upload} encType="multipart/form-data">
        Upload doc
        <div className="form-group">
          <input
            type="file"
            multiple
            required
            filename="uploaded_Document"
            className="form-control-file"
            onChange={(e) => {
              setDoc(e.target.files);
            }}
          />
        </div>
        <button className="mt-2" type="submit" variant="primary" size="lg">
          Upload
        </button>
      </form>
    </div>
  );
};

export default SubmitDocument;
