require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const Question = require('./models/Question');
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Database connection error:", err));

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  year: { type: Number, required: true },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model("User", UserSchema);

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(2).max(50).required(),
  password: Joi.string().min(6).required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
});

const authenticate = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// REGISTER
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, name, year, recaptchaToken } = req.body;
    console.log(req.body);  // Dodajte ovo da biste videli šta šaljete u telo zahteva


    // 1. reCAPTCHA provera
    if (!recaptchaToken) return res.status(400).json({ message: "Nedostaje reCAPTCHA token" });

    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: recaptchaToken,
      },
    });
    console.log(response.data); // Dodajte ovo da vidite odgovor sa reCAPTCHA

    if (!response.data.success) {
      return res.status(400).json({ message: "reCAPTCHA verifikacija nije uspela" });
    }

    // 2. Validacija korisničkih podataka
    const { error } = userSchema.validate({ email, password, name, year });
    if (error) return res.status(400).json({ message: error.details[0].message });

    // 3. Provera da li korisnik već postoji
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email već postoji" });

    // 4. Hash lozinke i kreiranje korisnika
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, name, year });

    res.status(201).json({ message: "Uspešna registracija", user: newUser });
  } catch (err) {
    console.error("Greška u registraciji:", err);

    res.status(500).json({ message: "Greška na serveru", error: err.message });
  }
});


// Login route
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Korisnik nije pronađen" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Neispravna lozinka" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, year: user.year, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user: { email: user.email, name: user.name, year: user.year, isAdmin: user.isAdmin } });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// ME
app.get("/api/auth/me", (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ email: decoded.email, name: decoded.name, year: decoded.year });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

// UPDATE
app.put("/api/auth/update", async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { name, year } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email: decoded.email },
      { name, year },
      { new: true }
    );

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE
app.delete("/api/auth/delete", async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await User.findOneAndDelete({ email: decoded.email });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// MAKE ADMIN
app.post("/api/auth/make-admin", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isAdmin = true;
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        year: user.year,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: `${email} is now an admin`,
      token,
      user
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST QUESTION
app.post('/api/questions', authenticate, async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ message: "Pitanje je obavezno" });

    const newQuestion = new Question({
      question,
      userId: req.user.id
    });

    await newQuestion.save();
    res.status(201).json({ message: "Pitanje uspešno postavljeno", question: newQuestion });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET QUESTIONS
app.get('/api/questions', authenticate, async (req, res) => {
  try {
    const questions = req.user.isAdmin
      ? await Question.find().populate('userId', 'name email')
      : await Question.find({ userId: req.user.id }).populate('userId', 'name email');

    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ADMIN ANSWERS
app.put('/api/questions/:id/answer', authenticate, async (req, res) => {
  try {
    const { answer } = req.body;
    const question = await Question.findById(req.params.id);

    if (!question) return res.status(404).json({ message: "Question not found" });
    if (!req.user.isAdmin) return res.status(403).json({ message: "Samo admin može odgovoriti na ovo pitanje" });

    question.answer = answer;
    question.adminAnswered = true;
    await question.save();

    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
