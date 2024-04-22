// server.js

import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "../routes/auth.js";
import "../config/passport-setup.js";
import User from "../models/Users.js";

dotenv.config({ path: "./src/keys.env" });

const app = express();
const PORT = process.env.PORT || 5178; // Use port from environment or 5178, my 5178 is an open port, my 5000 is being used by apple.

// Enable CORS for the client-side application
app.use(
  cors({
    origin: "http://localhost:5173", //your front-end URL port
    credentials: true, // Allows the server to send cookies to the client
  }),
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Configure session middleware with MongoDB storage
app.use(
  session({
    secret: "your secret key", // this is the secret key we use to sign the session ID cookie, can be any string
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      // this gives yummy cookie to user after they login and put in our db
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  }),
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport serialization and deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// Use the authentication routes
app.use("/api/auth", authRoute);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
