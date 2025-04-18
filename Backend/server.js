require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const {Pool} = require("pg");

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const JWT_SECRET = process.env.JWT_SECRET ||"your_jwt_secret";

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.post("/register", async (req, res) => {
    console.log(req.body);
    const {firstname, lastname, email, password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await pool.query(
            "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
            [firstname, lastname, email, hashedPassword]

        );
        res.status(201).json({message: "User registered successfully", user: result.rows[0]});

    }catch(err){
        res.status(500).json({error: err.message});
    }

})

app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({message: "Invalid email or password"});
        }
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({message: "Invalid email or password"});
        }
        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: "1h"});
        res.json({token});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

app.get("/users", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});


function verifyToken(req, res, next) {
    try {
        const token = req.headers["authorization"];
        console.log("Token:", token);
        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            req.userId = decoded.id;
            next();
        });
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(500).json({ message: "Failed to authenticate token" });
    }
}


app.listen(5000, () => console.log("Server is running on port 5000"));