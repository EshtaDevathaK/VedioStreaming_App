import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get the current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the Vite build
app.use(express.static(path.join(__dirname, "dist")));

// Serve index.html on all routes (for SPA support)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
