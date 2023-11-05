import React from "react";
import axios from "axios";
import { useState } from "react";
import DisplayMinutes from "./DisplayMinutes";


const BuildComponent = () => {
  const [audioUrl, setAudioUrl] = useState("")
  const [state1, setState1] = useState("");
  const handleButtonClick = async () => {
    try {
      const passedURL = `http://localhost:4000/api/transcribe?audioUrl=`+ audioUrl;
      const response = await axios.get(passedURL);
      let output_string = response.data;
      console.log(output_string);
      createMintutes(response.data);
    } catch (error) {
      console.error("There was an error with the request:", error);
    }
  };

  function parseString(output_string) {
    const headingArr = ['1. Date and Time:', '2. Participants:', '3. Purpose of the meeting:', '4. Agenda Items and Topics Discussed:', '5. Key Decisions and Action Items:', '6. Next Meetindg Date and Place:', '7. Documents to be Included in the Report:', 'Summary:']

    // Output dictionary
    let output_dict = {};
    // Getting all the values of each heading
    for (let i = 0; i < headingArr.length - 1; i++) {
      // Fetch the index of the heading content and the index of the start of the next heading
      let prevIndex = output_string.indexOf(headingArr[i]) + headingArr[i].length;
      let nextIndex = output_string.indexOf(headingArr[i + 1]);
      let Outputdata = output_string.slice(prevIndex,nextIndex);
      // Split output on basis of \n so that we can get a list of all values
      output_dict[headingArr[i]] = Outputdata.split("\n")
    }
    // Set Summary Value
    output_dict['Summary:'] = output_string.slice(output_string.indexOf('Summary:')) 

    return output_dict;
  }

  const createMintutes = async (transcript) => {
    try {
      const passedURL = `http://localhost:4000/api/minutes?transcript_text=` + transcript.text;
      const response = await axios.get(passedURL);
      let output_string = response.data;
      // Llist of all Headings
      let output_dict = parseString(output_string);
      setState1(output_dict)
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
      onChange={(e) => setAudioUrl(e.target.value)}
    />
    <button style={styles.button} onClick={handleButtonClick}>
      Generate
    </button>
    <p>{state1}</p>
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
