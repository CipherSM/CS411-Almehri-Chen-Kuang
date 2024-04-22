// auth.js

import { Router } from "express";
import passport from "passport";
const router = Router();

// Auth login
router.get("/login", (req, res) => {
  res.send("login");
});

// Verify user authentication status
router.get("/verify", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user, isAuthenticated: true });
  } else {
    res.status(401).json({ isAuthenticated: false });
  }
});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      console.error("Logout Error:", err);
      return next(err);
    }
    req.session.destroy(function (err) {
      if (err) {
        console.error("Session Destruction Error:", err);
        return next(err);
      }
      res.clearCookie("connect.sid", { path: "/" });
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

// Auth with Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect home.
    console.log("User authenticated, session:", req.session);
    res.redirect("http://localhost:5173/home");
  },
);

export default router;
