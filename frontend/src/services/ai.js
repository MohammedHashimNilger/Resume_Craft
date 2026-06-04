// src/services/ai.js

const AI_ENDPOINT = process.env.REACT_APP_AI_URL || "http://localhost:5000/api/ai";

export async function callAI(systemPrompt, userMessage) {
  const token = localStorage.getItem("rc_token");
  const res  = await fetch(AI_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({ systemPrompt, userMessage }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.text || "Unable to generate response.";
}

export default callAI;
