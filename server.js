import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the static files from the Vite build
app.use(express.static(path.join(__dirname, "dist")));

// Serve the index.html on all routes (for SPA support)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
