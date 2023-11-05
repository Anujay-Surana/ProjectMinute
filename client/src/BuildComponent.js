import React from "react";
import axios from "axios";
import { useState } from "react";

const BuildComponent = () => {
  const [audio_url, setAudioURL] = useState("");

  const handleButtonClick = async () => {
    try {
      const passedURL = `http://localhost:4000/api/transcribe?audioUrl=`+ audio_url;
      const response = await axios.get(passedURL);
      let output_string = response.data;
      console.log(output_string);
    } catch (error) {
      console.error("There was an error with the request:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Project Minute</h1>
      <input
        type="text"
        placeholder="Link to a video"
        style={styles.input}
        onChange={(e) => setAudioURL(e.target.value)}
      />
      <button style={styles.button} onClick={handleButtonClick}>
        Generate
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "'Roboto', sans-serif",
  },
  heading: {
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    width: "80%",
    maxWidth: "400px",
    padding: "10px 15px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "4px",
    outline: "none",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default BuildComponent;
