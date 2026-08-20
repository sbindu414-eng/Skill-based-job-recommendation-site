/**
 * Recommendation Routes
 * Defines API endpoints for job recommendations and skill analysis
 */

const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

/**
 * @route   GET /api/user/:id
 * @desc    Get user profile
 * @access  Public
 */
router.get('/user/:id', recommendationController.getUserProfile);

/**
 * @route   GET /api/user/:id/recommendations
 * @desc    Get job recommendations for a user
 * @access  Public
 */
router.get('/user/:id/recommendations', recommendationController.getJobRecommendations);

/**
 * @route   GET /api/user/:id/skill-gap
 * @desc    Get skill gap analysis for a user
 * @access  Public
 */
router.get('/user/:id/skill-gap', recommendationController.getSkillGapAnalysis);

/**
 * @route   GET /api/market/data
 * @desc    Get real-time market data
 * @access  Public
 */
router.get('/market/data', recommendationController.getMarketData);

/**
 * @route   GET /api/jobs/search
 * @desc    Search jobs with filters
 * @access  Public
 */
router.get('/jobs/search/:id', recommendationController.searchJobs);

/**
 * @route   PUT /api/user/:id/skills
 * @desc    Update user skills
 * @access  Public
 */
router.put('/user/:id/skills', recommendationController.updateUserSkills);

module.exports = router;