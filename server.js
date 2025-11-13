import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const API_URL = "https://paymoz.tech/api/v1/pagamentos/processar/";
const API_KEY = process.env.API_KEY; // variável segura do Render

app.post("/payments", async (req, res) => {
  const controller = new AbortController();
  const timeoutMs = 30000; // 30 segundos de timeout
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `ApiKey ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const data = await resp.json();

    res.status(resp.status).json(data);
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === "AbortError") {
      return res.status(504).json({ erro: "Timeout da requisição à PayMoz." });
    }
    res.status(500).json({ erro: "Erro interno: " + err.message });
  }
});

// Porta compatível com Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
});