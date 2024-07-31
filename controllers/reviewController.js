// controllers/reviewController.js

const reviewService = require('../services/reviewService');

const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReviewById = async (req, res) => {
  try {
    const review = await reviewService.getReviewById(req.params.id);
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const review = await reviewService.createReview(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await reviewService.updateReview(req.params.id, req.body);
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    await reviewService.deleteReview(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};
