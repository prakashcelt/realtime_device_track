import express from "express";
import { Server } from "socket.io";
import http from "http";
import path from "path";
import cors from "cors";
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server);

// Log every request to the console
app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
});

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Serve favicon.ico
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

// Error handling for static files
app.use((req, res, next) => {
    if (req.url.startsWith('/js/') || req.url.startsWith('/css/')) {
        res.status(404).send('Not Found');
    } else {
        next();
    }
});

app.get("/", (req, res) => {
    res.render("index");
});

io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("send-location", (data) => {
        io.emit("receive-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
        io.emit("user-disconnected", socket.id);
    });
});

server.listen(3000, () => {
    console.log("Server listening on port 3000");
});