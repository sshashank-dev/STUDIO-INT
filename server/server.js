import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// 1. Initialize Configuration
dotenv.config();
const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Database Connection
// Uses the URI from your .env file, or falls back to local MongoDB
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/interior_db";

mongoose.connect(mongoURI)
    .then(() => console.log("✔ DB Connected"))
    .catch(err => console.error("✘ DB Connection Error:", err));

// 4. Project Schema & Model
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: String,
    year: String,
    imageUrl: String,
    createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);

// 5. API ROUTES

// AUTH: Check Admin Password
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    if (password === process.env.ADMIN_PASSWORD) {
        res.json({ success: true, token: "session_valid_2026" });
    } else {
        res.status(401).json({ success: false, message: "UNAUTHORIZED_ACCESS" });
    }
});

// GET: Fetch all projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 }); // Newest first
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST: Add a new project
app.post('/api/projects', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: Remove a project
app.delete('/api/projects/:id', async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: "Project deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 6. Launch Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 System Online: http://localhost:${PORT}`);
});