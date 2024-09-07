import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", greet);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});