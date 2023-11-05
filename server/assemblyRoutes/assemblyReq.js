const router = require("express").Router();
const dotenv = require("dotenv");
const axios = require("axios");
const refreshInterval = 5000
dotenv.config();

const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: "346de1ce21c645378fcf298d46dc26b7",
    "content-type": "application/json",
  }
})

/// Routes to assemblyAI API to trascribe AV File. Hits URL directly. Free Trial.
router.get("/", async (req, res) => {
  const getTranscript = async () => {
    // Sends the audio file to AssemblyAI for transcription
    const response = await assembly.post("/transcript", {
      audio_url: req.query.audioUrl,
    })
  
    // Interval for checking transcript completion
    const checkCompletionInterval = setInterval(async () => {
      const transcript = await assembly.get(`/transcript/${response.data.id}`)
      const transcriptStatus = transcript.data.status
  
      if (transcriptStatus !== "completed") {
        console.log(`Transcript Status: ${transcriptStatus}`)
      } else if (transcriptStatus === "completed") {
        console.log("\nTranscription completed!\n")
        res.send(transcript.data)
        console.log(`Your transcribed text:\n\n${transcriptText}`)
        clearInterval(checkCompletionInterval)
      }
    }, refreshInterval)
  }
  getTranscript();
});

module.exports = router;
