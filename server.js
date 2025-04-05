import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import { marked } from "marked";

dotenv.config(); // Load API key from .env file

const app = express();
app.use(cors());
app.use(express.json());

// NVIDIA AI API Config
const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY, // Store API key in .env file
  baseURL: "https://integrate.api.nvidia.com/v1",
});

app.post("/get-response", async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await openai.chat.completions.create({
      model: "nvidia/llama-3.1-nemotron-70b-instruct",
      messages: [{ role: "user", content: prompt+"You are an science experiment expert give me science experiment that I can perform on given material" }],
      temperature: 0.5,
      top_p: 1,
      max_tokens: 1024,
      stream: false, // Change to true if streaming responses
    });

    res.json({
      response: marked.parse(completion.choices[0]?.message?.content || "No response"),
    });
  } catch (error) {
    console.error("Error fetching response:", error);
    res.status(500).json({ error: "Failed to fetch response from NVIDIA AI" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
