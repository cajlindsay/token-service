import express from "express";

const { PORT = 3000, NODE_ENV } = process.env;

const app = express();
app.use(express.json());

app.post("/tokenize", (req, res) => {
  const accountNumbers = req.body;
  res.json(accountNumbers);
});

app.post("/detokenize", (req, res) => {
  const tokens = req.body;
  res.json(tokens);
});

if (NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`tokenization service listening on port ${PORT}`);
  });
}

export default app;
