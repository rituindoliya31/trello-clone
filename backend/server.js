import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error", err));

const cardSchema = new mongoose.Schema({
  title: String,
  description: String,
});
const Card = mongoose.model("Card", cardSchema);

app.get("/api/cards", async (req, res) => {
  const cards = await Card.find();
  res.json(cards);
});

app.post("/api/cards", async (req, res) => {
  const card = new Card(req.body);
  await card.save();
  res.json(card);
});

app.get("/api/seed", async (req, res) => {
  await Card.deleteMany({});
  await Card.insertMany([
    { title: "Setup Project", description: "Initialize backend structure" },
    { title: "Build API", description: "Create Express routes" },
  ]);
  res.json({ message: "Seeded successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
