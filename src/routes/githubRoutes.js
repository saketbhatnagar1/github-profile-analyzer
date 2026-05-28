const express = require("express");

const {
    analyzeProfile,
} = require("../controllers/githubController");

const router = express.Router();

router.get("/analyze/:username", analyzeProfile);

module.exports = router;