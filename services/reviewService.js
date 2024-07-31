const Review = require('../models/review');
const User = require('../models/User'); 

const getAllReviews = async () => {
  try {
    return await Review.findAll();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getReviewById = async (id) => {
  try {
    return await Review.findByPk(id, {
      include: [{ model: User, as: 'user' }] 
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const createReview = async (reviewData) => {
  try {
    return await Review.create(reviewData);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateReview = async (id, reviewData) => {
  try {
    const review = await Review.findByPk(id);
    if (review) {
      return await review.update(reviewData);
    } else {
      throw new Error('Review not found');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteReview = async (id) => {
  try {
    const review = await Review.findByPk(id);
    if (review) {
      await review.destroy();
    } else {
      throw new Error('Review not found');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};
