const express = require("express");
const cors = require("cors");
const app = express();
const scanWebsite = require("./scan");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Accessibility Analyzer API is running 🚀");
});

app.get("/scan", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const results = await scanWebsite(url);
    res.json({
      url,
      issues: results.violations.length,
      violations: results.violations,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to scan site", details: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
