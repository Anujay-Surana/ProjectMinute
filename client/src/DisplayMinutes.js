import React from "react";
import axios from "axios";
import { useState } from "react";

const DisplayMinutes = (output_dict) => {
    var parsedString = output_dict;

    return (
        <div class="container" style={styles.container}>
            <h1 style={styles.heading}>Minutes of the meeting</h1>
            <div class="container main-info">
                <ol>
                    <li>
                        <p><b>Date and Time: </b>{parsedString['1. Date and Time:'][0]}</p>
                    </li>
                    <li>
                        <b>Participants</b>
                        <ul>
                            {parsedString['2. Participants:'].map(parts => (
                                <li>{parts}</li>     
                            ))}
                        </ul>
                    </li>
                    <li>
                        <p><b>Purpose of the Meeting</b>: {parsedString['3. Purpose of the meeting:'][0]}</p>
                    </li>
                    <li>
                        <p>Agenda Items and Topics Discussed:</p>
                        <ul>
                            {parsedString['4. Agenda Items and Topics Discussed:'].map(points => (
                                <li>{points}</li>     
                            ))}
                        </ul>
                    </li>
                    <li>
                        <p>5. Key Decisions and Action Items</p>
                        <ul>
                            {parsedString['5. Key Decisions and Action Items:'].map(action => (
                                <li>{action}</li>     
                            ))}
                        </ul>
                    </li>
                    <li>
                        <p><b>Next Meeting Date and Place</b> {parsedString['6. Next Meetindg Date and Place:'][0]}</p>
                    </li>
                    <li>
                        <p><b>Documents to be Included in the Report:</b></p>
                        <ul>
                        {parsedString['7. Documents to be Included in the Report:'].map(docs => (
                          <li>{docs}</li>
                        ))}
                        </ul>
                    </li>
                    <li>
                        <p>Summary</p>
                        <p>{parsedString['Summary:']}</p>
                    </li>
                </ol>
            </div>
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
}

export default DisplayMinutes