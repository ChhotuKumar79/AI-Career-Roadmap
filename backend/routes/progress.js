const express = require("express");
const Progress = require("../models/Progress");

const router = express.Router();

// SAVE / UPDATE PROGRESS
router.post("/save", async (req, res) => {
  try {
    const {
      userId,
      career,
      technology,
      completedTopics,
      testScore,
      testPercentage,
    } = req.body;

    if (!userId || !career || !technology) {
      return res.status(400).json({
        success: false,
        message: "userId, career and technology are required",
      });
    }

    let progress = await Progress.findOne({
      user: userId,
      career,
      technology,
    });

    if (progress) {
      progress.completedTopics = completedTopics || progress.completedTopics;
      progress.testScore = testScore ?? progress.testScore;
      progress.testPercentage =
        testPercentage ?? progress.testPercentage;

      await progress.save();
    } else {
      progress = await Progress.create({
        user: userId,
        career,
        technology,
        completedTopics: completedTopics || [],
        testScore: testScore || 0,
        testPercentage: testPercentage || 0,
      });
    }

    res.status(200).json({
      success: true,
      message: "Progress saved successfully",
      progress,
    });
  } catch (error) {
    console.error("Progress save error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;